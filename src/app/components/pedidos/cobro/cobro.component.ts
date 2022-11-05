import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DetallePedido } from 'src/app/models/detalle-pedido';
import { ResultadoGenerico } from 'src/app/models/resultado-generico';
import { TipoPago } from 'src/app/models/tipo-pago';
import { CobroService } from 'src/app/services/cobro.service';
import { PedidoService } from 'src/app/services/pedido.service';
import { TipoPagoService } from 'src/app/services/tipo-pago.service';

@Component({
  selector: 'app-cobro',
  templateUrl: './cobro.component.html',
  styleUrls: ['./cobro.component.css']
})
export class CobroComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  labelBoton: string;
  formulario: FormGroup;
  tiposPago: TipoPago[];
  cobraConTarjeta: boolean;
  mostrarQr: boolean = false;
  @Input() pagaCliente: boolean;
  @Input() disabled: boolean;
  @Input() pedido: any;
  @Output() onCobrado = new EventEmitter();
  detalles: DetallePedido[];
  importeTotal: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private tipoPagoService: TipoPagoService,
    private pedidoService: PedidoService,
    private cobroService: CobroService
  ) { }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.disabled = this.pedido.estado != 'Creado';
    this.labelBoton = this.pagaCliente? 'Pagar' : 'Cobrar'
    this.subscription = new Subscription();
    this.formulario = this.formBuilder.group({
      tipoPago: [,Validators.required],
      codigoAutorizacion: [,Validators.required],
    })
    this.obtenerTiposPago();
    this.formulario.controls["tipoPago"].valueChanges.subscribe(x => {
      if(x.nombre == 'Tarjeta de Débito' || x.nombre == 'Tarjeta de Crédito') {
        this.formulario.controls['codigoAutorizacion'].setValidators([Validators.required]);
        this.cobraConTarjeta = true;
        this.mostrarQr = false;
      } else if (x.nombre == 'Mercado Pago') {
        this.formulario.controls['codigoAutorizacion'].clearValidators();
        this.cobraConTarjeta = false;
        this.mostrarQr = true;
      } else {
        this.formulario.controls['codigoAutorizacion'].clearValidators();
        this.cobraConTarjeta = false;
        this.mostrarQr = false;
      }
      this.formulario.controls['codigoAutorizacion'].reset();
      this.formulario.controls['codigoAutorizacion'].updateValueAndValidity();
   })
  }
  calcularTotal(): void {
    let total = 0;
    this.detalles.forEach(x => {
      total = total + x.precioUnitario * x.cantidad;
    });
    this.importeTotal = total;
  }
  obtenerTiposPago(): void {
    this.subscription.add(
      this.tipoPagoService.obtenerTodos().subscribe({
        next: (r: ResultadoGenerico)=> {
          if(r.ok && r.resultado){
            if (this.pagaCliente){
              this.tiposPago = r.resultado.filter(x => {return x.nombre == 'Mercado Pago'});
            } else {
              this.tiposPago = r.resultado as TipoPago[];
            }
          } else {
            console.error(r.mensaje);
          }
        },
        error: (e) => {
          console.error(e);
        }
      })
    )
  }
  obtenerDetalles(): void {
    if(!this.pedido.id){
      console.error("Pedido id is undefined");
      return;
    }
    this.subscription.add(
      this.pedidoService.obtenerDetalles(this.pedido.id).subscribe({
        next: (r: ResultadoGenerico) => {
          if(r.ok){
            this.detalles = r.resultado? r.resultado : [];
            this.calcularTotal();
          }
          else {
            console.error(r.mensaje);
          }
        },
        error: (e) => {
          console.error(e);
        }
      })
    )
  }
  guardarCobro(): void {
    if(this.formulario.valid) {
      const { tipoPago, codigoAutorizacion } = this.formulario.value;
      const reqbody = {
        idPedido: this.pedido.id,
        tipoPago: tipoPago, 
        codigoAutorizacion: codigoAutorizacion, 
        montoCobrado: this.importeTotal
      }
      this.subscription.add(
        this.cobroService.agregar(reqbody).subscribe({
          next: (r: ResultadoGenerico) => {
            if(r.ok){
              this.onCobrado.emit();
              const verbo = this.pagaCliente ? 'Pago' : 'Cobro';
              alert(verbo + " realizado con éxito");
            } else {
              console.error(r.mensaje);
            }

          },
          error: (e) => {
            console.error(e);
          }
        })
      )
    } else {
      alert("Error al registrar cobro: Revise los campos!");
    }
  }
  get controlTipoPago(): FormControl {
    return this.formulario.controls['tipoPago'] as FormControl;
  }
  get controlCodigoAutorizacion(): FormControl {
    return this.formulario.controls['codigoAutorizacion'] as FormControl;
  }
}

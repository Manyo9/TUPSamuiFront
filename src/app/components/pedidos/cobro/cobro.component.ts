import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DetallePedido } from 'src/app/models/detalle-pedido';
import { ResultadoGenerico } from 'src/app/models/resultado-generico';
import { TipoPago } from 'src/app/models/tipo-pago';
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
  @Input() pagaCliente: boolean;
  @Input() disabled: boolean;
  @Input() pedido: any;
  detalles: DetallePedido[];
  importeTotal: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private tipoPagoService: TipoPagoService,
    private pedidoService: PedidoService
  ) { }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.disabled = this.pedido.estado != 'Creado';
    this.labelBoton = this.pagaCliente? 'Pagar' : 'Cobrar'
    this.subscription = new Subscription();
    this.formulario = this.formBuilder.group({
      tipoPago: [],
      codigoAutorizacion: []
    })
    this.obtenerTiposPago();
    this.formulario.controls["tipoPago"].valueChanges.subscribe(x => {
      if(x.nombre == 'Tarjeta de Débito' || x.nombre == 'Tarjeta de Crédito') {
        this.cobraConTarjeta = true;
      } else {
        this.cobraConTarjeta = false;
      }
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
          if(r.ok){
            this.tiposPago = r.resultado as TipoPago[];
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

  get controlTipoPago(): FormControl {
    return this.formulario.controls['tipoPago'] as FormControl;
  }
  get controlCodigoAutorizacion(): FormControl {
    return this.formulario.controls['codigoAutorizacion'] as FormControl;
  }
}

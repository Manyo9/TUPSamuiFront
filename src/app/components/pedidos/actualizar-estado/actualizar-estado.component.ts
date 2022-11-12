import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { EstadoPedido } from 'src/app/models/estado-pedido';
import { ResultadoGenerico } from 'src/app/models/resultado-generico';
import { EstadoPedidoService } from 'src/app/services/estado-pedido.service';
import { PedidoService } from 'src/app/services/pedido.service';
import { SweetAlert } from 'sweetalert/typings/core';
const swal: SweetAlert = require('sweetalert');

@Component({
  selector: 'app-actualizar-estado',
  templateUrl: './actualizar-estado.component.html',
  styleUrls: ['./actualizar-estado.component.css']
})
export class ActualizarEstadoComponent implements OnInit, OnDestroy {

  private subscription: Subscription;

  @Output() onActualizado = new EventEmitter();
  @Input() pedido: any;
  estadosPedido: EstadoPedido[];
  formulario: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private estadoPedidoService: EstadoPedidoService,
    private pedidoService: PedidoService
  ) { }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.subscription = new Subscription();
    this.formulario = this.formBuilder.group({
      estadoPedido: [,Validators.required]
    })
  }
  obtenerEstados(): void {
    this.subscription.add(
      this.estadoPedidoService.obtenerTodos().subscribe({
        next: (r: ResultadoGenerico) => {
          if(r.ok && r.resultado){
            this.estadosPedido = r.resultado.filter((x) => {return x.nombre == 'Cancelado' || x.nombre == 'Entregado'}) as EstadoPedido[];
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
  actualizarEstado(): void {
    if(this.formulario.valid){
      const reqbody = {
        idEstado: this.formulario.controls['estadoPedido'].value.id,
        idPedido: this.pedido.id
      }
      this.subscription.add(
        this.pedidoService.actualizarEstado(reqbody).subscribe({
          next: (r: ResultadoGenerico) => {
            if(r.ok) {
              swal({title:'Listo!', text:'Se actualizó el estado con éxito', icon: 'success'})
              this.onActualizado.emit();
            } else {
              swal({title:'Error!', text: 'Error al actualizar el estado', icon: 'error'});
            }
          },
          error: (e) => {
            swal({title:'Error!', text: `${e.message}`, icon: 'error'});
          }
        })
      )
    }else {
      swal({title:'Atención!', text:'Debe seleccionar un estado!', icon: 'warning'})
    }
  }
  get controlEstadoPedido(): FormControl {
    return this.formulario.controls['estadoPedido'] as FormControl;
  }
}

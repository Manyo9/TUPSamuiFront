import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { ResultadoGenerico } from 'src/app/models/resultado-generico';
import { PedidoService } from 'src/app/services/pedido.service';
import { SweetAlert } from 'sweetalert/typings/core';
const swal: SweetAlert = require('sweetalert');

@Component({
  selector: 'app-cancelar-pedido',
  templateUrl: './cancelar-pedido.component.html',
  styleUrls: ['./cancelar-pedido.component.css']
})
export class CancelarPedidoComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  @Input() pedido: any;
  @Output() onCancelar= new EventEmitter();
  constructor(
    private pedidoService: PedidoService
  ) { }

  ngOnInit(): void {
    this.subscription = new Subscription();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  cancelarPedido(): void {
    if(!this.pedido.id){
      console.error("pedido id is undefined");
      return;
    }
    this.subscription.add(
      this.pedidoService.cancelar(this.pedido.id).subscribe({
        next: (r:ResultadoGenerico)  => {
          if(r.ok){
            swal({title:'Listo!', text:'Pedido cancelado con exito', icon: 'success'});
            this.onCancelar.emit();
          } else {
            swal({title:'Error!', text:`Ocurrió un error al cancelar el pedido: ${r.mensaje}`, icon: 'error'});
            console.error(r.mensaje);
          }
        },
        error: (e) => {
          console.error(e);
        }
      })
    )
  }
}

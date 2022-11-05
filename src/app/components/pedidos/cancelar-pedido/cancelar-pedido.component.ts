import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { ResultadoGenerico } from 'src/app/models/resultado-generico';
import { PedidoService } from 'src/app/services/pedido.service';

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
            alert("Pedido cancelado con exito");
            this.onCancelar.emit();
          } else {
            alert("Error al cancelar pedido");
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

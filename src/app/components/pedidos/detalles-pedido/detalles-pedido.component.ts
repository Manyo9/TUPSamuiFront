import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DetallePedido } from 'src/app/models/detalle-pedido';
import { Pedido } from 'src/app/models/pedido';
import { ResultadoGenerico } from 'src/app/models/resultado-generico';
import { PedidoService } from 'src/app/services/pedido.service';

@Component({
  selector: 'app-detalles-pedido',
  templateUrl: './detalles-pedido.component.html',
  styleUrls: ['./detalles-pedido.component.css']
})
export class DetallesPedidoComponent implements OnInit, OnDestroy {
  @Input() pedido: Pedido;
  detalles: any[] = [];
  private subscription: Subscription;
  constructor(
    private pedidoService: PedidoService
  ) { }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.subscription = new Subscription();
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

}

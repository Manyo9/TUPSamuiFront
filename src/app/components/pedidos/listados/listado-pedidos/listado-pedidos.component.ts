import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Pedido } from 'src/app/models/pedido';
import { ResultadoGenerico } from 'src/app/models/resultado-generico';
import { PedidoService } from 'src/app/services/pedido.service';

@Component({
  selector: 'app-listado-pedidos',
  templateUrl: './listado-pedidos.component.html',
  styleUrls: ['./listado-pedidos.component.css']
})
export class ListadoPedidosComponent implements OnInit {
  listadoPedidos: any;
  private subscription: Subscription;
  constructor(
    private pedidoService: PedidoService
  ) { }

  ngOnInit(): void {
    this.subscription = new Subscription();
    this.cargarPedidos();
  }
  cargarPedidos(): void{
    this.subscription.add(
      this.pedidoService.obtenerTodos().subscribe({
        next: (r: ResultadoGenerico) => {
          if(r.ok) {
            this.listadoPedidos = r.resultado;
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

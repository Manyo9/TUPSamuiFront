import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Pedido } from 'src/app/models/pedido';
import { PedidoService } from 'src/app/services/pedido.service';

@Component({
  selector: 'app-listado-pedidos',
  templateUrl: './listado-pedidos.component.html',
  styleUrls: ['./listado-pedidos.component.css']
})
export class ListadoPedidosComponent implements OnInit {
  pedidosPendientes: Pedido[];
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
      this.pedidoService.obtenerPendientes().subscribe({
        next: (resultado: Pedido[]) => {
          this.pedidosPendientes = resultado;
        },
        error: (e) => {
          console.error(e);
        }
      })
    )
  }
}

import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ResultadoGenerico } from 'src/app/models/resultado-generico';
import { PedidoService } from 'src/app/services/pedido.service';
import { SweetAlert } from 'sweetalert/typings/core';
const swal: SweetAlert = require('sweetalert');

@Component({
  selector: 'app-listado-pedidos-propios',
  templateUrl: './listado-pedidos-propios.component.html',
  styleUrls: ['./listado-pedidos-propios.component.css']
})
export class ListadoPedidosPropiosComponent implements OnInit {

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
      this.pedidoService.obtenerPropios().subscribe({
        next: (r: ResultadoGenerico) => {
          if(r.ok) {
            this.listadoPedidos = r.resultado;
          }
          else {
            console.error(r.mensaje);
            
          }
        },
        error: (e) => {
          swal({title:'Oops!', text: `Error al actualizar tu listado de pedidos`, icon: 'error'});
          console.error(e);
        }
      })
    )
  }
}

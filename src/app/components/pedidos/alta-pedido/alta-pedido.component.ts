import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DetallePedido } from 'src/app/models/detalle-pedido';
import { Gusto } from 'src/app/models/gusto';
import { Pedido } from 'src/app/models/pedido';
import { Producto } from 'src/app/models/producto';
import { ResultadoGenerico } from 'src/app/models/resultado-generico';
import { GustoService } from 'src/app/services/gusto.service';
import { PedidoService } from 'src/app/services/pedido.service';
import { ProductoService } from 'src/app/services/producto.service';
import { SweetAlert } from 'sweetalert/typings/core';
const swal: SweetAlert = require('sweetalert');

@Component({
  selector: 'app-alta-pedido',
  templateUrl: './alta-pedido.component.html',
  styleUrls: ['./alta-pedido.component.css']
})

export class AltaPedidoComponent implements OnInit, OnDestroy {
  cantidadTotal: number = 0;
  importeTotal: number = 0;
  controlObservaciones = new FormControl('');
  productos: Producto[];
  gustos: Gusto[];
  pedido: Pedido
  private subscription: Subscription
  constructor(
    private productoService: ProductoService,
    private pedidoService: PedidoService,
    private gustoService: GustoService,
    private router: Router
  ) {
    this.subscription = new Subscription();
  }

  ngOnInit(): void {
    this.obtenerProductos();
    this.obtenerGustos();
    this.pedido = new Pedido();
    this.pedido.detalles = [];
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  obtenerGustos(): void {
    this.subscription.add(
      this.gustoService.obtenerTodos().subscribe({
        next: (r: ResultadoGenerico) => {
          if (r.ok) {
            this.gustos = r.resultado ? r.resultado.filter(x => x.activo == 1) : [];
          } else {
            console.log(r.mensaje);
          }
        },
        error: (e) => {
          console.error(e);
        }
      })
    )
  }

  obtenerProductos(): void {
    this.subscription.add(
      this.productoService.obtenerActivos().subscribe({
        next: (resultado: ResultadoGenerico) => {
          if (resultado.ok) {
            this.productos = resultado.resultado as Producto[];
          }
          else {
            console.error(resultado.mensaje)
          }
        },
        error: (e) => { console.error(e) }
      })
    )
  }

  calcularTotal(): void {
    let total = 0;
    this.pedido.detalles.forEach(x => {
      total = total + x.producto.precio * x.cantidad;
    });
    this.importeTotal = total;
  }

  calcularCantidadTotal(): void {
    let total = 0;
    this.pedido.detalles.forEach(x => {
      total = total + x.cantidad;
    })
    this.cantidadTotal = total;
  }

  agregarDetalle(detalle: DetallePedido): void {
    this.pedido.detalles.push(detalle);
    this.calcularCantidadTotal();
    this.calcularTotal();
  }

  quitarDetalle(detalle: DetallePedido): void {
    let indice = this.pedido.detalles.indexOf(detalle);

    this.pedido.detalles.splice(indice, 1);
    this.calcularCantidadTotal();
    this.calcularTotal();
  }

  guardar() {
    this.pedido.observaciones = this.controlObservaciones.value ? this.controlObservaciones.value : "";
    this.subscription.add(
      this.pedidoService.agregar(this.pedido).subscribe({
        next: () => {
          swal({ title: 'Listo!', text: 'Registraste tu pedido con éxito.', icon: 'success' });
          this.router.navigate(['/home']);
        },
        error: (e) => {
          swal({ title: 'Error!', text: 'Ocurrió un error', icon: 'error' });
          console.error(e);
        }
      })
    )
  }

  estaAgregado(p: Producto): boolean {
    let cond = this.pedido.detalles.find(x => x.producto === p);
    if (cond) {
      return true;
    }
    return false;
  }
}

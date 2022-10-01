import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DetallePedido } from 'src/app/models/detalle-pedido';
import { Pedido } from 'src/app/models/pedido';
import { Producto } from 'src/app/models/producto';
import { PedidoService } from 'src/app/services/pedido.service';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-alta-pedido',
  templateUrl: './alta-pedido.component.html',
  styleUrls: ['./alta-pedido.component.css']
})
export class AltaPedidoComponent implements OnInit, OnDestroy {
  controlObservaciones = new FormControl('');
  productos: Producto[];
  pedido: Pedido
  private subscription: Subscription
  constructor(
    private productoService: ProductoService,
    private pedidoService: PedidoService,
    private router: Router
  ) {
    this.subscription = new Subscription();
  }

  ngOnInit(): void {
    this.obtenerProductos();
    this.pedido = new Pedido();
    this.pedido.detalles = [];
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  obtenerProductos(): void {
    this.subscription.add(
      this.productoService.obtenerTodos().subscribe({
        next: (resultado: Producto[]) => {
          this.productos = resultado;
        },
        error: (e) => { console.error(e) }
      })
    )
  }
  calcularTotal(): number {
    let total = 0;
    this.pedido.detalles.forEach(x => {
      total = total + x.producto.precio * x.cantidad;
    });
    return total;
  }
  calcularCantidadTotal(): number {
    let total = 0;
    this.pedido.detalles.forEach(x => {
      total = total + x.cantidad;
    })
    return total;
  }
  agregarDetalle(detalle: DetallePedido): void {
    this.pedido.detalles.push(detalle);
  }
  quitarDetalle(detalle: DetallePedido): void {
    let indice = this.pedido.detalles.indexOf(detalle);

    this.pedido.detalles.splice(indice, 1);
  }
  guardar() {
    this.pedido.fechaPedido = new Date();
    this.pedido.observaciones = this.controlObservaciones.value ? this.controlObservaciones.value : "";
    this.subscription.add(
      this.pedidoService.agregar(this.pedido).subscribe({
        next: () => {
          alert('Registro el pedido con éxito');
          this.router.navigate(['/home']);
        },
        error: (e) => { 
          console.error(e);
        }
      })
    )
  }

}

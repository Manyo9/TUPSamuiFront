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

@Component({
  selector: 'app-alta-pedido',
  templateUrl: './alta-pedido.component.html',
  styleUrls: ['./alta-pedido.component.css']
})
export class AltaPedidoComponent implements OnInit, OnDestroy {
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
          if(r.ok){
            this.gustos = r.resultado ? r.resultado.filter(x => x.activo==1) : [];
          }else{
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
      this.productoService.obtenerTodos().subscribe({
        next: (resultado: ResultadoGenerico) => {
          if (resultado.ok) {
            const todosProductos =  resultado.resultado as Producto[];
            this.productos = todosProductos.filter(x => x.activo);
          }
          else {
            console.error(resultado.mensaje)
          }
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
  estaAgregado(p: Producto): boolean{
    let cond = this.pedido.detalles.find(x => x.producto === p);
    if (cond) {
      return true;
    }
    return false;
  }
}

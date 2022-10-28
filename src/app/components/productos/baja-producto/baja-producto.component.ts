import { Component, OnInit,Output, Input,EventEmitter, OnDestroy} from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-baja-producto',
  templateUrl: './baja-producto.component.html',
  styleUrls: ['./baja-producto.component.css']
})
export class BajaProductoComponent implements  OnDestroy{
  @Output () onEliminado = new EventEmitter();
  @Input() producto : Producto;
  constructor(private servicioProducto : ProductoService) { }
  private subscription = new Subscription();

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  eliminarProducto(){
    this.subscription.add(
      this.servicioProducto.eliminar(this.producto).subscribe({
        next : () =>{
          alert('Elimino el producto con id'+' '+ this.producto.id+' ' +'correctamente');
          this.onEliminado.emit();
        },
        error : () =>{
          alert('Error al eleiminar');
        }
      })
    )
  }
}

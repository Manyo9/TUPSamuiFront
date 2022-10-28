import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Producto } from 'src/app/models/producto';
import { ResultadoGenerico } from 'src/app/models/resultado-generico';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-listado-productos',
  templateUrl: './listado-productos.component.html',
  styleUrls: ['./listado-productos.component.css']
})
export class ListadoProductosComponent implements OnDestroy,OnInit {
  @Input() listado : Producto[]=[];
  constructor(private servicioProducto : ProductoService) { }
  private subscription = new Subscription();
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  ngOnInit() : void{
    this.actualizarListado();
  }

  actualizarListado(){
    this.subscription.add(
      this.servicioProducto.obtenerTodos().subscribe({
        next : (listado: ResultadoGenerico) =>{    
          if(listado.resultado && listado.resultado.length>0){
            this.listado=listado.resultado;
          }
        },
        error :() =>{
          alert('Error al actualizar listado productos')
        }
      })
    )
  }
}

import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Producto } from 'src/app/models/producto';
import { ResultadoGenerico } from 'src/app/models/resultado-generico';
import { ProductoService } from 'src/app/services/producto.service';
import { SweetAlert } from 'sweetalert/typings/core';
const swal: SweetAlert = require('sweetalert');

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
          if(listado.resultado && listado.resultado.length>=0){ //preguntar 
            this.listado=listado.resultado;
          }
        },
        error : (e) =>{
          swal({title:'Error!', text:`Error al actualizar listado productos`, icon: 'error'});
          console.error(e);
        }
      })
    )
  }
}

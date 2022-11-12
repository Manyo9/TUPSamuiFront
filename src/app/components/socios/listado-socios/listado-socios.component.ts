import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ResultadoGenerico } from 'src/app/models/resultado-generico';
import { Socio } from 'src/app/models/socio';
import { SocioService } from 'src/app/services/socio.service';
import { SweetAlert } from 'sweetalert/typings/core';
const swal: SweetAlert = require('sweetalert');

@Component({
  selector: 'app-listado-socios',
  templateUrl: './listado-socios.component.html',
  styleUrls: ['./listado-socios.component.css']
})
export class ListadoSociosComponent implements OnInit,OnDestroy {
  @Input() listado : Socio[]=[];
  constructor(private servicioSocio : SocioService) { }

  private subscription= new Subscription();
  ngOnInit() : void{
    this.actualizarListado();
  }

  actualizarListado(){
    this.subscription.add(
      this.servicioSocio.obtenerTodos().subscribe({
        next : (r: ResultadoGenerico) =>{   
          if(r.ok){
            this.listado = r.resultado as Socio[];
          }else {
            console.error(r.mensaje);
            swal({title:'Error!', text:`Error al actualizar listado socios: ${r.mensaje}`, icon: 'error'});
          } 
          
        },
        error :(e) =>{
          swal({title:'Error!', text:`Error al actualizar listado socios: ${e}`, icon: 'error'});
       }
      })
    )
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  

}

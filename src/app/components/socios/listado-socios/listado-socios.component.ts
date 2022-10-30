import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ResultadoGenerico } from 'src/app/models/resultado-generico';
import { Socio } from 'src/app/models/socio';
import { SocioService } from 'src/app/services/socio.service';

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
            alert('Error al actualizar listado socios');
          } 
          
        },
        error :() =>{
          alert('Error al actualizar listado socios');
       }
      })
    )
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  

}

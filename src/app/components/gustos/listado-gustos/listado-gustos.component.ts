import { Component, OnInit,Input,OnDestroy, Output, EventEmitter } from '@angular/core';
import { Gusto } from 'src/app/models/gusto';
import { GustoService } from 'src/app/services/gusto.service';
import { Subscription } from 'rxjs';
import { ResultadoGenerico } from 'src/app/models/resultado-generico';
import { Router } from '@angular/router';
@Component({
  selector: 'app-listado-gustos',
  templateUrl: './listado-gustos.component.html',
  styleUrls: ['./listado-gustos.component.css']
})
export class ListadoGustosComponent implements OnInit,OnDestroy {

  @Input() listado : Gusto[]=[];
  constructor(private servicioGusto : GustoService) { }
  private subscription = new Subscription();
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  ngOnInit() : void{
    this.actualizarListado();
  }

  actualizarListado(){
    this.subscription.add(
      this.servicioGusto.obtenerTodos().subscribe({
        next : (listado: ResultadoGenerico) =>{    
          if(listado.resultado && listado.resultado.length>=0){ 
            this.listado=listado.resultado;
          }
        },
        error :() =>{
          alert('Error al actualizar listado gustos')
        }
      })
    )
  }
}

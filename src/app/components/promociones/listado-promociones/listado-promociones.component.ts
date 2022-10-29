import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Promocion } from 'src/app/models/promocion';
import { PromocionService } from 'src/app/services/promocion.service';

@Component({
  selector: 'app-listado-promociones',
  templateUrl: './listado-promociones.component.html',
  styleUrls: ['./listado-promociones.component.css']
})
export class ListadoPromocionesComponent implements OnInit,OnDestroy {
  @Input() listado : Promocion[]= [];
  constructor(private servicioPromocion : PromocionService) { }
  private subscription = new Subscription();
  
  ngOnInit(): void {
    this.actualizarListado();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  actualizarListado(){
    this.subscription.add(
      this.servicioPromocion.obtenerTodos().subscribe({
        next : (listado : Promocion[]) =>{
          this.listado=listado;
        },
        error :()=>{
          alert('Error al actualizar listado de promociones');
        }
      })
    )
  }

}

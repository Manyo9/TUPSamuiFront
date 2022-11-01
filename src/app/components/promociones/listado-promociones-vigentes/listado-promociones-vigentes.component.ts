import { Component, OnInit, Input } from '@angular/core';
import { Promocion } from 'src/app/models/promocion';
import { PromocionService } from 'src/app/services/promocion.service';
import { Subscription } from 'rxjs';
import { ResultadoGenerico } from 'src/app/models/resultado-generico';
@Component({
  selector: 'app-listado-promociones-vigentes',
  templateUrl: './listado-promociones-vigentes.component.html',
  styleUrls: ['./listado-promociones-vigentes.component.css']
})
export class ListadoPromocionesVigentesComponent implements OnInit {
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
      this.servicioPromocion.obtenerVigentes().subscribe({
        next : (r : ResultadoGenerico) =>{
          if(r.ok){
            this.listado= r.resultado as Promocion[];
          }
          else {
            console.error(r.mensaje)
          }
        },
        error :()=>{
          alert('Error al actualizar listado de promociones');
        }
      })
    )
  }
}

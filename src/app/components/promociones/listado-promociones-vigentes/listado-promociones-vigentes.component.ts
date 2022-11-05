import { Component, OnInit, Input } from '@angular/core';
import { Promocion } from 'src/app/models/promocion';
import { PromocionService } from 'src/app/services/promocion.service';
import { Subscription } from 'rxjs';
import { ResultadoGenerico } from 'src/app/models/resultado-generico';
import { SocioService } from 'src/app/services/socio.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-listado-promociones-vigentes',
  templateUrl: './listado-promociones-vigentes.component.html',
  styleUrls: ['./listado-promociones-vigentes.component.css']
})
export class ListadoPromocionesVigentesComponent implements OnInit {
  misPuntos: number;
  @Input() listado : Promocion[]= [];
  constructor(
    private servicioPromocion : PromocionService,
    private servicioSocios: SocioService,
    private router: Router
    ) { }
  private subscription = new Subscription();
  
  ngOnInit(): void {
    this.cargarDatos();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  cargarDatos(): void {
    this.actualizarListado();
    this.cargarPuntos();
  }
  cargarPuntos(): void {
    this.subscription.add(
      this.servicioSocios.obtenerPuntosDeSocio().subscribe({
        next: (r: ResultadoGenerico) => {
          if(r.ok && r.resultado){
            this.misPuntos = r.resultado[0]? r.resultado[0].puntos : 0;
          } else {
            console.error(r.mensaje);
          }
        },
        error: (e) => {
          console.error(e);
          alert("Error al obtener puntos");
          this.router.navigate(['home']);

        }
      })
    )
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

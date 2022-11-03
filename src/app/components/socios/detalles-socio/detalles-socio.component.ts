import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ResultadoGenerico } from 'src/app/models/resultado-generico';
import { Socio } from 'src/app/models/socio';
import { SocioService } from 'src/app/services/socio.service';

@Component({
  selector: 'app-detalles-socio',
  templateUrl: './detalles-socio.component.html',
  styleUrls: ['./detalles-socio.component.css']
})
export class DetallesSocioComponent implements OnInit,OnDestroy {
@Input() socio : Socio;
listado : any[] =[];
private subscription = new Subscription();

  constructor(private servicioSocio : SocioService) { }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
  }
  obtenerDetalles(): void {
    if(!this.socio.id){
      console.error("No existe socio con ese ID");
      return;
    }
    this.subscription.add(
      this.servicioSocio.obtenerDetallesSocio(this.socio.id).subscribe({
        next: (r: ResultadoGenerico) => {
          if(r.ok){
            this.listado = r.resultado? r.resultado : [];
          }
          else {
            console.error(r.mensaje);
          }
        },
        error: (e) => {
          console.error(e);
        }
      })
    )
  }
}

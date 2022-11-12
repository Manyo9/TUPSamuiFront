import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Promocion } from 'src/app/models/promocion';
import { ResultadoGenerico } from 'src/app/models/resultado-generico';
import { PromocionService } from 'src/app/services/promocion.service';
import { SweetAlert } from 'sweetalert/typings/core';
const swal: SweetAlert = require('sweetalert');

@Component({
  selector: 'app-boton-canjear',
  templateUrl: './boton-canjear.component.html',
  styleUrls: ['./boton-canjear.component.css']
})
export class BotonCanjearComponent implements OnInit, OnDestroy {
  @Input() promocion: Promocion;
  @Input() disabled: boolean;
  @Output() onCanjear = new EventEmitter();
  private subscription: Subscription;
  constructor(
    private promocionService: PromocionService
  ) { }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.subscription = new Subscription();
  }
  canjear(): void {
    if(this.disabled) {
      swal({title:'Atención!', text:`No tienes suficientes puntos para canjear esta promocion!`, icon: 'warning'});
    }
    this.subscription.add(
      this.promocionService.canjear(this.promocion).subscribe({
        next: (r: ResultadoGenerico) => {
          if(r.ok){
            swal({title:'Listo!', text:`Se canjeó la promoción con éxito`, icon: 'success'});
            this.onCanjear.emit();
          } else {
            swal({title:'Error!', text:`Error al canjear promoción: ${r.mensaje}`, icon: 'error'});
          }
        },
        error: (e) => {
          swal({title:'Error!', text:`Error al canjear promoción: ${e}`, icon: 'error'});
        }
      })
    )
  }
}

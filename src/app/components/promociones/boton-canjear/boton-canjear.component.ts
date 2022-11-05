import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Promocion } from 'src/app/models/promocion';
import { ResultadoGenerico } from 'src/app/models/resultado-generico';
import { PromocionService } from 'src/app/services/promocion.service';

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
      alert("No tienes suficientes puntos para canjear esta promocion!");
      return;
    }
    this.subscription.add(
      this.promocionService.canjear(this.promocion).subscribe({
        next: (r: ResultadoGenerico) => {
          if(r.ok){
            alert("Se canjeó la promoción con éxito");
            this.onCanjear.emit();
          } else {
            console.error(r.mensaje);
            alert("Error al canjear promoción");
          }
        },
        error: (e) => {
          console.error(e);
          alert("Error al canjear promoción");
        }
      })
    )
  }
}

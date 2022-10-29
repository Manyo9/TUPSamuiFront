import { Component, OnInit,Input, Output,EventEmitter, OnDestroy} from '@angular/core';
import { Subscription } from 'rxjs';
import { Promocion } from 'src/app/models/promocion';
import { PromocionService } from 'src/app/services/promocion.service';

@Component({
  selector: 'app-baja-promocion',
  templateUrl: './baja-promocion.component.html',
  styleUrls: ['./baja-promocion.component.css']
})
export class BajaPromocionComponent implements OnDestroy {

  @Output () onEliminado = new EventEmitter();
  @Input() promocion : Promocion;
  constructor(private servicioPromocion : PromocionService) { }
  private subscription = new Subscription();

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  eliminarPromocion(){
    this.subscription.add(
      this.servicioPromocion.eliminar(this.promocion).subscribe({
        next : () =>{
          alert('Elimino la promoción con id'+' '+ this.promocion.id+' ' +'correctamente');
          this.onEliminado.emit();
        },
        error : () =>{
          alert('Error al eleiminar');
        }
      })
    )
  }
}

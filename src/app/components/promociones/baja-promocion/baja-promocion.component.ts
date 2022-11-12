import { Component, Input, Output, EventEmitter, OnDestroy} from '@angular/core';
import { Subscription } from 'rxjs';
import { Promocion } from 'src/app/models/promocion';
import { PromocionService } from 'src/app/services/promocion.service';
import { SweetAlert } from 'sweetalert/typings/core';
const swal: SweetAlert = require('sweetalert');

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
          swal({title:'Listo!', text:`Se elimino la promoción con id ${this.promocion.id} correctamente`, icon: 'success'});
          this.onEliminado.emit();
        },
        error : (e) =>{
          swal({title:'Error!', text:`Error al eliminar: ${e}`, icon: 'error'});
        }
      })
    )
  }
}

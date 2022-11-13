import { Component, OnInit,Output,Input,EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Socio } from 'src/app/models/socio';
import { SocioService } from 'src/app/services/socio.service';
import { SweetAlert } from 'sweetalert/typings/core';
const swal: SweetAlert = require('sweetalert');

@Component({
  selector: 'app-baja-socio',
  templateUrl: './baja-socio.component.html',
  styleUrls: ['./baja-socio.component.css']
})
export class BajaSocioComponent implements OnDestroy {
  @Input() socio : Socio;
  @Output () onEliminado = new EventEmitter();
  @Input() isDisabled : boolean;
  constructor(private socioService : SocioService) { }

  private subscription = new Subscription();

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  eliminarSocio(){
    this.subscription.add(
      this.socioService.eliminar(this.socio).subscribe({
        next : () =>{
          swal({title:'Listo!', text:`Elimino el socio con id ${this.socio.id} correctamente`, icon: 'success'});
          this.onEliminado.emit();
        },
        error : (e) =>{
          swal({title:'Error!', text:`Error al eliminar: ${e}`, icon: 'error'});
        }
      })
    )
  }
}

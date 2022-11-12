import { Component, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Gusto } from 'src/app/models/gusto';
import { GustoService } from 'src/app/services/gusto.service';
import { SweetAlert } from 'sweetalert/typings/core';
const swal: SweetAlert = require('sweetalert');

@Component({
  selector: 'app-baja-gustos',
  templateUrl: './baja-gustos.component.html',
  styleUrls: ['./baja-gustos.component.css']
})
export class BajaGustosComponent implements  OnDestroy {
  @Output () onEliminado = new EventEmitter();
  @Input() gusto : Gusto;
  constructor(private servicioGusto : GustoService) { }
  private subscription = new Subscription();

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  eliminarGusto(){
    this.subscription.add(
      this.servicioGusto.eliminar(this.gusto).subscribe({
        next : () =>{
          swal({title:'Listo!', text:`Se eliminó el gusto con id ${this.gusto.id} correctamente`, icon:'success'});
          this.onEliminado.emit();
        },
        error : () =>{
          swal({title:'Error', text:'Error al eliminar', icon: 'error'})
        }
      })
    )
  }
}

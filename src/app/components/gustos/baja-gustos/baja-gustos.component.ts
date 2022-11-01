import { Component, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Gusto } from 'src/app/models/gusto';
import { GustoService } from 'src/app/services/gusto.service';

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
          alert('Elimino el gusto con id'+' '+ this.gusto.id+' ' +'correctamente');
          this.onEliminado.emit();
        },
        error : () =>{
          alert('Error al eleiminar');
        }
      })
    )
  }
}

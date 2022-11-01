import { Component, OnInit,Output, EventEmitter} from '@angular/core';
import { FormGroup, FormBuilder, FormControl} from '@angular/forms';
import { Gusto } from 'src/app/models/gusto';
import { Subscription } from 'rxjs';
import { GustoService } from 'src/app/services/gusto.service';
import { Router } from '@angular/router';
import { Validators } from '@angular/forms';
import { ResultadoGenerico } from 'src/app/models/resultado-generico';
@Component({
  selector: 'app-alta-gustos',
  templateUrl: './alta-gustos.component.html',
  styleUrls: ['./alta-gustos.component.css']
})
export class AltaGustosComponent implements OnInit {

  formulario : FormGroup;
  gusto : Gusto;
  @Output() onAgregar = new EventEmitter();
  private subscription = new Subscription();
  constructor(private formBuilder : FormBuilder,
      private servicioGusto : GustoService,
      private router : Router) { }

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      nombre : [,Validators.required],
      activo : [false],

    })
  }
  cambioCheck(x: boolean){
    this.formulario.patchValue({
      activo : x
    });
  }

  guardar(){
    if(this.formulario.valid){
      this.gusto=this.formulario.value as Gusto;
      this.subscription.add(
        this.servicioGusto.agregar(this.gusto).subscribe({
          next : ()=>{
            alert('Registro el gusto con éxito'); 
            this.onAgregar.emit();
          },
          error : () =>{
            alert('Error al registrar gusto');
          }
        })
      )
    }else{
      alert('Formulario invalido,revise y complete todos los campos!')
    }
  }


  get controlNombre(): FormControl {
    return this.formulario.controls['nombre'] as FormControl;
  }
}

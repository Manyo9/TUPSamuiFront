import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Socio } from 'src/app/models/socio';
import { SocioService } from 'src/app/services/socio.service';

@Component({
  selector: 'app-alta-socio',
  templateUrl: './alta-socio.component.html',
  styleUrls: ['./alta-socio.component.css']
})
export class AltaSocioComponent implements OnInit,OnDestroy {

  socio : Socio;
  formulario : FormGroup;
  private subscription = new Subscription();
  constructor(private servicioSocio : SocioService,
              private formBuilder : FormBuilder,
              private router : Router) {
    this.socio=new Socio();
   }
   ngOnDestroy(): void {
     this.subscription.unsubscribe();
   }
  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      nombre : [,Validators.required],
      apellido : [,Validators.required],
      domicilio : [],
      email : [,Validators.required],
      dni : [,Validators.required],
      telefono : []
    })
  }

  get controlNombre(): FormControl {
    return this.formulario.controls['nombre'] as FormControl;
  }

  get controlApellido (): FormControl{
    return this.formulario.controls['apellido'] as FormControl;
  }

  get controlDni(): FormControl{
    return this.formulario.controls['dni'] as FormControl;
  }

  get controlEmail(): FormControl{
    return this.formulario.controls['email'] as FormControl;
  }


  guardar(){
    if(this.formulario.valid){
      this.socio=this.formulario.value as Socio;
      this.subscription.add(
        this.servicioSocio.agregar(this.socio).subscribe({
          next: () =>{
            alert('Registro socio correctamente');
            this.router.navigate(['/home'])
          },
          error : () =>{
            alert('Error al registrar socio')
          }
        })
      )
    }else {
      alert('Formulario invalido,revise y complete todos los campos!')
    }
  }
}

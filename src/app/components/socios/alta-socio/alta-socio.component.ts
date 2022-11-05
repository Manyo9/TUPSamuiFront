import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ResultadoGenerico } from 'src/app/models/resultado-generico';
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
  isEdit : boolean = false;
  private subscription = new Subscription();
  constructor(private servicioSocio : SocioService,
              private formBuilder : FormBuilder,
              private router : Router,
              private activatedRoute : ActivatedRoute) {
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
    this.cargar();
    if(this.isEdit){
      this.formulario.controls['dni'].disable();
    }
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


  editar(){
    console.log(this.formulario.value);
    let body = this.formulario.value as Socio;
    body.id=this.socio.id;
    body.dni=this.socio.dni;
    this.subscription.add(
      this.servicioSocio.modificar(body).subscribe({
        next : (res : ResultadoGenerico) =>{
          if(res.ok){
            alert('Edito el socio correctamente');
            this.router.navigate(['/socios/listado']);
          }else{
            console.log(res.mensaje);
          }
        },
        error: (e) => { 
          console.error(e);
          alert('Error al editar socio')
        }
      })
    )
  }

  
  cargar () : void{
    this.subscription.add(
      this.activatedRoute.params.subscribe(
        e=>{
          let id = e['id'];
          if(id){
            this.isEdit=true;
            this.subscription.add(
              this.servicioSocio.getSocio(id).subscribe({
                next : (r : ResultadoGenerico) =>{
                  if(r.ok && r.resultado){
                    this.socio=r.resultado[0];
                    this.formulario.patchValue(this.socio);
                  }else{
                    console.log(r.mensaje);                   
                  }
                },
                error : (err) =>{
                  console.log(err);
                  alert('No esta autorizado para editar un socio');
                }
              }
            )
          )}else{
            this.isEdit=false;
          }
        }
      ) 
    )
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ResultadoGenerico } from 'src/app/models/resultado-generico';
import { Socio } from 'src/app/models/socio';
import { SocioService } from 'src/app/services/socio.service';
import { SweetAlert } from 'sweetalert/typings/core';
const swal: SweetAlert = require('sweetalert');

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
            swal({title:'Listo!', text:`Se registro el socio correctamente`, icon: 'success'});
            this.router.navigate(['/home'])
          },
          error : (e) =>{
            swal({title:'Error!', text:`Error al registrar socio: ${e}`, icon: 'error'});
          }
        })
      )
    }else {
      swal({title:'Atención!', text:`Revise y complete todos los campos!`, icon: 'warning'});
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
            swal({title:'Listo!', text:`Se editó el socio correctamente`, icon: 'success'});
            this.router.navigate(['/socios/listado']);
          }else{
            console.log(res.mensaje);
          }
        },
        error: (e) => {
          swal({title:'Error!', text:`Error al editar socio: ${e}`, icon: 'error'});
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
                  swal({title:'Atención!', text:`No esta autorizado para editar un socio`, icon: 'warning'});
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

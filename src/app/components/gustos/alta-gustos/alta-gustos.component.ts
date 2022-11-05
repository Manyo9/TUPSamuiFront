import { Component, OnInit,Output, EventEmitter, Input, OnDestroy} from '@angular/core';
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
export class AltaGustosComponent implements OnInit, OnDestroy {
  @Input() isEdit: boolean;
  formulario : FormGroup;
  @Input() gusto : Gusto;
  @Output() onAgregar = new EventEmitter();
  private subscription = new Subscription();
  constructor(private formBuilder : FormBuilder,
      private servicioGusto : GustoService,
      private router : Router) { }
 
  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      nombre : [,Validators.required],
      activo : [],
    })
    if(this.isEdit){
      this.cargarDatos();
    }
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  cambioCheck(x: boolean){
    this.formulario.patchValue({
      activo : x
    });
  }
  cargarDatos(): void {
    this.formulario.patchValue(this.gusto);
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
  editar(){
    if(this.formulario.valid){
      let body = this.formulario.value as Gusto;
      body.id = this.gusto.id;
      this.subscription.add(
        this.servicioGusto.modificar(body).subscribe({
          next : ()=>{
            alert('Modificó el gusto con éxito'); 
            this.onAgregar.emit();
          },
          error : () =>{
            alert('Error al modificar gusto');
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
  get controlActivo(): FormControl {
    return this.formulario.controls['activo'] as FormControl;
  }
}

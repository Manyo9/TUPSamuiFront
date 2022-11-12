import { Component, OnInit,Output, EventEmitter, Input, OnDestroy} from '@angular/core';
import { FormGroup, FormBuilder, FormControl} from '@angular/forms';
import { Gusto } from 'src/app/models/gusto';
import { Subscription } from 'rxjs';
import { GustoService } from 'src/app/services/gusto.service';
import { Router } from '@angular/router';
import { Validators } from '@angular/forms';
import { SweetAlert } from 'sweetalert/typings/core';
const swal: SweetAlert = require('sweetalert');

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
            swal({title:'Listo!', text:'Registró el gusto con éxito', icon:'success'});
            this.onAgregar.emit();
          },
          error : () =>{
            swal({title:'Error', text:'Error al registrar gusto', icon: 'error'});
          }
        })
      )
    }else{
      swal({title:'Atención', text:'Formulario invalido, revise y complete todos los campos!', icon: 'warning'});
    }
  }
  editar(){
    if(this.formulario.valid){
      let body = this.formulario.value as Gusto;
      body.id = this.gusto.id;
      this.subscription.add(
        this.servicioGusto.modificar(body).subscribe({
          next : ()=>{
            swal({title:'Listo!', text:'Modificó el gusto con éxito', icon:'success'});
            this.onAgregar.emit();
          },
          error : () =>{
            swal({title:'Error', text:'Error al modificar gusto', icon: 'error'})
          }
        })
      )
    }else{
      swal({title:'Atención', text:'Formulario invalido, revise y complete todos los campos!', icon: 'warning'})
    }
  }

  get controlNombre(): FormControl {
    return this.formulario.controls['nombre'] as FormControl;
  }
  get controlActivo(): FormControl {
    return this.formulario.controls['activo'] as FormControl;
  }
}

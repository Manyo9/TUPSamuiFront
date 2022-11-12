import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';
import { Subscription } from 'rxjs';
import { ResultadoGenerico } from 'src/app/models/resultado-generico';
import { SweetAlert } from 'sweetalert/typings/core';
const swal: SweetAlert = require('sweetalert');

@Component({
  selector: 'app-alta-producto',
  templateUrl: './alta-producto.component.html',
  styleUrls: ['./alta-producto.component.css']
})
export class AltaProductoComponent implements OnInit {
formulario : FormGroup;
producto : Producto;
isEdit : boolean = false;
private subscription = new Subscription();
constructor(private formBuilder : FormBuilder,
    private servicioProducto : ProductoService,
    private router : Router,
    private activatedRoute : ActivatedRoute,) { }

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      nombre : [,Validators.required],
      precio : [,Validators.required],
      descripcion : [],
      observaciones : [],
      activo : [],
      disponible : [],
      puntosGanados : [,Validators.required],
      urlImagen : []
    })
    this.cargar();
  }
  cambioActivoCheck(x: boolean){
    this.formulario.patchValue({
      activo : x
    });
  }
  cambioDisponibleCheck(x: boolean){
    this.formulario.patchValue({
      disponible : x
    });
  }

  guardar(){
    if(this.formulario.valid){
      this.producto=this.formulario.value as Producto;
      this.subscription.add(
        this.servicioProducto.agregar(this.producto).subscribe({
          next : (resultado : ResultadoGenerico)=>{
            if(resultado.ok){
              swal({title:'Listo!', text:`Se registró el producto con éxito`, icon: 'success'});
              this.router.navigate(['/productos/listado']);
            }else{
              swal({title:'Error!', text:`${resultado.mensaje}`, icon: 'error'});
              console.log(resultado.mensaje);
            }
          },
          error : (e) =>{
            swal({title:'Error!', text:`Error al registrar producto`, icon: 'error'});
            console.error(e);
          }
        })
      )
    }else{
      swal({title:'Atención!', text:`Revise y complete todos los campos!`, icon: 'warning'});
    }
  }


  get controlNombre(): FormControl {
    return this.formulario.controls['nombre'] as FormControl;
  }

  get controlPrecio(): FormControl {
    return this.formulario.controls['precio'] as FormControl;
  }

  get controlPuntos() : FormControl{
    return this.formulario.controls['puntosGanados'] as FormControl;
  }

  editar(){
    console.log(this.formulario.value);
    let body = this.formulario.value as Producto;
    body.id=this.producto.id;
    this.subscription.add(
      this.servicioProducto.modificar(body).subscribe({
        next : (res : ResultadoGenerico) =>{
          if(res.ok){
            swal({title:'Listo!', text:`Se editó el producto correctamente`, icon: 'success'});
            this.router.navigate(['/productos/listado']);
          }else{
            swal({title:'Error!', text:`${res.mensaje}`, icon: 'error'});
          }
        },
        error: (e) => { 
          swal({title:'Error!', text:`Error al editar producto`, icon: 'error'});
          console.error(e);
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
              this.servicioProducto.getProducto(id).subscribe({
                next : (r : ResultadoGenerico) =>{
                  if(r.ok && r.resultado){
                    this.producto=r.resultado[0];
                    this.formulario.patchValue(this.producto);
                  }else{
                    swal({title:'Error!', text:`${r.mensaje}`, icon: 'error'});               
                  }
                },
                error : (err) =>{
                  swal({title:'Atención!', text:`No esta autorizado para editar un producto`, icon: 'warning'});
                  console.log(err);
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

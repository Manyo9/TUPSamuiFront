import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';
import { Subscription } from 'rxjs';
import { ResultadoGenerico } from 'src/app/models/resultado-generico';
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
              alert('Registro el producto con éxito'); 
              this.router.navigate(['/productos/listado']);
            }else{
              console.log(resultado.mensaje);
            }
          },
          error : () =>{
            alert('Error al registrar producto');
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
            alert('Edito el producto correctamente');
            this.router.navigate(['/productos/listado']);
          }else{
            console.log(res.mensaje);
          }
        },
        error: (e) => { 
          console.error(e);
          alert('Error al editar producto')
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
                    console.log(r.mensaje);                   
                  }
                },
                error : (err) =>{
                  console.log(err);
                  alert('No esta autorizado para editar un producto');
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

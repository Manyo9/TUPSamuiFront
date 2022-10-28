import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { Router } from '@angular/router';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-alta-producto',
  templateUrl: './alta-producto.component.html',
  styleUrls: ['./alta-producto.component.css']
})
export class AltaProductoComponent implements OnInit {
formulario : FormGroup;
producto : Producto;
private subscription = new Subscription();
constructor(private formBuilder : FormBuilder,
    private servicioProducto : ProductoService,
    private router : Router) { }

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      nombre : [,Validators.required],
      precio : [,Validators.required],
      descripcion : [],
      observaciones : [],
      activo : [false],
      puntosGanados : [,Validators.required],
      urlImagen : []
    })
  }
  cambioCheck(x: boolean){
    this.formulario.patchValue({
      activo : x
    });
  }

  guardar(){
    if(this.formulario.valid){
      this.producto=this.formulario.value as Producto;
      this.subscription.add(
        this.servicioProducto.agregar(this.producto).subscribe({
          next : ()=>{
            alert('Registro el producto con éxito'); 
            this.router.navigate(['/productos/listado']);
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

}

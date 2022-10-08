import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Producto } from 'src/app/models/producto';
import { Promocion } from 'src/app/models/promocion';
import { ProductoService } from 'src/app/services/producto.service';
import { PromocionService } from 'src/app/services/promocion.service';

@Component({
  selector: 'app-alta-promocion',
  templateUrl: './alta-promocion.component.html',
  styleUrls: ['./alta-promocion.component.css']
})
export class AltaPromocionComponent implements OnInit {
  controlProductos = new FormControl('');
  formulario: FormGroup;
  promocion: Promocion;
  productos: Producto[];
  prodSeleccionados: Producto[] = [];
  private subscription = new Subscription();
  constructor(private formBuilder: FormBuilder,
    private servicioPromocion: PromocionService,
    private servicioProducto: ProductoService,
    private router: Router) { }

  ngOnInit(): void {
    this.cargarCombo();
    this.formulario = this.formBuilder.group({
      nombre: [, Validators.required],
      descripcion: [],
      porcentajeDescuento: [, Validators.required],
      fechaDesde: [, Validators.required],
      fechaHasta: [, Validators.required]
    })
  }
  cambioCheck(x: boolean): void {
    this.formulario.patchValue({
      activo: x
    });
  }
  cargarCombo(): void {
    this.subscription.add(
      this.servicioProducto.obtenerTodos().subscribe({
        next: (resultado: Producto[]) => {
          this.productos = resultado;
        },
        error: (e) => {
          console.error(e);
        }
      })
    );
  }
  agregarProducto(): void {
    let p: Producto = this.controlProductos.value as unknown as Producto;
    if (!p) return;
    let indice = this.productos.indexOf(p);
    this.prodSeleccionados.push(p);
    this.productos.splice(indice, 1);
    this.controlProductos.reset();
  }
  quitarProducto(p: Producto): void {
    let indice = this.prodSeleccionados.indexOf(p);
    this.productos.push(p);
    this.prodSeleccionados.splice(indice, 1);
  }
  guardar(): void {
    if (this.formulario.valid ) {
      this.promocion = this.formulario.value as Promocion;
      this.promocion.productos = this.prodSeleccionados;
      this.subscription.add(
        this.servicioPromocion.agregar(this.promocion).subscribe({
          next: () => {
            alert('Registro la promoción con éxito');
            this.router.navigate(['/home']);
          },
          error: () => {
            alert('Error al registrar producto');
          }
        })
      )
    } else {
      alert('Formulario invalido,revise y complete todos los campos!')
    }
  }


  get controlNombre(): FormControl {
    return this.formulario.controls['nombre'] as FormControl;
  }
  get controlPorcentajeDescuento(): FormControl {
    return this.formulario.controls['porcentajeDescuento'] as FormControl;
  }
  get controlFechaDesde(): FormControl {
    return this.formulario.controls['fechaDesde'] as FormControl;
  }
  get controlFechaHasta(): FormControl {
    return this.formulario.controls['fechaHasta'] as FormControl;
  }

}

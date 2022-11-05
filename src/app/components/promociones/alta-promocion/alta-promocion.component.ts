import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DetallePromocion } from 'src/app/models/detalle-promocion';
import { Producto } from 'src/app/models/producto';
import { Promocion } from 'src/app/models/promocion';
import { ResultadoGenerico } from 'src/app/models/resultado-generico';
import { ProductoService } from 'src/app/services/producto.service';
import { PromocionService } from 'src/app/services/promocion.service';

@Component({
  selector: 'app-alta-promocion',
  templateUrl: './alta-promocion.component.html',
  styleUrls: ['./alta-promocion.component.css']
})
export class AltaPromocionComponent implements OnInit {
  controlProductos = new FormControl('');
  cantidadProductos = new FormControl('');
  formulario: FormGroup;
  promocion: Promocion;
  productos: Producto[];
  detalles: DetallePromocion[] = [];
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
      precioPuntos: [, Validators.required],
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
        next: (resultado: ResultadoGenerico) => {
          if (resultado.ok) {
            this.productos = resultado.resultado as Producto[];
          }
          else {
            console.error(resultado.mensaje)
          }
        },
        error: (e) => { console.error(e) }
      })
    )
  }
  agregarProducto(): void {
    const p: Producto = this.controlProductos.value as unknown as Producto;
    if (!p) return;
    const c = this.cantidadProductos.value as unknown as number
    if (!c || c < 1) return;
    let d: DetallePromocion = {
      producto: p,
      cantidad: c
    };
    let indice = this.productos.indexOf(p);
    this.detalles.push(d);
    this.productos.splice(indice, 1);
    this.controlProductos.reset();
    this.cantidadProductos.reset();
  }
  quitarProducto(d: DetallePromocion): void {
    let indice = this.detalles.indexOf(d);
    this.productos.push(d.producto);
    this.detalles.splice(indice, 1);
  }
  guardar(): void {
    if (this.formulario.valid ) {
      this.promocion = this.formulario.value as Promocion;
      this.promocion.detalles = this.detalles;
      this.promocion.fechaDesde = new Date(this.formulario.value.fechaDesde);
      this.promocion.fechaHasta = new Date(this.formulario.value.fechaHasta);
      this.promocion.fechaHasta.setHours(this.promocion.fechaHasta.getHours() + 23);
      this.promocion.fechaHasta.setMinutes(this.promocion.fechaHasta.getMinutes() + 59);
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
  get controlPrecioPuntos(): FormControl {
    return this.formulario.controls['precioPuntos'] as FormControl;
  }
  get controlFechaDesde(): FormControl {
    return this.formulario.controls['fechaDesde'] as FormControl;
  }
  get controlFechaHasta(): FormControl {
    return this.formulario.controls['fechaHasta'] as FormControl;
  }

}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ChartData } from 'chart.js';
import { Subscription } from 'rxjs';
import { ResultadoGenerico } from 'src/app/models/resultado-generico';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-reporte-productos',
  templateUrl: './reporte-productos.component.html',
  styleUrls: ['./reporte-productos.component.css']
})

export class ReporteProductosComponent implements OnInit, OnDestroy {
  filasReporte: any[] = [];
  datos: ChartData<'pie'>;
  reqbody: any;
  filtro = new FormControl('');
  formulario: FormGroup;
  private subscription: Subscription;
  constructor(
    private formBuilder: FormBuilder,
    private productoService: ProductoService,
  ) { }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  ordenarPor(array: any[], columna: string): any[] {
    return array.sort((a,b) => (a[columna] > b[columna]) ? 1 : ((b[columna] > a[columna]) ? -1 : 0));
  }
  ngOnInit(): void {
    this.subscription = new Subscription();
    this.formulario = this.formBuilder.group({
      fechaDesde: [, Validators.required],
      fechaHasta: [, Validators.required]
    })
    this.filtro.valueChanges.subscribe( x => {
      if(x){
        this.filasReporte = this.ordenarPor(this.filasReporte,x);
      }
    })
  }
  obtenerReporte(): void {
    if(this.formulario.valid){
      const {fechaDesde, fechaHasta} = this.formulario.value;
      this.reqbody = {
        fechaDesde: new Date(fechaDesde),
        fechaHasta: new Date(fechaHasta)
      }
      this.reqbody.fechaHasta.setHours(this.reqbody.fechaHasta.getHours() + 23);
      this.reqbody.fechaHasta.setMinutes(this.reqbody.fechaHasta.getMinutes() + 59);
  
      this.subscription.add(
        this.productoService.generarReporte(this.reqbody).subscribe({
          next: (r: ResultadoGenerico) => {
            if (r.ok) {
              this.filasReporte = r.resultado ? r.resultado : [];
              this.cargarDatos();
            }
            else {
              console.error(r.mensaje);
            }
          },
          error: (e) => {
            console.error(e);
          }
        }))
    }else{
      alert ('Debe especificar los filtros de fechas')
    }
  }
  cargarDatos(): void {
    this.datos = {
      labels: [],
      datasets: [
        {
          data: [],
        },
      ],
    };
    this.filasReporte.forEach(f => {
      this.datos.labels?.push(f.nombre);
      this.datos.datasets[0].data.push(
        f.cantidadVendida
      );

    });
  }
  get controlFechaDesde(): FormControl {
    return this.formulario.controls['fechaDesde'] as FormControl;
  }

  get controlFechaHasta(): FormControl {
    return this.formulario.controls['fechaHasta'] as FormControl;
  }


}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ChartData } from 'chart.js';
import { Subscription } from 'rxjs';
import { ResultadoGenerico } from 'src/app/models/resultado-generico';
import { ProductoService } from 'src/app/services/producto.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-reporte-productos',
  templateUrl: './reporte-productos.component.html',
  styleUrls: ['./reporte-productos.component.css']
})

export class ReporteProductosComponent implements OnInit, OnDestroy {
  mostrarReporte: boolean = false;
  filasReporte: any[] = [];
  datosBarCant: ChartData<'bar'>;
  datosBar: ChartData<'bar'>;
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
  ordenarPor(array: any[], columna: string, menorMayor: boolean): any[] {
    if (menorMayor) {
      return array.sort((a,b) => (a[columna] > b[columna]) ? 1 : ((b[columna] > a[columna]) ? -1 : 0));
    } else 
    {
      return array.sort((a,b) => (a[columna] < b[columna]) ? 1 : ((b[columna] < a[columna]) ? -1 : 0));
    }
  }
  ngOnInit(): void {
    this.subscription = new Subscription();
    this.formulario = this.formBuilder.group({
      fechaDesde: [, Validators.required],
      fechaHasta: [, Validators.required]
    })
    this.filtro.valueChanges.subscribe( x => {
      if(x){
        if(x == 'nombre') {

          this.filasReporte = this.ordenarPor(this.filasReporte,x,true);
        } else {
          this.filasReporte = this.ordenarPor(this.filasReporte,x,false);
        }
      }
    })
  }
  obtenerReporte(): void {
    if (!this.formulario.valid) {
      alert("¡Debe ingresar una fecha desde y fecha hasta para generar el reporte!");
      return
    }
    this.mostrarReporte = true;
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
    this.datosBarCant = {
      labels: ['Cantidad vendida por producto'],
      datasets: [
      ],
    };
    this.filasReporte.forEach(f => {
      this.datosBarCant.datasets.push(
        {
          label : f.nombre,
          data: [
            f.cantidadVendida
          ],
        }
      );

    });
    this.datosBar = {
        labels: ['productos'],
        datasets: [
        ],
      };

    this.filasReporte.forEach(f => {
      this.datosBar.datasets.push(
        {
          label : f.nombre,
          data: [
            f.promedioCantidad
          ],
        }
      );

    });
  }
  openPDF(): void {
    let DATA: any = document.getElementById('htmlData');
    html2canvas(DATA).then((canvas) => {
      let fileWidth = 200;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save(`Reporte Productos (${new Date().toLocaleDateString("es-AR")}).pdf`);
    });
  }

  get controlFechaDesde(): FormControl {
    return this.formulario.controls['fechaDesde'] as FormControl;
  }

  get controlFechaHasta(): FormControl {
    return this.formulario.controls['fechaHasta'] as FormControl;
  }


}

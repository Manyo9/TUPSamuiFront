import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ChartData } from 'chart.js';
import { Subscription } from 'rxjs';
import { ResultadoGenerico } from 'src/app/models/resultado-generico';
import { CobroService } from 'src/app/services/cobro.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { SweetAlert } from 'sweetalert/typings/core';
const swal: SweetAlert = require('sweetalert');

@Component({
  selector: 'app-reporte-cobros',
  templateUrl: './reporte-cobros.component.html',
  styleUrls: ['./reporte-cobros.component.css']
})
export class ReporteCobrosComponent implements OnInit, OnDestroy {
  mostrarReporte: boolean = false;
  formulario : FormGroup;
  reqbody : any;
  datos: ChartData<'bar'>;
  filasReporte : any[]=[];
  cantCobros : number= 0;
  total : number= 0;
  private leyenda: string[] = ['Gráfico estadistico de cobros'];
  constructor(private servicioCobro : CobroService,
    private formBuilder : FormBuilder) { }
    private subscription = new Subscription();

  ngOnInit(): void {
    this.formulario= this.formBuilder.group({
      fechaDesde : [,Validators.required],
      fechaHasta : [,Validators.required]
    })
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  get controlFechaDesde(): FormControl {
    return this.formulario.controls['fechaDesde'] as FormControl;
  }

  get controlFechaHasta (): FormControl{
    return this.formulario.controls['fechaHasta'] as FormControl;
  }


  obtenerReporteCobros(): void {
    if(this.formulario.valid){
      const {fechaDesde, fechaHasta} = this.formulario.value;
      this.reqbody = {
        fechaDesde: new Date(fechaDesde),
        fechaHasta: new Date(fechaHasta)
      }
      this.reqbody.fechaHasta.setHours(this.reqbody.fechaHasta.getHours() + 23);
      this.reqbody.fechaHasta.setMinutes(this.reqbody.fechaHasta.getMinutes() + 59);
  
      this.subscription.add(
        this.servicioCobro.obtenerCobros(this.reqbody).subscribe({
          next: (r: ResultadoGenerico) => {
            if (r.ok) {
              this.filasReporte = r.resultado ? r.resultado : [];
              this.cantCobros=r.resultado ? r.resultado[0].cantCobros : 0;
              this.total=r.resultado ? r.resultado[0].total : 0;
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
      swal({title:'Atención!', text:`Debe especificar los filtros de fechas`, icon: 'warning'});
    }
  }

  cargarDatos(): void {
    this.datos = {
      labels: ['Monto total en $ cobrado por cada tipo de pago'],
      datasets: [
      ],
    };
    this.filasReporte.forEach(f => {
      this.datos.datasets.push(
        {
          label : f.nombre,
          data: [
            f.total
          ],
        }
      );

    });
  }

  generar(){
    if (!this.formulario.valid) {
      swal({title:'Atención!', text:'¡Debe ingresar una fecha desde y fecha hasta para generar el reporte!', icon: 'warning'});
      return;
    }
    this.mostrarReporte = true;
    this.obtenerReporteCobros();
  }
  openPDF(): void {
    let DATA: any = document.getElementById('htmlData');
    html2canvas(DATA).then((canvas) => {
      let fileWidth = 300;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('l', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      console.log(new Date().toLocaleDateString("es-AR"));
      PDF.save(`Reporte Cobros (${new Date().toLocaleDateString("es-AR")}).pdf`);
    });
  }
}

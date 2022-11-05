import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ChartData } from 'chart.js';
import { Subscription } from 'rxjs';
import { ResultadoGenerico } from 'src/app/models/resultado-generico';
import { CobroService } from 'src/app/services/cobro.service';

@Component({
  selector: 'app-reporte-cobros',
  templateUrl: './reporte-cobros.component.html',
  styleUrls: ['./reporte-cobros.component.css']
})
export class ReporteCobrosComponent implements OnInit, OnDestroy {
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
        f.total
      );

    });
  }

  generar(){
    this.obtenerReporteCobros();
  }
}

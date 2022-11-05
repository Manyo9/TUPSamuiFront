import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ChartData } from 'chart.js';
import { Subscription } from 'rxjs';
import { ResultadoGenerico } from 'src/app/models/resultado-generico';
import { SocioService } from 'src/app/services/socio.service';

@Component({
  selector: 'app-reporte-socios',
  templateUrl: './reporte-socios.component.html',
  styleUrls: ['./reporte-socios.component.css']
})
export class ReporteSociosComponent implements OnInit, OnDestroy {
  formulario : FormGroup;
  reqbody : any;
  datos: ChartData<'bar'>;
  cantSociosNuevo : number= 0;
  cantSociosBaja : number= 0;
  filasPedidosSocios : any[];
  private leyenda: string[] = ['Gráfico cantidad de socios'];
  constructor(private servicioSocio : SocioService,
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

  obtenerCantSociosNuevos(){
    const {fechaDesde, fechaHasta} = this.formulario.value;
    this.reqbody = {
      fechaDesde: new Date(fechaDesde),
      fechaHasta: new Date(fechaHasta)
    }
    this.reqbody.fechaHasta.setHours(this.reqbody.fechaHasta.getHours() + 23);
    this.reqbody.fechaHasta.setMinutes(this.reqbody.fechaHasta.getMinutes() + 59);

    this.subscription.add(
      this.servicioSocio.obtenerSociosNuevos(this.reqbody).subscribe({
        next : (res: ResultadoGenerico) =>{    
          console.log(res);
          if(res.ok){ 
            this.cantSociosNuevo=res.resultado ? res.resultado[0].cantSociosNuevos : 0;
            this.obtenerCantSociosBaja();
          }
        },
        error :() =>{
          alert('Error al generar reporte socios')
        }
      })
    )
  }
  obtenerSociosConMasPedidos() {
    this.subscription.add(
      this.servicioSocio.obtenerSociosConMasPedidos(this.reqbody).subscribe({
        next : (res: ResultadoGenerico) =>{    
          console.log('Socios con mas pedidos :'+ JSON.stringify(res));
          if(res.ok){ 
            this.filasPedidosSocios=res.resultado ? res.resultado: [];
          }
          this.cargarDatos();
        },
        error :() =>{
          alert('Error al generar reporte socios')
        }
      })
    )
  }
  obtenerCantSociosBaja() {
    this.subscription.add(
      this.servicioSocio.obtenerSociosBaja(this.reqbody).subscribe({
        next : (res: ResultadoGenerico) =>{    
          console.log(res);
          if(res.ok){ 
            this.cantSociosBaja=res.resultado ? res.resultado[0].cantSociosBaja : 0;
          }
          this.obtenerSociosConMasPedidos();
        },
        error :() =>{
          alert('Error al generar reporte socios')
        }
      })
    )
  }
  cargarDatos(): void {
    this.datos = {
      labels: this.leyenda,
      datasets: [
        {
          label : 'Socios nuevos',
          data: [
            this.cantSociosNuevo
          ],
        },
        {
          label : 'Socios bajas',
          data: [
          this.cantSociosBaja 
          ]
        },
      ],
    };
    
  }
  generar(){
    this.obtenerCantSociosNuevos();
  }

}

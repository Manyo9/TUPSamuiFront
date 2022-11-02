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
  datos: ChartData<'pie'>;
  cantSociosNuevo : number= 0;
  cantSociosBaja : number= 0;
  private leyenda: string[] = ['Cantidad de socios nuevos','Cantidad de socios dados de baja'];
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
    this.subscription.add(
      this.servicioSocio.obtenerSociosNuevos(this.formulario.value).subscribe({
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
  obtenerCantSociosBaja() {
    this.subscription.add(
      this.servicioSocio.obtenerSociosBaja(this.formulario.value).subscribe({
        next : (res: ResultadoGenerico) =>{    
          console.log(res);
          if(res.ok){ 
            this.cantSociosBaja=res.resultado ? res.resultado[0].cantSociosBaja : 0;
          }
        },
        error :() =>{
          alert('Error al generar reporte socios')
        }
      })
    )
  }

  generar(){
    this.obtenerCantSociosNuevos();
  }

}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ResultadoGenerico } from 'src/app/models/resultado-generico';
import { UsuarioService } from 'src/app/services/usuario.service';
import { SesionIniciadaService } from '../../services/sesion-iniciada.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  rol: string;
  private subscription: Subscription;
  constructor(
    private sesionService: SesionIniciadaService,
    private usuarioService: UsuarioService
    ) { }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  sesionIniciada: boolean;
  ngOnInit(): void {
    this.subscription = new Subscription();
    this.actualizarRol();
    this.sesionService.sesionCambio().subscribe({
      next: (valor: boolean) => {
        this.sesionIniciada = valor;
        this.actualizarRol();
      }
    })
    if (localStorage.getItem('token')) {
      this.sesionService.cambiarEstado(true);
    } else {
      this.sesionService.cambiarEstado(false);
    }
  }
  actualizarRol(): void {
    this.subscription.add(
      this.usuarioService.obtenerRol().subscribe({
        next: (r: ResultadoGenerico) => {
          if(r.ok && r.resultado && r.resultado.length > 0) {
            this.rol = r.resultado[0];
          } else {
            console.log(r);
            this.rol = 'SinLoggear';
          }
        },
        error: (e) => {
          console.error(e);
          this.rol = 'SinLoggear';
        }
      })
    )
  }
}

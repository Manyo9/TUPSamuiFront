import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UsuarioLogin } from '../../models/usuario-login';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';
import { ResultadoGenerico } from '../../models/resultado-generico';
import { SesionIniciadaService } from '../../services/sesion-iniciada.service';
import { SweetAlert } from 'sweetalert/typings/core';
const swal: SweetAlert = require('sweetalert');

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  formulario: FormGroup;
  private subscription = new Subscription();

  constructor(
    private formBuilder: FormBuilder,
    private usuService: UsuarioService,
    private router: Router,
    private sesionService : SesionIniciadaService
  ) {
    this.formulario = this.formBuilder.group(
      {
        usuario: [, Validators.required],
        contrasenia: [, Validators.required]
      }
    );
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  iniciarSesion(): void {

    if (this.formulario.valid) {
      let usuLogin = new UsuarioLogin();
      usuLogin = this.formulario.value as UsuarioLogin;
      this.subscription.add(
        this.usuService.login(usuLogin).subscribe({
          next: (res: ResultadoGenerico) => {
            if (res.ok && res.resultado != null) {
              localStorage.setItem('token',res.resultado[0]);
              swal({title:'Bienvenido/a!', icon:'success'});
              this.sesionService.cambiarEstado(true);
              this.router.navigate(['home']);
            } else {
              swal({title:'Error', text:`${res.mensaje}`, icon: 'error'})
            }
          },
          error: (err) => { swal({title:'Error al iniciar sesión', text: `${err.message}`, icon: 'error'}); }
        })
      );
    }
    else {
      swal({title:'Atención', text: 'Complete los campos', icon: 'warning'});
    }
  }


  volver(): void {
    this.router.navigate(['home']);
  }
}

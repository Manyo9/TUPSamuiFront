import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UsuarioLogin } from '../models/usuario-login';
import { Usuario } from '../models/usuario';
import { UsuarioService } from '../services/usuario.service';
import { Router } from '@angular/router';
import { ResultadoGenerico } from '../models/resultado-generico';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  formulario: FormGroup;
  private subscription = new Subscription();
  private usuario: Usuario = new Usuario();
  private usuLogin: UsuarioLogin;

  constructor(
    private formBuilder: FormBuilder,
    private usuService: UsuarioService,
    private router: Router
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
      this.usuLogin = this.formulario.value as UsuarioLogin;
      this.subscription.add(
        this.usuService.login(this.usuLogin).subscribe({
          next: (res: ResultadoGenerico) => {
            console.log(res);
            if (res.ok && res.resultado != null) {
              //this.usuario = res.resultado?[0]
              //alert(`Bienvenido, ${this.usuario.usuario}!`);
            } else {
              alert(`Error: ${res.mensaje}`)
            }
          },
          error: (e) => { alert("Error al iniciar sesión"), console.log(e) }
        })
      );
    }
    else {
      alert("Complete los campos");
    }
  }

  volver(): void {
    this.router.navigate(['home']);
  }
}

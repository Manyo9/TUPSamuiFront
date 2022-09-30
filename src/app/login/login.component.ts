import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UsuarioLogin } from '../models/usuario-login';
import { Usuario } from '../models/usuario';
import { UsuarioService } from '../services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  formulario: FormGroup;
  private subscription = new Subscription();
  usuario: Usuario = new Usuario();

  constructor(
      private formBuilder: FormBuilder,
      private usuService: UsuarioService,
      private router: Router
    ){ 
      this.formulario = this.formBuilder.group(
        {
          nombre: [, Validators.required],
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
    
    if(this.formulario.valid){
    this.subscription.add(
      this.usuService.login(
          new UsuarioLogin(
            this.formulario.controls['nombre']?.value,
            this.formulario.controls['contrasenia']?.value
            ) // feo, ver de cambiar
        ).subscribe({
        next: (resultado) => {
          if(resultado.length != 0){ // cambiar cuando dejemos de usar mockapi
            this.usuario.nombre = resultado[0].nombre; 
            this.usuario.id = resultado[0].id;
            this.usuario.idRol = resultado[0].idRol;
            alert(`Bienvenido, ${this.usuario.nombre}!`);
          } else {alert("Usuario y/o contraseña incorrectos")}
        },
        error: (e) => {alert("Error al iniciar sesión"), console.log(e)} 
      })
    );}
    else {
      alert("Complete los campos");
    }
  }

  volver(): void {
    this.router.navigate(['home']);
  }
}

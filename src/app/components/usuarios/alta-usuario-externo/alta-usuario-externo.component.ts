import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ResultadoGenerico } from 'src/app/models/resultado-generico';
import { UsuarioLogin } from 'src/app/models/usuario-login';
import { SocioService } from 'src/app/services/socio.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { SocioValidator } from 'src/app/validators/socio-validator';

@Component({
  selector: 'app-alta-usuario-externo',
  templateUrl: './alta-usuario-externo.component.html',
  styleUrls: ['./alta-usuario-externo.component.css']
})
export class AltaUsuarioExternoComponent implements OnInit {

  formulario: FormGroup;
  private subscription = new Subscription();

  constructor(
    private formBuilder: FormBuilder,
    private usuService: UsuarioService,
    private servicioSocio: SocioService,
    private router: Router
  ) {
    this.formulario = this.formBuilder.group(
      {
        usuario: [, [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
        contrasenia: [, [Validators.required, Validators.minLength(8), Validators.maxLength(32)]],
        dni: [null,[Validators.required, Validators.minLength(6), Validators.maxLength(8)],[SocioValidator.dniValidator(this.servicioSocio)]]
      }
    );
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  registrar(): void {
    if (this.formulario.valid) {
      let body = this.formulario.value;
      this.subscription.add(
        this.usuService.registrarExterno(body).subscribe({
          next: (res: ResultadoGenerico) => {
            if (res.ok) {
              alert(`Usuario registrado exitosamente. Proceda a iniciar sesión con las mismas credenciales.`);
              this.router.navigate(['login']);
            } else {
              alert(`Error: ${res.mensaje}`)
            }
          },
          error: (err) => { 
            alert("Error al registrarse: " + err.error.mensaje);
            console.error(err);
        }
        })
      );
    }
    else {
      alert("Revise los campos.");
    }
  }

  volver(): void {
    this.router.navigate(['home']);
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ResultadoGenerico } from 'src/app/models/resultado-generico';
import { SocioService } from 'src/app/services/socio.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { SocioValidator } from 'src/app/validators/socio-validator';
import { SweetAlert } from 'sweetalert/typings/core';
const swal: SweetAlert = require('sweetalert');

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
        dni: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(8)], [SocioValidator.dniValidator(this.servicioSocio)]]
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
              swal({ title: 'Listo!', text: `Usuario registrado exitosamente. Proceda a iniciar sesión con las mismas credenciales.`, icon: 'success' });
              this.router.navigate(['login']);
            } else {
              swal({ title: 'Error!', text: `${res.mensaje}`, icon: 'error' });
            }
          },
          error: (err) => {
            swal({ title: 'Error!', text: `Error al registrarse: ${err.error.mensaje}`, icon: 'error' });
          }
        })
      );
    }
    else {
      swal({ title: 'Atención!', text: `Revise y complete todos los campos!`, icon: 'warning' });
    }
  }

  volver(): void {
    this.router.navigate(['home']);
  }
}

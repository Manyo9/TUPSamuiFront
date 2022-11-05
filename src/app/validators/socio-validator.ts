import {
    AbstractControl,
    AsyncValidatorFn,
    ValidationErrors,
  } from '@angular/forms';
  import { Observable } from 'rxjs';
  import { map } from 'rxjs/operators';
import { SocioService } from '../services/socio.service';
  
  export class SocioValidator {
    static dniValidator(socioService: SocioService): AsyncValidatorFn {
      return (control: AbstractControl): Observable<ValidationErrors | null> => {
        return socioService
          .existeSocioConDNI(control.value)
          .pipe(
            map((result: boolean) => {
              return result ? null : { socioNoExiste: true };
            })
          );
      };
    }

  }
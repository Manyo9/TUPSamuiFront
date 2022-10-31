import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Promocion } from '../models/promocion';
import { ResultadoGenerico } from '../models/resultado-generico';

@Injectable()
export class PromocionService {

  private API_URL : string = 'http://localhost:3000/promociones/';
  constructor(private http : HttpClient) { }


  agregar(promocion : Promocion) : Observable<ResultadoGenerico>{
    let auth_token = localStorage.getItem('token');
    const headers = new HttpHeaders({

        'Content-Type': 'application/json',

        'Authorization': `Bearer ${auth_token}`

      });
    const requestOptions = { headers: headers };

    return this.http.post<ResultadoGenerico>(this.API_URL,promocion,requestOptions);
  }

  obtenerTodos(): Observable<ResultadoGenerico>{
    let auth_token = localStorage.getItem('token');
    const headers = new HttpHeaders({

        'Content-Type': 'application/json',

        'Authorization': `Bearer ${auth_token}`

      });
    const requestOptions = { headers: headers };

    return this.http.get<ResultadoGenerico>(this.API_URL,requestOptions)
  }

  eliminar(promocion : Promocion) : Observable<any>{
    let auth_token = localStorage.getItem('token');
    const headers = new HttpHeaders({

        'Content-Type': 'application/json',

        'Authorization': `Bearer ${auth_token}`

      });
    const requestOptions = { headers: headers };

    return this.http.delete(this.API_URL+promocion.id,requestOptions)
  }
}

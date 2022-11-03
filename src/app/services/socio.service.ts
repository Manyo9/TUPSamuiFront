import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResultadoGenerico } from '../models/resultado-generico';
import { Socio } from '../models/socio';

@Injectable()
export class SocioService {
  private API_URL : string = 'http://localhost:3000/socios/';

  constructor(private http : HttpClient) { }

  agregar (socio : Socio) : Observable<ResultadoGenerico>{

    return this.http.post<ResultadoGenerico>(this.API_URL,socio);
  }


  obtenerTodos(): Observable<ResultadoGenerico>{
    let auth_token = localStorage.getItem('token');
    const headers = new HttpHeaders({

        'Content-Type': 'application/json',

        'Authorization': `Bearer ${auth_token}`

      });
    const requestOptions = { headers: headers };

    return this.http.get<ResultadoGenerico>(this.API_URL,requestOptions);
  }

  eliminar(socio : Socio) : Observable<any>{
    let auth_token = localStorage.getItem('token');
    const headers = new HttpHeaders({

        'Content-Type': 'application/json',

        'Authorization': `Bearer ${auth_token}`

      });
    const requestOptions = { headers: headers }
    return this.http.delete(this.API_URL+socio.id,requestOptions);
  }

  obtenerSociosNuevos(body : any): Observable<ResultadoGenerico>{
    let auth_token = localStorage.getItem('token');
    const headers = new HttpHeaders({

        'Content-Type': 'application/json',

        'Authorization': `Bearer ${auth_token}`

      });
    const requestOptions = { headers: headers };

    return this.http.post<ResultadoGenerico>(this.API_URL + 'nuevos' ,body,requestOptions);
  }


  obtenerSociosBaja(body : any): Observable<ResultadoGenerico>{
    let auth_token = localStorage.getItem('token');
    const headers = new HttpHeaders({

        'Content-Type': 'application/json',

        'Authorization': `Bearer ${auth_token}`

      });
    const requestOptions = { headers: headers };

    return this.http.post<ResultadoGenerico>(this.API_URL + 'bajas' ,body,requestOptions);
  }

  obtenerSociosConMasPedidos(body : any): Observable<ResultadoGenerico>{
    let auth_token = localStorage.getItem('token');
    const headers = new HttpHeaders({

        'Content-Type': 'application/json',

        'Authorization': `Bearer ${auth_token}`

      });
    const requestOptions = { headers: headers };

    return this.http.post<ResultadoGenerico>(this.API_URL + 'pedidos' ,body,requestOptions);
  }

  obtenerDetallesSocio(id: number): Observable<ResultadoGenerico> {
    let auth_token = localStorage.getItem('token');
    const headers = new HttpHeaders({

      'Content-Type': 'application/json',

      'Authorization': `Bearer ${auth_token}`

    });
    const requestOptions = { headers: headers };
    return this.http.get<ResultadoGenerico>(this.API_URL + id, requestOptions);
  }
}

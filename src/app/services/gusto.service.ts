import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Gusto } from '../models/gusto';
import { ResultadoGenerico } from '../models/resultado-generico';

@Injectable()
export class GustoService {

  private API_URL: string = 'http://localhost:3000/gustos/';
  constructor(private http: HttpClient) { }

  agregar(gusto: Gusto): Observable<ResultadoGenerico> {
    let auth_token = localStorage.getItem('token');
    const headers = new HttpHeaders({

      'Content-Type': 'application/json',

      'Authorization': `Bearer ${auth_token}`

    });
    const requestOptions = { headers: headers };

    return this.http.post<ResultadoGenerico>(this.API_URL, gusto, requestOptions);
  }

  obtenerTodos(): Observable<ResultadoGenerico> {
    return this.http.get<ResultadoGenerico>(this.API_URL);
  }

  obtenerPorId(id: number): Observable<ResultadoGenerico> {
    return this.http.get<ResultadoGenerico>(this.API_URL + id);
  }
  modificar(gusto: Gusto): Observable<ResultadoGenerico> {
    let auth_token = localStorage.getItem('token');
    const headers = new HttpHeaders({

      'Content-Type': 'application/json',

      'Authorization': `Bearer ${auth_token}`

    });
    const requestOptions = { headers: headers };
    return this.http.put<ResultadoGenerico>(this.API_URL, gusto, requestOptions);
  }

  eliminar(gusto: Gusto): Observable<any> {
    let auth_token = localStorage.getItem('token');
    const headers = new HttpHeaders({

      'Content-Type': 'application/json',

      'Authorization': `Bearer ${auth_token}`

    });
    const requestOptions = { headers: headers };
    return this.http.delete(this.API_URL + gusto.id, requestOptions)
  }
}

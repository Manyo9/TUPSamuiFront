import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto';
import { ResultadoGenerico } from '../models/resultado-generico';
@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private API_URL : string = 'http://localhost:3000/productos/';
  constructor(private http : HttpClient) { }


  agregar(producto : Producto) : Observable<Producto>{
    let auth_token = localStorage.getItem('token');
    const headers = new HttpHeaders({

        'Content-Type': 'application/json',

        'Authorization': `Bearer ${auth_token}`

      });
    const requestOptions = { headers: headers };

    return this.http.post<Producto>(this.API_URL,producto,requestOptions);
  }

  obtenerTodos(): Observable<ResultadoGenerico>{
    return this.http.get<ResultadoGenerico>(this.API_URL)
  }

  eliminar(producto : Producto) : Observable<any>{
    let auth_token = localStorage.getItem('token');
    const headers = new HttpHeaders({

        'Content-Type': 'application/json',

        'Authorization': `Bearer ${auth_token}`

      });
    const requestOptions = { headers: headers };
    return this.http.delete(this.API_URL+producto.id,requestOptions)
  }
}

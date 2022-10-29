import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pedido } from '../models/pedido';
import { ResultadoGenerico } from '../models/resultado-generico';

@Injectable()
export class PedidoService {

  private API_URL : string = 'http://localhost:3000/pedidos/';
  constructor(private http : HttpClient) { }


  agregar(pedido : Pedido) : Observable<ResultadoGenerico>{
    let auth_token = localStorage.getItem('token');
    const headers = new HttpHeaders({

        'Content-Type': 'application/json',

        'Authorization': `Bearer ${auth_token}`

      });
    const requestOptions = { headers: headers };
    return this.http.post<ResultadoGenerico>(this.API_URL,pedido,requestOptions);
  }
  obtenerPendientes() : Observable<Pedido[]>{
    return this.http.get<Pedido[]>(this.API_URL + "?idEstado=1");
  }
}

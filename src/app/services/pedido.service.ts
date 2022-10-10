import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pedido } from '../models/pedido';

@Injectable()
export class PedidoService {

  private API_URL : string = 'https://632b1463713d41bc8e7fdd8b.mockapi.io/wawa/pedidos';
  constructor(private http : HttpClient) { }


  agregar(pedido : Pedido) : Observable<Pedido>{
    return this.http.post<Pedido>(this.API_URL,pedido);
  }
  obtenerPendientes() : Observable<Pedido[]>{
    return this.http.get<Pedido[]>(this.API_URL + "?idEstado=1");
  }
}

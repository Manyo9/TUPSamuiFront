import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto';
@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private API_URL : string = 'https://6336d5ca5327df4c43ca8004.mockapi.io/api/productos';
  constructor(private http : HttpClient) { }


  agregar(producto : Producto) : Observable<Producto>{
    return this.http.post<Producto>(this.API_URL,producto);
  }
  obtenerTodos(): Observable<Producto[]>{
    return this.http.get<Producto[]>(this.API_URL)
  }
}

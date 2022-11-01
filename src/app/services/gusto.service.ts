import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Gusto } from '../models/gusto';
import { ResultadoGenerico } from '../models/resultado-generico';

@Injectable()
export class GustoService {

  private API_URL : string = 'http://localhost:3000/gustos/';
  constructor(private http : HttpClient) { }



  obtenerTodos(): Observable<ResultadoGenerico>{
    return this.http.get<ResultadoGenerico>(this.API_URL);
  }
}

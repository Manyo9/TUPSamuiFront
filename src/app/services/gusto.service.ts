import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Gusto } from '../models/gusto';

@Injectable()
export class GustoService {

  private API_URL : string = 'https://632b1463713d41bc8e7fdd8b.mockapi.io/wawa/gustos/';
  constructor(private http : HttpClient) { }


  obtenerTodos(): Observable<Gusto[]>{
    return this.http.get<Gusto[]>(this.API_URL)
  }
}

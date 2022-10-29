import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResultadoGenerico } from '../models/resultado-generico';
import { Socio } from '../models/socio';

@Injectable()
export class SocioService {
  private API_URL : string = 'https://6336d5ca5327df4c43ca8004.mockapi.io/api/socios/';

  constructor(private http : HttpClient) { }

  agregar (socio : Socio) : Observable<Socio>{
    return this.http.post<Socio>(this.API_URL,socio);
  }


  obtenerTodos(): Observable<Socio[]>{
    return this.http.get<Socio[]>(this.API_URL);
  }

  eliminar(socio : Socio) : Observable<any>{

    return this.http.delete(this.API_URL+socio.id)
  }

}

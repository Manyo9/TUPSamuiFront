import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Socio } from '../models/socio';

@Injectable()
export class SocioService {
  private API_URL : string = 'https://6336d5ca5327df4c43ca8004.mockapi.io/api/socios/';

  constructor(private http : HttpClient) { }

  agregar (socio : Socio) : Observable<Socio>{
    return this.http.post<Socio>(this.API_URL,socio);
  }
}

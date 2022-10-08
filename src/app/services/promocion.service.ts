import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Promocion } from '../models/promocion';

@Injectable({
  providedIn: 'root'
})
export class PromocionService {

  private API_URL : string = 'https://632b1463713d41bc8e7fdd8b.mockapi.io/wawa/promociones/';
  constructor(private http : HttpClient) { }


  agregar(promocion : Promocion) : Observable<Promocion>{
    return this.http.post<Promocion>(this.API_URL,promocion);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResultadoGenerico } from '../models/resultado-generico';
import { UsuarioLogin } from '../models/usuario-login';

@Injectable()
export class UsuarioService {
  private recurso: string = 'usuarios'
  private apiUrl: string = `http://localhost:3000/${this.recurso}`;


  constructor(private http: HttpClient) { }

  obtenerUsuarios(): Observable<ResultadoGenerico> {
    return this.http.get<ResultadoGenerico>(this.apiUrl);
  }

  login(usuario: UsuarioLogin): Observable<ResultadoGenerico> {
    return this.http.post<ResultadoGenerico>(`${this.apiUrl}/iniciarSesion`,usuario);
  }

  obtenerUsuarioPorId(id: number): Observable<ResultadoGenerico>{
    return this.http.get<ResultadoGenerico>(`${this.apiUrl}/${id}`)
  }
}

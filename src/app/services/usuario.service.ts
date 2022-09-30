import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UsuarioList } from '../models/usuario-list';
import { UsuarioLogin } from '../models/usuario-login';

@Injectable()
export class UsuarioService {
  private recurso: string = 'usuarios'
  private apiUrl: string = `https://633617a38aa85b7c5d282607.mockapi.io/api/${this.recurso}`;
  constructor(private http: HttpClient) { }

  obtenerUsuarios(): Observable<UsuarioList[]> {
    return this.http.get<UsuarioList[]>(this.apiUrl);
  }

  // horrible feo feísimo
  // implementar con POST cuando tengamos la API con springboot
  login(usuario: UsuarioLogin): Observable<UsuarioList> {
    return this.http.get<UsuarioList>(`${this.apiUrl}?nombre=${usuario.nombre}&contrasenia=${usuario.contrasenia}`);
  }

  obtenerUnUsuario(id: number): Observable<UsuarioList>{
    return this.http.get<UsuarioList>(`${this.apiUrl}/${id}`)
  } 
}

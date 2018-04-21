import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from "rxjs/Observable";
import { Usuario } from "app/model/usuario";
import { ConfigService } from 'app/services/config.service';
import { catchError, tap } from 'rxjs/operators';
//esta es la forma correcta
import "rxjs/add/observable/throw";

@Injectable()
export class UsuarioService {

  url: string;
  keyUsuario = "usr";

  constructor(
    private http: HttpClient,
    private config: ConfigService
  ) {
    this.url = this.config.api_url + "usuarios/";
  }

  getUsuarioLogged() {

   /*  let jsonUsuario = localStorage.getItem(this.keyUsuario);
    if (jsonUsuario) {
      console.log("usuario desde localStorage");

      let usuario = JSON.parse(jsonUsuario);
      return Observable.of(usuario);
    } else {
      console.log("usuario desde api"); */
      
      return this.http.get(this.url + "logged")
        .pipe(catchError(this.handleError("getUsuarioLogged")));
   /*  } */

  }

  setUsuarioLogged(value) {
    localStorage.setItem(this.keyUsuario, value);
  }

  getUsuarios() {
    return this.http.get(this.url)
      .pipe(catchError(this.handleError("getUsuarios")));
  }

  getRoles() {
    return this.http.get(this.url + 'get_roles')
      .pipe(catchError(this.handleError("getRoles")));
  }

  getUsuariosResidentes() {
    return this.http.get(this.url + 'residentes')
      .pipe(catchError(this.handleError("getUsuariosResidentes")));
  }

  getUsuariosAlmacenistas() {
    return this.http.get(this.url + 'almacenistas')
      .pipe(catchError(this.handleError("getUsuariosAlmacenistas")));
  }

  getUsuariosControlAlmacen() {
    return this.http.get(this.url + 'control_almacen')
      .pipe(catchError(this.handleError("getUsuariosControlAlmacen")));
  }

  getUsuariosAsesores() {
    return this.http.get(this.url + 'asesores')
      .pipe(catchError(this.handleError("getUsuariosAsesores")));
  }


  createUsuario(usuario) {
    return this.http.post(this.url + 'create_usuario', { usuario: usuario })
      .pipe(catchError(this.handleError("createUsuario")));
  }

  updateUsuario(id, usuario) {
    return this.http.post(this.url + 'update_usuario/' + id, { usuario: usuario })
      .pipe(catchError(this.handleError("updateUsuario")));
  }

  updatePassword(id, password) {
    return this.http.post(this.url + 'update_password/' + id, { password: password })
      .pipe(catchError(this.handleError("updatePassword")));
  }

  delUsuario(id) {
    return this.http.post(this.url + 'del_usuario/' + id, {})
      .pipe(catchError(this.handleError("delUsuario")));
  }



  private handleError<T>(operation = 'operation') {
    return (error: HttpErrorResponse): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message} (${error.status}- ${error.statusText})`);

      return Observable.throw(error);
    };
  }

}

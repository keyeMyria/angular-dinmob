import { Injectable } from '@angular/core';
import { tokenNotExpired } from "angular2-jwt/angular2-jwt";
import { Observable } from "rxjs/Observable";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ConfigService } from 'app/services/config.service';
import { catchError, map, tap } from 'rxjs/operators';
//esta es la forma correcta
import "rxjs/add/observable/throw";



@Injectable()
export class AuthService {

  url: string;

  Rol = {
    Administrador: 1,
    Control: 2,
    Residente: 3,
    Almacenista: 4,
    Contabilidad: 5,
    Ventas: 6,
    AsesorVentas: 7,
    Creditos: 8,
    Recepcion: 9,
    ControlAlmacen: 10

  }

  redirectUrl: string;

  keyToken: string = "token";
  keyUser:string="usuario";

  constructor(
    private http: HttpClient,
    private config: ConfigService
  ) {
    this.url = this.config.api_url + "auth/";
  }

  login(usuario) {
    return this.http.post(this.url + 'login', { usuario: usuario })
      .pipe(
      tap(response => console.log("response", response)),
      catchError(this.handleError("login"))
      )
  }

  logout() {
    localStorage.removeItem(this.keyToken);
    localStorage.removeItem(this.keyUser);
    //console.log("loggedout");
  }

  loggedIn() {
    return tokenNotExpired();
  }

  getToken() {
    return localStorage.getItem(this.keyToken);
  }

  getUsuario() {
    let strUsuario = localStorage.getItem(this.keyUser);

    if (strUsuario) {
      let usuario = JSON.parse(strUsuario);
      //console.log("usurio from local storage", usuario);
      return usuario;
    } else {
      return null;
    }
  }

  setInLocalStorage(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  getRolUsuario() {
    let usuario = this.getUsuario();
    if (usuario) {
      return Number(usuario.id_tipo_usuario);
    } else {
      return -1;
    }

  }

  /*   getUsername() {
      let usuario = this.getUsuario();
      return usuario.email.split('@')[0];
  
    } */

  hasRole(roles: any[]) {
    var visible = false;
    var mi_rol = this.getRolUsuario();

    var i = roles.indexOf(mi_rol);

    if (i >= 0) {
      visible = true;
    }
    /*     console.log("------------------------------");
        console.log("roles", roles);
        console.log("mi rol ", mi_rol);
        console.log("index ", i);
        console.log("visible ", visible);
        console.log("------------------------------"); */
    return visible;

  }






  private handleError<T>(operation = 'operation') {
    return (error: HttpErrorResponse) => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message} (${error.status}- ${error.statusText})`);

      // Let the app keep running by returning an empty result.
      //return of(result as T);

      return Observable.throw(error);
    };
  }




}

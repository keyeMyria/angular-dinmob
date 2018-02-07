import { Injectable } from '@angular/core';
import { JwtHelperService } from "@auth0/angular-jwt";
import { Observable } from "rxjs/Observable";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ConfigService } from 'app/services/config.service';
import { catchError, map, tap } from 'rxjs/operators';
//esta es la forma correcta
import "rxjs/add/observable/throw";
import { UsuarioService } from 'app/services/usuario.service';



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
  //keyUser: string = "usuario";

  constructor(
    private http: HttpClient,
    private config: ConfigService,
    private jwtHelper:JwtHelperService,
    private usuarioSrv:UsuarioService

  ) {
    this.url = this.config.api_url + "auth/";
  }

  login(usuario) {
    return this.http.post(this.url + 'login', { usuario: usuario })
      .pipe(catchError(this.handleError("login")));
  }

  logout() {
    localStorage.removeItem(this.keyToken);
    //localStorage.removeItem(this.keyUser);   
  }

  IsLoggedIn() {
    return this.jwtHelper.isTokenExpired();    
  }

  getToken() {
    return localStorage.getItem(this.keyToken);
  }

/*   getUsuario() {
    let strUsuario = localStorage.getItem(this.keyUser);

    if (strUsuario) {
      let usuario = JSON.parse(strUsuario);      
      return usuario;
    } else {
      return null;
    }
  } */

/*   setUsuario(usuario) {
    localStorage.setItem(this.keyUser, usuario);
  } */

  setToken(token) {
    localStorage.setItem(this.keyToken, token);
  }

  setInLocalStorage(key: string, value: string) {
    localStorage.setItem(key, value);
  }

/*   getRolUsuario() {
    let usuario = this.getUsuario();
    if (usuario) {
      return Number(usuario.id_tipo_usuario);
    } else {
      return -1;
    }

  } */

  /*   getUsername() {
      let usuario = this.getUsuario();
      return usuario.email.split('@')[0];
  
    } */

/*   hasRole(roles: any[]) {
    var visible = false;
    var mi_rol = this.getRolUsuario();

    var i = roles.indexOf(mi_rol);

    if (i >= 0) {
      visible = true;
    }
    return visible;

  } */






  private handleError<T>(operation = 'operation') {
    return (error: HttpErrorResponse) => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message} (${error.status}- ${error.statusText})`);

      return Observable.throw(error);
    };
  }




}

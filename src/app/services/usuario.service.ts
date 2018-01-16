import { Injectable } from '@angular/core';
import { Http, Response } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { Usuario } from "app/model/usuario";
import { AuthHttp } from "angular2-jwt/angular2-jwt";
import { ConfigService } from 'app/services/config.service';

@Injectable()
export class UsuarioService {

  url: string;

  constructor(
    private http: Http,
    private authHttp: AuthHttp,
    private config: ConfigService
  ) {
    this.url = this.config.api_url + "usuarios/";
  }

  getUsuarios(): Observable<Usuario[]> {
    return this.http.get(this.url)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getRoles() {
    return this.http.get(this.url + 'get_roles')
      .map(this.extractData)
      .catch(this.handleError);
  }



  createUsuario(usuario) {
    return this.http.post(this.url + 'create_usuario', { usuario: usuario })
      .map(this.extractData)
      .catch(this.handleError);
  }

  updateUsuario(id, usuario) {
    return this.http.post(this.url + 'update_usuario/' + id, { usuario: usuario })
      .map(this.extractData)
      .catch(this.handleError);
  }

  updatePassword(id, password) {
    return this.http.post(this.url + 'update_password/' + id, { password: password })
      .map(this.extractData)
      .catch(this.handleError);
  }

  delUsuario(id) {
    return this.http.post(this.url + 'del_usuario/' + id, {})
      .map(this.extractData)
      .catch(this.handleError);
  }



  private extractData(res: Response) {
    let body = res.json();
    return body || {};
  }

  private handleError(error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}

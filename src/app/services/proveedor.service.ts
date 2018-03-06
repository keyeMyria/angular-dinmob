import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ConfigService } from 'app/services/config.service';

import { Observable } from "rxjs/Observable";
import { catchError, tap } from 'rxjs/operators';
//esta es la forma correcta
import "rxjs/add/observable/throw";


@Injectable()
export class ProveedorService {

  url: string;

  constructor(
    private http: HttpClient,
    private config: ConfigService
  ) {
    this.url = this.config.api_url + "proveedores/";
  }

  //ok
  getProveedores() {
    return this.http.get(this.url + "get_proveedores")
      .pipe(catchError(this.handleError("getProveedores")));
  }

  //ok
  createProveedor(proveedor) {
    return this.http.post(this.url + "create_proveedor", { proveedor: proveedor })
      .pipe(catchError(this.handleError("createProveedor")));
  }

  //ok
  updateProveedor(id, proveedor) {
    return this.http.post(this.url + "update_proveedor/" + id, { proveedor: proveedor })
      .pipe(catchError(this.handleError("updateProveedor")));
  }

  //ok
  delProveedor(id) {
    return this.http.post(this.url + "del_proveedor/" + id, {})
      .pipe(catchError(this.handleError("delProveedor")));
  }

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



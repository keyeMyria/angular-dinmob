import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ConfigService } from 'app/services/config.service';

import { Observable } from "rxjs/Observable";
import { catchError, tap } from 'rxjs/operators';
//esta es la forma correcta
import "rxjs/add/observable/throw";


@Injectable()
export class VendedorService {

  url: string;

  constructor(
    private http: HttpClient,
    private config: ConfigService
  ) {
    this.url = this.config.api_url + "vendedores/";
  }

  //ok
  getVendedores() {
    return this.http.get(this.url + "get_vendedores")
      .pipe(catchError(this.handleError("getVendedores")));
  }

  //ok
  createVendedor(vendedor) {
    return this.http.post(this.url + "create_vendedor", { vendedor: vendedor })
      .pipe(catchError(this.handleError("createVendedor")));
  }

  //ok
  updateVendedor(id, vendedor) {
    return this.http.post(this.url + "update_vendedor/" + id, { vendedor: vendedor })
      .pipe(catchError(this.handleError("updateVendedor")));
  }

  //ok
  delVendedor(id) {
    return this.http.post(this.url + "del_vendedor/" + id, {})
      .pipe(catchError(this.handleError("delVendedor")));
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

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ConfigService } from 'app/services/config.service';

import { Observable } from "rxjs/Observable";
import { catchError, tap } from 'rxjs/operators';
//esta es la forma correcta
import "rxjs/add/observable/throw";


@Injectable()
export class ComisionService {

  url: string;

  constructor(
    private http: HttpClient,
    private config: ConfigService
  ) {
    this.url = this.config.api_url + "comisiones/";
  }

  //ok
  getComisionesObra(id_obra) {
    return this.http.get(this.url + "get_comisiones_obra/" + id_obra)
      .pipe(catchError(this.handleError("getComisionesObra")));
  }

  //ok
  createPago(pago) {
    return this.http.post(this.url + "create_pago", { pago: pago })
      .pipe(catchError(this.handleError("createPago")));
  }

  //ok
  updatePago(id, pago) {
    return this.http.post(this.url + "update_pago/" + id, { pago: pago })
      .pipe(catchError(this.handleError("updatePago")));
  }

  //ok
  delPago(id) {
    return this.http.post(this.url + "del_pago/" + id, {})
      .pipe(catchError(this.handleError("delPago")));
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




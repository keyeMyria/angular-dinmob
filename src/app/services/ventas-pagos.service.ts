import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from "rxjs/Observable";
import { catchError, map, tap } from 'rxjs/operators';
//esta es la forma correcta
import "rxjs/add/observable/throw";
import { ConfigService } from 'app/services/config.service';

@Injectable()
export class VentasPagosService {

  url: string;

  constructor(
    private http: HttpClient,
    private config: ConfigService
  ) {
    this.url = this.config.api_url + "ventas_pagos/";
  }

  //ok
  getPagosObra(id_obra) {
    return this.http.get(this.url + 'get_pagos_obra/' + id_obra)
      .pipe(catchError(this.handleError("getPagosObra")));
  }

  //ok
  createPago(pago) {
    return this.http.post(this.url + 'create_pago/', { pago: pago })
      .pipe(catchError(this.handleError("createPago")));
  }


  //ok
  updatePago(id_pago, pago) {
    return this.http.post(this.url + 'update_pago/' + id_pago, { pago: pago })
      .pipe(catchError(this.handleError("updatePago")));
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

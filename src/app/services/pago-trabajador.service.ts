
import {throwError as observableThrowError,  Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ConfigService } from 'app/services/config.service';
import { catchError, map, tap } from 'rxjs/operators';
import "rxjs/add/observable/throw";

@Injectable()
export class PagoTrabajadorService {
  url: string;

  constructor(
    private http: HttpClient,
    private config: ConfigService
  ) {
    this.url = this.config.api_url + "pagos/";
  }

  //ok
  createPagoTrabajador(pago) {
    return this.http.post(this.url + 'create_pago_trabajador/', { pago: pago })
      .pipe(catchError(this.handleError("createPagoTrabajador")));
  }

  updatePagoTrabajador(id_pago, pago) {
    return this.http.post(this.url + 'update_pago_trabajador/' + id_pago, { pago: pago })
      .pipe(catchError(this.handleError("updatePagoTrabajador")));
  }

  delPagoTrabajador(id_pago) {
    return this.http.post(this.url + 'del_pago_trabajador/' + id_pago, {})
      .pipe(catchError(this.handleError("delPagoTrabajador")));
  }

  //ok
  getTipos() {
    return this.http.get(this.url + 'get_tipos/')
      .pipe(catchError(this.handleError("getTipos")));
  }

  private handleError<T>(operation = 'operation') {
    return (error: HttpErrorResponse) => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message} (${error.status}- ${error.statusText})`);

      return observableThrowError(error);
    };
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ConfigService } from 'app/services/config.service';

import { Observable } from "rxjs/Observable";
import { catchError, tap } from 'rxjs/operators';
//esta es la forma correcta
import "rxjs/add/observable/throw";


@Injectable()
export class GastoService {

  url: string;

  constructor(
    private http: HttpClient,
    private config: ConfigService
  ) {
    this.url = this.config.api_url + "gastos/";
  }

  //ok
  getGastosObra(id_obra) {
    return this.http.get(this.url + "get_gastos_obra/" + id_obra)
      .pipe(catchError(this.handleError("getGastosObra")));
  }

  //ok
  createGasto(gasto) {
    return this.http.post(this.url + "create_gasto", { gasto: gasto })
      .pipe(catchError(this.handleError("createGasto")));
  }

  //ok
  updateGasto(id, gasto) {
    return this.http.post(this.url + "update_gasto/" + id, { gasto: gasto })
      .pipe(catchError(this.handleError("updateGasto")));
  }

  //ok
  delGasto(id) {
    return this.http.post(this.url + "del_gasto/" + id, {})
      .pipe(catchError(this.handleError("delGasto")));
  }

  getTipos() {
    return this.http.get(this.url + "get_tipos/")
      .pipe(catchError(this.handleError("getTipos")));
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



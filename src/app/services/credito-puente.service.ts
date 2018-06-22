
import {throwError as observableThrowError,  Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ConfigService } from 'app/services/config.service';
import { catchError, tap } from 'rxjs/operators';
//esta es la forma correcta
import "rxjs/add/observable/throw";

@Injectable()
export class CreditoPuenteService {

  url: string;

  constructor(
    private http: HttpClient,
    private config: ConfigService
  ) {
    this.url = this.config.api_url + "creditos/";
  }

  //ok
  getMovimientos(id_obra) {
    return this.http.get(this.url + "get_all_movs_obra/"+ id_obra)
      .pipe(catchError(this.handleError("getMovimientos")));
  }

  //ok
  createMovimiento(mov) {
    return this.http.post(this.url + "create_mov", { mov: mov })
      .pipe(catchError(this.handleError("createMovimiento")));
  }

  //ok
  updateMovimiento(id, mov) {
    return this.http.post(this.url + "update_mov/" + id, { mov: mov })
      .pipe(catchError(this.handleError("updateMovimiento")));
  }

  //ok
  delMovimiento(id) {
    return this.http.post(this.url + "del_mov/" + id, {})
      .pipe(catchError(this.handleError("delMovimiento")));
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

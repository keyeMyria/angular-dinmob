
import {throwError as observableThrowError,  Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ConfigService } from 'app/services/config.service';
import { catchError, tap } from 'rxjs/operators';
//esta es la forma correcta
import "rxjs/add/observable/throw";

@Injectable()
export class LogService {

  url: string;

  constructor(
    private http: HttpClient,
    private config: ConfigService
  ) {
    this.url = this.config.api_url + "logs/";
  }

  getLog() {
    return this.http.get(this.url + "get_log")
      .pipe(catchError(this.handleError("getLog")));
  }

  getLogUsuario(id_usuario) {
    return this.http.get(this.url + "get_log_usuario/" + id_usuario)
      .pipe(catchError(this.handleError("getLogUsuario")));
  }




  private handleError<T>(operation = 'operation') {
    return (error: HttpErrorResponse): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message} (${error.status}- ${error.statusText})`);

      return observableThrowError(error);
    };
  }

}

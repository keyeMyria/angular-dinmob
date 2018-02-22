import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ConfigService } from 'app/services/config.service';

import { Observable } from "rxjs/Observable";
import { catchError, tap } from 'rxjs/operators';
//esta es la forma correcta
import "rxjs/add/observable/throw";

@Injectable()
export class InstitucionCreditoService {
  url: string;

  constructor(
    private http: HttpClient,
    private config: ConfigService
  ) {
    this.url = this.config.api_url + "ventas_instituciones_credito/";
  }

  //ok
  getInstituciones() {
    return this.http.get(this.url + "get_instituciones")
      .pipe(catchError(this.handleError("getInstituciones")));
  }

  //ok
  createInstitucion(inst) {
    return this.http.post(this.url + "create_institucion", { institucion: inst })
      .pipe(catchError(this.handleError("createInstitucion")));
  }

  //ok
  updateInstitucion(id, inst) {
    return this.http.post(this.url + "update_institucion/" + id, { institucion: inst })
      .pipe(catchError(this.handleError("updateInstitucion")));
  }

  //ok
  delInstitucion(id) {
    return this.http.post(this.url + "del_institucion/" + id, {})
      .pipe(catchError(this.handleError("delInstitucion")));
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

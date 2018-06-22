
import {throwError as observableThrowError,  Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ConfigService } from 'app/services/config.service';
import { catchError, tap } from 'rxjs/operators';
//esta es la forma correcta
import "rxjs/add/observable/throw";

@Injectable()
export class ActaEntregaService {

  url: string;

  constructor(
    private http: HttpClient,
    private config: ConfigService
  ) {
    this.url = this.config.api_url + "actas_entrega/";
  }


  getActas() {
    return this.http.get(this.url)
      .pipe(catchError(this.handleError("getActas")));
  }

  getActasObra(id_obra) {
    return this.http.get(this.url + "get_actas_obra/" + id_obra)
      .pipe(catchError(this.handleError("getActasObra")));
  }

  getActa(id_acta) {
    return this.http.get(this.url + 'get_acta/' + id_acta)
      .pipe(catchError(this.handleError("getActa")));
  }

  createActa(acta, areas, equipamiento) {
    return this.http.post(this.url + 'create_acta', { acta: acta, areas: areas, equipamiento: equipamiento })
      .pipe(catchError(this.handleError("createActa")));

  }

  updateActa(id, acta) {
    return this.http.post(this.url + 'update_acta/' + id, { acta: acta })
      .pipe(catchError(this.handleError("updateActa")));
  }

  delActa(id) {
    return this.http.post(this.url + 'del_acta/' + id, {})
      .pipe(catchError(this.handleError("delActa")));
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

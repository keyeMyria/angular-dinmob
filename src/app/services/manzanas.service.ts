import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from "rxjs/Observable";
import { catchError, map, tap } from 'rxjs/operators';
import { ConfigService } from 'app/services/config.service';
//esta es la forma correcta
import "rxjs/add/observable/throw";

@Injectable()
export class ManzanasService {
  url: string;

  constructor(
    private http: HttpClient,
    private config: ConfigService
  ) {
    this.url = this.config.api_url + "manzanas/";
  }


  addManzanaByNombre(nombre, id_obra) {
    return this.http.post(this.url + 'create_manzana_por_nombre', { nombre: nombre, id_obra: id_obra })
    .pipe(
      tap(response => console.log("response", response)),
      catchError(this.handleError("addManzanaByNombre"))
      )
  }

  addManzanaByNumero(prefijo, ini, fin, id_obra) {
    return this.http.post(this.url + 'create_manzana_por_numero', { prefijo: prefijo, ini: ini, fin: fin, id_obra: id_obra })
    .pipe(
      tap(response => console.log("response", response)),
      catchError(this.handleError("addManzanaByNumero"))
      )
  }

  private handleError(operation = 'operation') {
    return (error: HttpErrorResponse) => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message} (${error.status}- ${error.statusText})`);

      return Observable.throw(error);
    };
  }

}

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";
import { Cliente } from 'app/model/cliente';
import { ConfigService } from 'app/services/config.service';
import { catchError, map, tap } from 'rxjs/operators';
//esta es la forma correcta
import "rxjs/add/observable/throw";

@Injectable()
export class TrabajadorService {

  url: string;

  constructor(
    private http: HttpClient,
    private config: ConfigService
  ) {
    this.url = this.config.api_url + "trabajadores/";
  }


  //ok
  getTrabajadoresObra(id_obra) {
    return this.http.get(this.url + "get_trabajadores_obra/" + id_obra)
      .pipe(catchError(this.handleError("getTrabajadoresObra")));
  }

  //ok
  getEspecialidades(id_obra) {
    return this.http.get(this.url + "get_especialidades")
      .pipe(catchError(this.handleError("getEspecialidades")));
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

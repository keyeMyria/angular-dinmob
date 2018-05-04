import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from "rxjs/Observable";
import { catchError, map, tap } from 'rxjs/operators';
//esta es la forma correcta
import "rxjs/add/observable/throw";
import { ConfigService } from 'app/services/config.service';

@Injectable()
export class SalidasService {
  url: string;

  constructor(
    private http: HttpClient,
    private config: ConfigService
  ) {
    this.url = this.config.api_url + "salidas/";
  }

  //ok
  createSalida(salida, insumos) {
    return this.http.post(this.url + 'create_salida', { salida: salida, insumos: insumos })
      .pipe(catchError(this.handleError("createSalida")));
  }


  //ok
  getSalidasObra(id_obra) {
    return this.http.get(this.url + 'obra/' + id_obra)
      .pipe(catchError(this.handleError("getSalidasObra")));
  }

  //ok
  getCountSalidasObra(id_obra, tipo_salida): Observable<any> {
    return this.http.post(this.url + 'count_obra/' + id_obra, { tipo_salida: tipo_salida })
      .pipe(catchError(this.handleError("getCountSalidasObra")));
  }

  //ok
  getPageSalidasObra(id_obra, page_size, page, tipo_salida): Observable<any> {
    return this.http.post(this.url + 'page_obra/' + id_obra, { page_size: page_size, page: page, tipo_salida: tipo_salida })
      .pipe(catchError(this.handleError("getPageSalidasObra")));
  }

  //ok
  getSalida(id_salida) {
    return this.http.get(this.url + 'get_salida/' + id_salida)
      .pipe(catchError(this.handleError("getSalida")));
  }

  getPartidasUrbanizacion() {
    return this.http.get(this.url + 'get_partidas_urbanizacion')
      .pipe(catchError(this.handleError("getPartidasUrbanizacion")));
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

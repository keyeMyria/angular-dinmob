
import { throwError as observableThrowError, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ConfigService } from 'app/services/config.service';
import { catchError, tap } from 'rxjs/operators';
//esta es la forma correcta
import "rxjs/add/observable/throw";


@Injectable()
export class VendedorService {

  url: string;

  constructor(
    private http: HttpClient,
    private config: ConfigService
  ) {
    this.url = this.config.api_url + "vendedores/";
  }

  //ok
  getVendedoresObra(id_obra) {
    return this.http.get(this.url + "get_vendedores_obra/" + id_obra)
      .pipe(catchError(this.handleError("getVendedoresObra")));
  }

  //ok
  createVendedor(vendedor) {
    return this.http.post(this.url + "create_vendedor", { vendedor: vendedor })
      .pipe(catchError(this.handleError("createVendedor")));
  }

  //ok
  updateVendedor(id, vendedor) {
    return this.http.post(this.url + "update_vendedor/" + id, { vendedor: vendedor })
      .pipe(catchError(this.handleError("updateVendedor")));
  }

  //ok
  delVendedor(id) {
    return this.http.post(this.url + "del_vendedor/" + id, {})
      .pipe(catchError(this.handleError("delVendedor")));
  }

  //ok
  getGraficasVendedores(id_obra) {
    return this.http.get(this.url + 'get_graficas_vendedores/' + id_obra)
      .pipe(catchError(this.handleError("getGraficasVendedores")));
  }

  //ok
  getEquiposConVendedores() {
    return this.http.get(this.url + 'get_equipos_con_vendedores/')
      .pipe(catchError(this.handleError("getEquiposConVendedores")));
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

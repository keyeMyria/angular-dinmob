import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from "rxjs/Observable";
import { ConfigService } from 'app/services/config.service';
import { catchError, map, tap } from 'rxjs/operators';
//esta es la forma correcta
import "rxjs/add/observable/throw";

@Injectable()
export class ObrasService {

  url: string;

  constructor(
    private http: HttpClient,
    private config: ConfigService
  ) {
    this.url = this.config.api_url + "obras/";
  }

  //ok
  createObra(obra) {
    return this.http.post(this.url + 'create_obra', {
      obra: obra
    })
      .pipe(
      catchError(this.handleError("createObra"))
      )
  }

  //ok
  updateObra(id_obra, obra) {
    return this.http.post(this.url + 'update_obra/' + id_obra, {
      obra: obra
    })
      .pipe(
      catchError(this.handleError("updateObra"))
      )
  }



  //ok
  getAcordeonManzanas(id_obra) {
    return this.http.get(this.url + 'get_manzanas_lotes/' + id_obra)
      .pipe(
      catchError(this.handleError("getAcordeonManzanas"))
      )
  }



  //ok
  getLotesEnVentaLibres(id_obra) {
    return this.http.get(this.url + 'get_manzanas_lotes_en_venta_libres/' + id_obra)
      .pipe(
      catchError(this.handleError("getLotesEnVentaLibres"))
      )
  }


  //ok
  getLotes(id_obra) {
    return this.http.get(this.url + 'get_lotes/' + id_obra)
      .pipe(
      catchError(this.handleError("getLotes"))
      )
  }

  //ok
  getLotesEnVenta(id_obra) {
    return this.http.get(this.url + 'get_lotes_en_venta/' + id_obra)
      .pipe(
      catchError(this.handleError("getLotes"))
      )
  }


  //ok
  getObrasUsuario(id) {
    return this.http.get(this.url + 'usuario/' + id)
      .pipe(
      catchError(this.handleError("getObrasUsuario"))
      )
  }

  //ok
  getMapasUsuario(id) {
    return this.http.get(this.url + 'usuario_mapas/' + id)
      .pipe(
      catchError(this.handleError("getMapasUsuario"))
      )
  }

  //ok
  getObrasConUsuarios() {
    return this.http.get(this.url + "get_obras_con_usuarios")
      .pipe(
      catchError(this.handleError("getObrasConUsuarios"))
      )
  }



  //ok
  delObra(id_obra) {
    return this.http.post(this.url + "del_obra/" + id_obra, {})
      .pipe(
      catchError(this.handleError("delObra"))
      )
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

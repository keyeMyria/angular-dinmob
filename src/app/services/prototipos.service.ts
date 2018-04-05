import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from "rxjs/Observable";
import { ConfigService } from 'app/services/config.service';
import { catchError, tap } from 'rxjs/operators';
//esta es la forma correcta
import "rxjs/add/observable/throw";

@Injectable()
export class PrototiposService {
  url: string;

  constructor(
    private http: HttpClient,
    private config: ConfigService
  ) {
    this.url = this.config.api_url + "prototipos/";
  }



  //ok
  createPrototipo(prototipo) {
    return this.http.post(this.url + "create_prototipo/", { prototipo: prototipo })
      .pipe(catchError(this.handleError("createPrototipo")));
  }

  updatePrototipo(id, prototipo) {
    return this.http.post(this.url + 'update_prototipo/' + id, { prototipo: prototipo })
      .pipe(catchError(this.handleError("updatePrototipo")));
  }

  //ok
  getPrototiposObra(id_obra) {
    return this.http.get(this.url + "get_prototipos_obra/" + id_obra)
      .pipe(catchError(this.handleError("getPrototiposObra")));
  }

  //ok
  getAcordeonPartidas(id_prototipo) {
    return this.http.get(this.url + 'get_acordeon_partidas/' + id_prototipo)
      .pipe(catchError(this.handleError("getAcordeonPartidas")));
  }

  //ok
  delPrototipo(id) {
    return this.http.post(this.url + 'del_prototipo/' + id, {})
      .pipe(catchError(this.handleError("delPrototipo")));
  }

  //ok
  getUploadPrototipoURL() {
    return this.config.api_url + "upload/upload_excel_prototipo";
  }

  //ok
  createPrototipoFromExcel(filename, id_obra, nombre) {
    return this.http.post(this.config.api_url + "upload/create_protoripo_from_excel", { filename: filename, id_obra: id_obra, nombre: nombre })
      .pipe(catchError(this.handleError("createPrototipoFromExcel")));
  }

  updatePartida(id, partida) {
    return this.http.post(this.url + 'update_partida/' + id, { partida: partida })
      .pipe(catchError(this.handleError("updatePartida")));
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

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
  getEspecialidades() {
    return this.http.get(this.url + "get_especialidades")
      .pipe(catchError(this.handleError("getEspecialidades")));
  }

  //ok
  createTrabajador(trabajador) {
    return this.http.post(this.url + 'create_trabajador', { trabajador: trabajador })
      .pipe(catchError(this.handleError("createTrabajador")));
  }

  //ok
  updateTrabajador(id, trabajador) {
    return this.http.post(this.url + 'update_trabajador/' + id, { trabajador: trabajador })
      .pipe(catchError(this.handleError("updateTrabajador")));
  }


  //ok
  delTrabajador(id) {
    return this.http.post(this.url + 'del_trabajador/' + id, {})
      .pipe(catchError(this.handleError("delTrabajador")));
  }

  //ok
  avances(id_trabajador, fecha_inicio, fecha_fin) {
    return this.http.post(this.url + 'avances/', {id_trabajador: id_trabajador, fecha_ini: fecha_inicio, fecha_fin: fecha_fin})
      .pipe(catchError(this.handleError("avances")));
  }

  //ok
  getTotalAvances(id_trabajador, fecha_inicio, fecha_fin){
    return this.http.post(this.url + 'get_total_avances/', {id_trabajador: id_trabajador, fecha_ini: fecha_inicio, fecha_fin: fecha_fin})
      .pipe(catchError(this.handleError("getTotalAvances")));
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

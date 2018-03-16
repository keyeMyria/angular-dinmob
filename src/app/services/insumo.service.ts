import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ConfigService } from 'app/services/config.service';
import { catchError, map, tap } from 'rxjs/operators';
//esta es la forma correcta
import "rxjs/add/observable/throw";
import { Observable } from 'rxjs/Observable';

@Injectable()
export class InsumoService {
  url: string;

  constructor(
    private http: HttpClient,
    private config: ConfigService
  ) {
    this.url = this.config.api_url + "insumos/";
  }

  getMaterialesObra(id_obra):Observable<any> {
    return this.http.get(this.url + 'materiales_obra/'+id_obra)
      .pipe(catchError(this.handleError("getMaterialesObra")));
  }

  updateInsumo(id, insumo) {
    return this.http.post(this.url + 'update_insumo/' + id, { insumo: insumo })
      .pipe(catchError(this.handleError("updateInsumo")));
  }

  updateInsumoPartida(id, insumo) {
    return this.http.post(this.url + 'update_insumo_partida/' + id, { insumo: insumo })
      .pipe(catchError(this.handleError("updateInsumoPartida")));
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

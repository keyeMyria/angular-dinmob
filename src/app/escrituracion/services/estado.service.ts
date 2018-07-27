import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ConfigService } from 'app/services/config.service';
import { throwError as observableThrowError } from 'rxjs';
import { catchError } from '../../../../node_modules/rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class EstadoService {
  url: string;

  constructor(
    private http: HttpClient,
    private config: ConfigService
  ) {
    this.url = this.config.api_url + "estados/";
  }

  //ok
  getTodosEstadosEscrituracion() {
    return this.http.get(this.url + "get_estados_escrituracion/")
      .pipe(catchError(this.handleError("getTodosEstadosEscrituracion")));
  }

  //ok
  updateEstadosBanco(ids, props) {
    return this.http.post(this.url + 'update_estados_escrituracion_banco/', { ids: ids, props: props })
      .pipe(catchError(this.handleError("updateEstadosBanco")));
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

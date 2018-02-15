import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from "rxjs/Observable";
import { ConfigService } from 'app/services/config.service';
import { catchError, tap } from 'rxjs/operators';
//esta es la forma correcta
import "rxjs/add/observable/throw";

@Injectable()
export class MapasService {
  url: string;

  constructor(
    private http: HttpClient,
    private config: ConfigService
  ) {
    this.url = this.config.api_url + "mapas/";
  }

  getMapaObra(path) {
    // './assets/mapas/'
    return this.http.get("./assets/mapas/" + path)
      .pipe(catchError(this.handleError("getMapaObra")));
  }

  getVentasLotesObra(id_obra) {
    return this.http.get(this.url + 'get_ventas_lotes_obra/' + id_obra)
      .pipe(catchError(this.handleError("getVentasLotesObra")));
  }

  getAvancesLotesObra(id_obra) {
    return this.http.get(this.url + 'get_avances_lotes_obra/' + id_obra)
      .pipe(catchError(this.handleError("getAvancesLotesObra")));
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

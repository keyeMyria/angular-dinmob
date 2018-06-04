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

  getMaterialesObra(id_obra): Observable<any> {
    return this.http.get(this.url + 'get_materiales_obra/' + id_obra)
      .pipe(catchError(this.handleError("getMaterialesObra")));
  }

  getPartidaSalida(id_partida, id_obra, id_lote): Observable<any> {
    return this.http.post(this.url + 'get_partida_salida/' + id_partida, { id_obra: id_obra, id_lote: id_lote })
      .pipe(catchError(this.handleError("getPartidaSalida")));
  }

  updateInsumo(id, insumo) {
    return this.http.post(this.url + 'update_insumo/' + id, { insumo: insumo })
      .pipe(catchError(this.handleError("updateInsumo")));
  }

  updateInsumoPartida(id, insumo) {
    return this.http.post(this.url + 'update_insumo_partida/' + id, { insumo: insumo })
      .pipe(catchError(this.handleError("updateInsumoPartida")));
  }

  createMaterial(insumo, id_obra) {
    return this.http.post(this.url + 'create_material/', { insumo: insumo, id_obra: id_obra })
      .pipe(catchError(this.handleError("createMaterial")));
  }

  delInsumo(id) {
    return this.http.post(this.url + "del_insumo/" + id, {})
      .pipe(catchError(this.handleError("delInsumo")));
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

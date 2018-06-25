
import { throwError as observableThrowError, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
//esta es la forma correcta
import "rxjs/add/observable/throw";
import { ConfigService } from 'app/services/config.service';

@Injectable()
export class EntradasService {
  url: string;

  constructor(
    private http: HttpClient,
    private config: ConfigService
  ) {
    this.url = this.config.api_url + "entradas/";
  }



  //ok
  getEntradasObra(id_obra): Observable<any> {
    return this.http.get(this.url + 'obra/' + id_obra)
      .pipe(catchError(this.handleError("getEntradasObra")));
  }

  //ok
  getCountEntradasObra(id_obra): Observable<any> {
    return this.http.get(this.url + 'count_obra/' + id_obra)
      .pipe(catchError(this.handleError("getCountEntradasObra")));
  }

  //ok
  getPageEntradasObra(id_obra, page_size, page): Observable<any> {
    return this.http.post(this.url + 'page_obra/' + id_obra, { page_size: page_size, page: page })
      .pipe(catchError(this.handleError("getPageEntradasObra")));
  }

  //ok
  getEntrada(id_entrada) {
    return this.http.get(this.url + 'get_entrada/' + id_entrada)
      .pipe(catchError(this.handleError("getEntrada")));
  }

  //ok
  createEntrada(id_obra, insumos, id_proveedor, folio, nota) {
    return this.http.post(this.url + 'create_entrada', { folio: folio, id_obra: id_obra, id_proveedor: id_proveedor, insumos: insumos, nota: nota })
      .pipe(catchError(this.handleError("createEntrada")));
  }

  //ok
  editarEntrada(id_entrada, entrada) {
    return this.http.post(this.url + 'update_entrada/' + id_entrada, { entrada: entrada })
      .pipe(catchError(this.handleError("editarEntrada")));
  }

  delEntrada(id) {
    return this.http.post(this.url + 'del_entrada/' + id, {})
      .pipe(catchError(this.handleError("delEntrada")));
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

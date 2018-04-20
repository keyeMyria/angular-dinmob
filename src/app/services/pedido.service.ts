import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';

import { ConfigService } from 'app/services/config.service';
import { catchError } from 'rxjs/operators';

//esta es la forma correcta
import "rxjs/add/observable/throw";

@Injectable()
export class PedidoService {

  url: string;

  constructor(
    private http: HttpClient,
    private config: ConfigService
  ) {
    this.url = this.config.api_url + "pedidos/";
  }

  getLote(id_lote) {
    return this.http.get(this.url + "get_lote/" + id_lote)
      .pipe(catchError(this.handleError("getLote")));
  }

  getEstados() {
    return this.http.get(this.url + "get_pedido_estados/")
      .pipe(catchError(this.handleError("getEstados")));
  }

  updatePedido(id_pedido, pedido, insumos) {
    return this.http.post(this.url + 'update_pedido/' + id_pedido, { pedido: pedido, insumos: insumos })
      .pipe(catchError(this.handleError("updatePedido")));
  }


  createPedido(pedido, insumos) {
    return this.http.post(this.url + 'create_pedido', { pedido: pedido, insumos: insumos })
      .pipe(catchError(this.handleError("createPedido")));
  }

  getPedidosObra(id_obra) {
    return this.http.get(this.url + "get_pedidos_obra/" + id_obra)
      .pipe(catchError(this.handleError("getPedidosObra")));
  }

  getPedidoInsumos(id_pedido) {
    return this.http.get(this.url + "get_pedido_insumos/" + id_pedido)
      .pipe(catchError(this.handleError("getPedidoInsumos")));
  }

  getPedidoEditable(id_pedido) {
    return this.http.get(this.url + 'get_pedido_editable/' + id_pedido)
      .pipe(catchError(this.handleError("getPedidoEditable")));
  }



  private handleError<T>(operation = 'operation') {
    return (error: HttpErrorResponse): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message} (${error.status}- ${error.statusText})`);

      return Observable.throw(error);
    };
  }

}

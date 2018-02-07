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
export class ClientesService {

  url: string;

  constructor(
    private http: HttpClient,
    private config: ConfigService
  ) {
    this.url = this.config.api_url + "ventas_clientes/";
  }



  //ok
  getClientesObra(id_obra) {
    return this.http.get(this.url + "get_clientes_obra/" + id_obra)
      .pipe(catchError(this.handleError("getClientesObra")));
  }

  //ok
  getClientesSinLote() {
    return this.http.get(this.url + "sin_lote")
      .pipe(catchError(this.handleError("getClientesSinLote")));
  }

  getUploadDocumentClienteURL() {
    return this.url + "upload_document";
  }

  //ok
  getAlertasObra(id_obra) {
    return this.http.get(this.url + "alertas_obra/" + id_obra)
      .pipe(catchError(this.handleError("getAlertasObra")));
  }

  //ok
  getClienteConComprasYDocumentos(id_cliente) {
    return this.http.get(this.url + 'get_cliente_documentos_compras/' + id_cliente)
      .pipe(catchError(this.handleError("getClienteConComprasYDocumentos")));
  }

  //ok
  createCliente(cliente, id_lote) {
    return this.http.post(this.url + 'create_cliente', { cliente: cliente, id_lote: id_lote })
      .pipe(catchError(this.handleError("createCliente")));

  }

  //ok
  updateCliente(id, cliente) {
    return this.http.post(this.url + 'update_cliente/' + id, { cliente: cliente })
      .pipe(catchError(this.handleError("updateCliente")));
  }

  //ok
  updateDocumento(id_documento, documento) {
    return this.http.post(this.url + 'update_documento_cliente/' + id_documento, { documento: documento })
      .pipe(catchError(this.handleError("updateDocumentoCliente")));
  }

  //ok
  delDocumento(id_documento) {
    return this.http.post(this.url + 'del_documento_cliente/' + id_documento, {})
      .pipe(catchError(this.handleError("delDocumento")));
  }

  //ok
  updateCompra(id_cliente, id_lote, compra) {
    return this.http.post(this.url + 'update_compra/' + id_cliente, { id_lote: id_lote, compra: compra })
      .pipe(catchError(this.handleError("updateCompra")));
  }

  //ok
  delCliente(id) {
    return this.http.post(this.url + 'del_cliente/' + id, {})
      .pipe(catchError(this.handleError("delCliente")));
  }

  //ok
  asociarClienteLote(id_cliente, id_lote) {
    return this.http.post(this.url + 'asociar_cliente_lote/' + id_cliente, { id_lote: id_lote })
      .pipe(catchError(this.handleError("asociarClienteLote")));
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

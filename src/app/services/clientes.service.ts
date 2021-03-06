
import {throwError as observableThrowError,  Observable ,  of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
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

  //ok checar si es necesario
  getAlertasObra(id_obra) {
    return this.http.get(this.url + "alertas_obra/" + id_obra)
      .pipe(catchError(this.handleError("getAlertasObra")));
  }

  //ok
  getAlertas() {
    return this.http.get(this.url + "alertas/")
      .pipe(catchError(this.handleError("getAlertas")));
  }

  deshabilitarAlerta(id_cliente) {
    return this.http.get(this.url + "deshabilitar_alerta/" + id_cliente)
      .pipe(catchError(this.handleError("deshabilitarAlerta")));
  }

  //ok
  getClienteConComprasYDocumentos(id_cliente) {
    return this.http.get(this.url + 'get_cliente_documentos_compras/' + id_cliente)
      .pipe(catchError(this.handleError("getClienteConComprasYDocumentos")));
  }


  //ok
  getCompra(id_compra) {
    return this.http.get(this.url + 'get_compra/' + id_compra)
      .pipe(catchError(this.handleError("getCompra")));
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
  updateCompra(id_compra, compra) {
    return this.http.post(this.url + 'update_compra/' + id_compra, { compra: compra })
      .pipe(catchError(this.handleError("updateCompra")));
  }

  //ok
  setActivacionCompra(id_compra, activo) {
    return this.http.post(this.url + 'set_activacion_compra/' + id_compra, { activo: activo })
      .pipe(catchError(this.handleError("setActivacionCompra")));
  }


  //ok
  /*   delCompra(id_cliente, id_lote) {
      return this.http.post(this.url + 'del_compra/' + id_cliente + "/" + id_lote, {})
        .pipe(catchError(this.handleError("delCompra")));
    } */

  //ok
  delCompra(id_compra) {
    return this.http.post(this.url + 'del_compra/' + id_compra, {})
      .pipe(catchError(this.handleError("delCompra")));
  }

  //ok
  delCliente(id) {
    return this.http.post(this.url + 'del_cliente/' + id, {})
      .pipe(catchError(this.handleError("delCliente")));
  }

  //ok
  addCompra(id_cliente, id_lote) {
    return this.http.post(this.url + 'add_compra/' + id_cliente, { id_lote: id_lote })
      .pipe(catchError(this.handleError("addCompra")));
  }

  //ok
  validarCompra(id_cliente, id_lote) {
    return this.http.get(this.url + 'validar_compra/' + id_cliente + "/" + id_lote)
      .pipe(catchError(this.handleError("validarCompra")));
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

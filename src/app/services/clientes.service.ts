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

  /* 
    getClientes(): Observable<Cliente[]> {
      return this.http.get(this.url)
        .map(this.extractData)
        .catch(this.handleError);
    } */

  //ok
  getClientesObra(id_obra) {
    return this.http.get(this.url + "get_clientes_obra/" + id_obra)
      .pipe(
      tap(response => console.log("response", response)),
      catchError(this.handleError("getClientesObra"))
      )
  }

  //ok
  getClientesSinLote() {
    return this.http.get(this.url + "sin_lote")
      .pipe(
      tap(response => console.log("response", response)),
      catchError(this.handleError("getClientesSinLote"))
      )
  }

  getUploadDocumentClienteURL(){
    return this.url + "upload_document";
  }

  //ok
  getAlertasObra(id_obra) {
    return this.http.get(this.url + "alertas_obra/" + id_obra)
      .pipe(
      tap(response => console.log("response", response)),
      catchError(this.handleError("getAlertasObra"))
      )
  }


  /*   getCliente(id_cliente): Observable<Cliente> {
      return this.http.get(this.url + 'get_cliente/' + id_cliente)
        .map(this.extractData)
        .catch(this.handleError);
    } */


  //ok
  getClienteConComprasYDocumentos(id_cliente) {
    return this.http.get(this.url + 'get_cliente_documentos_compras/' + id_cliente)
      .pipe(
      tap(response => console.log("response", response)),
      catchError(this.handleError("getClienteConComprasYDocumentos"))
      )
  }

  /*   getCompras(id_cliente) {
      return this.http.get(this.url + 'get_compras/' + id_cliente)
        .map(this.extractData)
        .catch(this.handleError);
    } */

  //ok
  createCliente(cliente) {
    return this.http.post(this.url + 'create_cliente', { cliente: cliente })
      .pipe(
      tap(response => console.log("response", response)),
      catchError(this.handleError("createCliente"))
      )

  }

  //ok
  updateCliente(id, cliente) {
    return this.http.post(this.url + 'update_cliente/' + id, { cliente: cliente })
      .pipe(
      tap(response => console.log("response", response)),
      catchError(this.handleError("updateCliente"))
      )
  }

  //ok
  updateCompra(id_cliente, id_lote, compra) {
    return this.http.post(this.url + 'update_compra/' + id_cliente, { id_lote: id_lote, compra: compra })
      .pipe(
      tap(response => console.log("response", response)),
      catchError(this.handleError("updateCompra"))
      )
  }

  //ok
  delCliente(id) {
    return this.http.post(this.url + 'del_cliente/' + id, {})
      .pipe(
      tap(response => console.log("response", response)),
      catchError(this.handleError("delCliente"))
      )
  }

  //ok
  asociarClienteLote(id_cliente, id_lote) {
    return this.http.post(this.url + 'asociar_cliente_lote/' + id_cliente, { id_lote: id_lote })
      .pipe(
      tap(response => console.log("response", response)),
      catchError(this.handleError("asociarClienteLote"))
      )
  }

  /*   searchCliente(term: string) {
      if (term === "") {
        return of.call([]);
      }
  
      return this.http.get(this.url + "search_cliente/" + term)
        .map(this.extractData)
        .catch(this.handleError);
  
    } */


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

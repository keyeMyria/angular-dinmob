import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Injectable } from '@angular/core';
import { Http, Response } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";
import { Cliente } from 'app/model/cliente';
import { ConfigService } from 'app/services/config.service';


@Injectable()
export class ClientesService {

  url: string;

  constructor(
    private http: Http,
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
      .map(this.extractData)
      .catch(this.handleError);
  }

    //ok
    getClientesSinLote() {
      return this.http.get(this.url + "sin_lote")
        .map(this.extractData)
        .catch(this.handleError);
    }

  //ok
  getAlertasObra(id_obra) {
    return this.http.get(this.url + "alertas_obra/"+ id_obra)
      .map(this.extractData)
      .catch(this.handleError);
  }


  /*   getCliente(id_cliente): Observable<Cliente> {
      return this.http.get(this.url + 'get_cliente/' + id_cliente)
        .map(this.extractData)
        .catch(this.handleError);
    } */


  //ok
  getClienteConComprasYDocumentos(id_cliente) {
    return this.http.get(this.url + 'get_cliente_documentos_compras/' + id_cliente)
      .map(this.extractData)
      .catch(this.handleError);
  }

  /*   getCompras(id_cliente) {
      return this.http.get(this.url + 'get_compras/' + id_cliente)
        .map(this.extractData)
        .catch(this.handleError);
    } */

  //ok
  createCliente(cliente) {
    return this.http.post(this.url + 'create_cliente', { cliente: cliente })
      .map(this.extractData)
      .catch(this.handleError);

  }

  //ok
  updateCliente(id, cliente) {
    return this.http.post(this.url + 'update_cliente/' + id, { cliente: cliente })
      .map(this.extractData)
      .catch(this.handleError);
  }

  //ok
  updateCompra(id_cliente, id_lote, compra) {
    return this.http.post(this.url + 'update_compra/' + id_cliente, { id_lote: id_lote, compra: compra })
      .map(this.extractData)
      .catch(this.handleError);
  }

  //ok
  delCliente(id) {
    return this.http.post(this.url + 'del_cliente/' + id, {})
      .map(this.extractData)
      .catch(this.handleError);
  }

  /*   searchCliente(term: string) {
      if (term === "") {
        return of.call([]);
      }
  
      return this.http.get(this.url + "search_cliente/" + term)
        .map(this.extractData)
        .catch(this.handleError);
  
    } */



  private extractData(res: Response) {
    let body = res.json();
    return body || {};
  }

  private handleError(error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}

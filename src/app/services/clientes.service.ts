import { Injectable } from '@angular/core';
import { Http, Response } from "@angular/http";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ClientesService {
  url: string = "http://localhost:8080/controldeobras_api/index.php/";

  constructor(
    private http: Http
  ) { }



  addClientesVenta(cliente) {
    return this.http.post(this.url + 'ventas_clientes', { cliente: cliente })
      .map(this.extractData)
      .catch(this.handleError);
  }

  updateClientesVenta(id_cliente, cliente) {
    return this.http.put(this.url + 'ventas_clientes/' + id_cliente, { cliente: cliente })
      .map(this.extractData)
      .catch(this.handleError);
  }

  updateDocumentoCliente(id_documento, nombre) {
    return this.http.put(this.url + 'ventas_clientes/update_documento/' + id_documento, { nombre: nombre })
      .map(this.extractData)
      .catch(this.handleError);
  }

  updatePropCliente(id_cliente, cliente) {
    return this.http.put(this.url + 'ventas_clientes/prop/' + id_cliente, { cliente: cliente })
      .map(this.extractData)
      .catch(this.handleError);
  }

  //            getClientesVenta() {
  //                return this.http.get(this.url + 'ventas_clientes');
  //            }

  getNombresClientesVenta() {
    return this.http.get(this.url + 'ventas_clientes/nombres')
      .map(this.extractData)
      .catch(this.handleError);
  }

  /*  delClienteVenta(id_cliente) {
      return this.http.post(this.url + 'ventas_clientes/delete/' + id_cliente)
        .map(this.extractData)
        .catch(this.handleError);
    }*/

  getClientesConAlerta() {
    return this.http.get(this.url + 'ventas_clientes/alertas')
      .map(this.extractData)
      .catch(this.handleError);
  }

  getClienteVenta(id_cliente) {
    return this.http.get(this.url + 'ventas_clientes/' + id_cliente)
      .map(this.extractData)
      .catch(this.handleError);
  }

  addClienteLote(id_cliente, id_lote) {
    return this.http.post(this.url + 'ventas_clientes/asociar_lote/' + id_cliente, { id_lote: id_lote })
      .map(this.extractData)
      .catch(this.handleError);
  }

  getComprasCliente(id_cliente) {
    return this.http.get(this.url + 'ventas_clientes/compras/' + id_cliente)
      .map(this.extractData)
      .catch(this.handleError);
  }

  updateClienteLote(id_cliente, id_lote, compra) {
    return this.http.put(this.url + 'ventas_clientes/update_compra/', { id_cliente: id_cliente, id_lote: id_lote, compra: compra })
      .map(this.extractData)
      .catch(this.handleError);
  }

  searchClientes(term) {
    return this.http.post(this.url + 'ventas_clientes/search', { term: term })
      .map(this.extractData)
      .catch(this.handleError);
  }

  delCompraCliente(id_cliente, id_lote) {
    return this.http.post(this.url + 'ventas_clientes/eliminar_compra/', { id_cliente: id_cliente, id_lote: id_lote })
      .map(this.extractData)
      .catch(this.handleError);
  }

  /*  delDocumentoCliente(id_documento) {
      return this.http.post(this.url + 'ventas_clientes/delete_documento/' + id_documento)
        .map(this.extractData)
        .catch(this.handleError);
    }*/

  private extractData(res: Response) {
    console.log("response", res);
    let body = res.json();
    console.log("response.json", body);

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

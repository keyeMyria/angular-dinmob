import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Injectable } from '@angular/core';
import { Http, Response } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";
import { Cliente } from 'app/model/cliente';


@Injectable()
export class ClientesService {
  //url: string = "http://192.168.0.107:8080/barroco/api/index.php/clientes/";
  url: string = "http://localhost:8080/dinmob/api/index.php/ventas_clientes/";

  constructor(private http: Http) { }


  getClientes(): Observable<Cliente[]> {
    return this.http.get(this.url)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getCliente(id_cliente): Observable<Cliente> {
    return this.http.get(this.url + 'get_cliente/' + id_cliente)
      .map(this.extractData)
      .catch(this.handleError);
  }

  createCliente(cliente) {
    return this.http.post(this.url + 'create_cliente', { cliente: cliente })
      .map(this.extractData)
      .catch(this.handleError);

  }

  updateCliente(id, cliente) {
    return this.http.post(this.url + 'update_cliente/' + id, { cliente: cliente })
      .map(this.extractData)
      .catch(this.handleError);
  }

  delCliente(id) {
    return this.http.post(this.url + 'del_cliente/' + id, {})
      .map(this.extractData)
      .catch(this.handleError);
  }

  searchCliente(term: string) {
    if (term === "") {
      return of.call([]);
    }

    return this.http.get(this.url + "search_cliente/" + term)
      .map(this.extractData)
      .catch(this.handleError);

  }



  private extractData(res: Response) {
    //console.log("response", res);
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

import { Injectable } from '@angular/core';
import { Http, Response } from "@angular/http";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { ConfigService } from 'app/services/config.service';

@Injectable()
export class ObrasService {

  url: string;

  constructor(
    private http: Http,
    private config: ConfigService
  ) {
    this.url = this.config.api_url + "obras/";
  }

  //ok
  createObra(obra) {
    return this.http.post(this.url + 'create_obra', {
      obra: obra
    })
      .map(this.extractData)
      .catch(this.handleError);
  }

  //ok
  updateObra(id_obra, obra) {
    return this.http.post(this.url + 'update_obra/' + id_obra, {
      obra: obra
    })
      .map(this.extractData)
      .catch(this.handleError);
  }



  //ok
  getAcordeonManzanas(id_obra) {
    return this.http.get(this.url + 'get_manzanas_lotes/' + id_obra)
      .map(this.extractData)
      .catch(this.handleError);
  }


  //ok
  getLotes(id_obra) {
    return this.http.get(this.url + 'get_lotes/' + id_obra)
      .map(this.extractData)
      .catch(this.handleError);
  }


  //ok
  getObrasUsuario(id) {
    return this.http.get(this.url + 'usuario/' + id)
      .map(this.extractData)
      .catch(this.handleError);
  }

  //ok
  getObrasConUsuarios() {
    return this.http.get(this.url + "get_obras_con_usuarios")
      .map(this.extractData)
      .catch(this.handleError);
  }




  delObra(id_obra) {
    return this.http.post(this.url + "delete", { id_obra: id_obra })
      .map(this.extractData)
      .catch(this.handleError);
  }


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

import { Injectable } from '@angular/core';
import { Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { of } from "rxjs/observable/of";
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ActaEntregaService {

  url: string = "http://localhost:8080/dinmob/api/index.php/actas_entrega/";

  constructor(
    private http: Http
  ) { }


  getActas() {
    return this.http.get(this.url)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getActasObra(id_obra) {
    return this.http.get(this.url + "get_actas_obra/" + id_obra)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getActa(id_acta){
    return this.http.get(this.url + 'get_acta/' + id_acta)
      .map(this.extractData)
      .catch(this.handleError);
  }

  createActa(acta) {
    return this.http.post(this.url + 'create_acta', { acta: acta })
      .map(this.extractData)
      .catch(this.handleError);

  }

  updateActa(id, acta) {
    return this.http.post(this.url + 'update_acta/' + id, { acta: acta })
      .map(this.extractData)
      .catch(this.handleError);
  }

  delActa(id) {
    return this.http.post(this.url + 'del_acta/' + id, {})
      .map(this.extractData)
      .catch(this.handleError);
  }

  searchActa(term: string) {
    if (term === "") {
      return of.call([]);
    }

    return this.http.get(this.url + "search_acta/" + term)
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

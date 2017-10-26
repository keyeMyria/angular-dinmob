import { Injectable } from '@angular/core';
import { Http, Response } from "@angular/http";
import { Observable } from "rxjs/Observable";

@Injectable()
export class PrototiposService {
  url: string = "http://localhost:8080/dinmob/api/index.php/prototipos/";

  constructor(private http: Http) { }


  getPrototipos() {
    return this.http.get(this.url)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getPrototiposObra(id_obra) {
    return this.http.get(this.url + "get_prototipos_obra/" + id_obra)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getPrototipo(id_prototipo) {
    return this.http.get(this.url + 'get_prototipo/' + id_prototipo)
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

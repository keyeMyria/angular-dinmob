import { Injectable } from '@angular/core';
import { Http, Response } from "@angular/http";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ObrasService {

  url: string = "http://localhost:8080/controldeobras_api/index.php/";

  constructor(private http: Http) { }

  getObrasUsuarioConMapas(id) {
    return this.http.get(this.url + 'obras/usuario_mapas/' + id);
  }


  //comprobar
  loadFullObra(id_obra) {
    return this.http.get(this.url + 'obras/load/' + id_obra)
      .map(this.extractData)
      .catch(this.handleError);
  }

  cambiarDatosObra(id_obra, nombre_obra, fecha_ini, en_venta, id_almacenista, residentes) {
    return this.http.post(this.url + "obras/cambiar_datos", { id_obra: id_obra, nombre_obra: nombre_obra, fecha_ini: fecha_ini, en_venta: en_venta, id_almacenista: id_almacenista, residentes: residentes })
      .map(this.extractData)
      .catch(this.handleError);
  }

  loadFullObraReporte(id_obra) {
    return this.http.get(this.url + 'obras/load_with_dates/' + id_obra)
      .map(this.extractData)
      .catch(this.handleError);
  }

  obraEnVenta(id_obra, valor) {
    return this.http.post(this.url + 'obras/cambiar_estado_venta/' + id_obra, { valor: valor })
      .map(this.extractData)
      .catch(this.handleError);
  }

  getInfoMapa(id_obra) {
    return this.http.post(this.url + 'obras/estado_lotes/', { id_obra: id_obra })
      .map(this.extractData)
      .catch(this.handleError);
  }

  getManzanasObra(id_obra) {
    return this.http.get(this.url + 'obras/get_manzanas_lotes/' + id_obra)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getObrasUsuario(id) {
    return this.http.get(this.url + 'obras/usuario/' + id)
      .map(this.extractData)
      .catch(this.handleError);
  }


  getAllObras() {
    return this.http.get(this.url + "obras/all")
      .map(this.extractData)
      .catch(this.handleError);
  }

/*  getInfoAllObras() {
    return this.http.post(this.url + "obras/get_info")
      .map(this.extractData)
      .catch(this.handleError);
  }*/

  getInfoConResidentesAllObras() {
    return this.http.get(this.url + "obras/get_info_con_residentes")
      .map(this.extractData)
      .catch(this.handleError);
  }

/*  getPrueba() {
    return this.http.post(this.url + "obras/get_pagos")
       .map(this.extractData)
       .catch(this.handleError);
   }*/

  getDatosObra(id_obra) {
    return this.http.get(this.url + 'obras/get_datos/' + id_obra)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getNombreObra(id_obra) {
    return this.http.get(this.url + 'obras/get_obra/' + id_obra)
      .map(this.extractData)
      .catch(this.handleError);
  }

  addObra(residentes, id_almacenista, nombre, fecha_ini) {
    return this.http.post(this.url + 'obras/add_obra', {
      residentes: residentes,
      id_almacenista: id_almacenista,
      nombre: nombre,
      fecha_ini: fecha_ini
    })
      .map(this.extractData)
      .catch(this.handleError);
  }

  delObra(id_obra) {
    return this.http.post(this.url + "obras/delete", { id_obra: id_obra })
      .map(this.extractData)
      .catch(this.handleError);
  }


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

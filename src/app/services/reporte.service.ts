import { Injectable } from '@angular/core';
import { ConfigService } from 'app/services/config.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';
//esta es la forma correcta
import "rxjs/add/observable/throw";

@Injectable()
export class ReporteService {
  url: string;

  constructor(
    private http: HttpClient,
    private config: ConfigService
  ) {
    this.url = this.config.api_url + "reportes/";
  }

  getTipos() {
    return this.http.get(this.url + 'get_tipos/')
      .pipe(catchError(this.handleError("getTipos")));
  }

  getUrlReporteCompra(id_cliente, id_lote, id_compra) {
    return `${this.url}cliente_lote/${id_cliente}/${id_lote}/${id_compra}`;
  }

  getUrlReporteVentas(id_obra) {
    return `${this.url}lotes_en_venta/${id_obra}`;
  }

  getUrlReportePagos(id_obra) {
    return `${this.url}pagos/${id_obra}`;
  }


  getUrlReporteAcumulado(id_obra, fecha_ini, fecha_fin, inicio) {
    return `${this.url}acumulado/${id_obra}/${fecha_ini}/${fecha_fin}/${inicio}`;
  }

  getUrlReporteInventario(id_obra) {
    return `${this.url}inventario/${id_obra}`;
  }

  getUrlReporteEntradas(id_obra, fecha_ini, fecha_fin, inicio) {
    return `${this.url}entradas/${id_obra}/${fecha_ini}/${fecha_fin}/${inicio}`;
  }

  getUrlReporteSalidas(id_obra, fecha_ini, fecha_fin, inicio) {
    return `${this.url}salidas/${id_obra}/${fecha_ini}/${fecha_fin}/${inicio}`;
  }

  getUrlReporteHistorial(ids) {
    return `${this.url}historial_pagos/${ids}`;
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



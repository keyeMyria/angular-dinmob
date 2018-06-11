import { Injectable } from '@angular/core';
import { ConfigService } from 'app/services/config.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';
//esta es la forma correcta
import "rxjs/add/observable/throw";
import { HttpResponse } from '@angular/common/http';

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


  getReporteAcumulado(id_obra, fecha_ini, fecha_fin, inicio) {
    return this.http.post(this.url + 'acumulado/', { id_obra: id_obra, fecha_fin: fecha_fin, fecha_ini: fecha_ini, inicio: inicio }, { responseType: 'blob' })
      .pipe(catchError(this.handleError("getReporteAcumulado")));
  }

  getReporteInventario(id_obra) {
    return this.http.post(this.url + 'inventario/', { id_obra: id_obra }, { responseType: 'blob' })
      .pipe(catchError(this.handleError("getReporteInventario")));
  }

  getReporteEntradas(id_obra, fecha_ini, fecha_fin, inicio) {
    return this.http.post(this.url + 'entradas/', { id_obra: id_obra, fecha_fin: fecha_fin, fecha_ini: fecha_ini, inicio: inicio }, { responseType: 'blob' })
      .pipe(catchError(this.handleError("getReporteEntradas")));
  }

  getReporteAvances(id_obra, fecha_ini, fecha_fin, inicio, ambito, lotes, trabajadores) {

    return this.http.post(this.url + 'avances/', { id_obra: id_obra, fecha_fin: fecha_fin, fecha_ini: fecha_ini, inicio: inicio, ambito: ambito, lotes: lotes, trabajadores: trabajadores }, { responseType: 'blob' })
      .pipe(catchError(this.handleError("getReporteAvances")));
  }

  getReporteSalidas(id_obra, fecha_ini, fecha_fin, inicio) {
    return this.http.post(this.url + 'salidas/', { id_obra: id_obra, fecha_fin: fecha_fin, fecha_ini: fecha_ini, inicio: inicio }, { responseType: 'blob' })
      .pipe(catchError(this.handleError("getReporteSalidas")));
  }

  getReporteHistorial(id_obra, ids) {
    return this.http.post(this.url + 'historial_pagos/', { id_obra: id_obra, ids: ids }, { responseType: 'blob' })
      .pipe(catchError(this.handleError("getReporteHistorial")));
  }

  getReporteSalidaAlmacen(id_salida) {
    return this.http.get(this.url + 'salida_almacen/' + id_salida, { responseType: 'blob' })
      .pipe(catchError(this.handleError("getReporteSalidaAlmacen")));

  }


  getReporteEntradaAlmacen(id_entrada) {
    return this.http.get(this.url + 'entrada_almacen/' + id_entrada, { responseType: 'blob' })
      .pipe(catchError(this.handleError("getReporteEntradaAlmacen")));

  }

  getReportePedido(id_pedido) {
    return this.http.get(this.url + 'pedido/' + id_pedido, { responseType: 'blob' })
      .pipe(catchError(this.handleError("getReportePedido")));

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



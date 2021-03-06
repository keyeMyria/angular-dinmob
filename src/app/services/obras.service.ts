
import { throwError as observableThrowError, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ConfigService } from 'app/services/config.service';
import { catchError, map, tap } from 'rxjs/operators';
//esta es la forma correcta
import "rxjs/add/observable/throw";


@Injectable()
export class ObrasService {

  url: string;

  constructor(
    private http: HttpClient,
    private config: ConfigService,
  ) {
    this.url = this.config.api_url + "obras/";
  }

  //ok
  createObra(obra) {
    return this.http.post(this.url + 'create_obra', { obra: obra })
      .pipe(catchError(this.handleError("createObra")));
  }

  //ok
  updateObra(id_obra, obra) {
    return this.http.post(this.url + 'update_obra/' + id_obra, { obra: obra })
      .pipe(catchError(this.handleError("updateObra")));
  }


  //ok
  getAcordeonManzanas(id_obra) {
    return this.http.get(this.url + 'get_manzanas_lotes/' + id_obra)
      .pipe(catchError(this.handleError("getAcordeonManzanas")));
  }

  //ok
  getAcordeonManzanasNumFotos(id_obra) {
    return this.http.get(this.url + 'get_acordeon_manzanas_num_fotos/' + id_obra)
      .pipe(catchError(this.handleError("getAcordeonManzanasNumFotos")));
  }


  //ok
  getLotesEnVentaLibres(id_obra) {
    return this.http.get(this.url + 'get_manzanas_lotes_en_venta_libres/' + id_obra)
      .pipe(catchError(this.handleError("getLotesEnVentaLibres")));
  }


  //ok
  getLotes(id_obra) {
    return this.http.get(this.url + 'get_lotes/' + id_obra)
      .pipe(catchError(this.handleError("getLotes")));
  }

  //ok
  getLotesEnVenta(id_obra) {
    return this.http.get(this.url + 'get_lotes_en_venta/' + id_obra)
      .pipe(catchError(this.handleError("getLotes")));
  }


  //Devuelve las obras del usuario con una sesión iniciada
  getObrasUsuario() {
    return this.http.get(this.url + 'usuario')
      .pipe(catchError(this.handleError("getObrasUsuario")));
  }

  //Devuelve los mapas de las obras del usuario con una sesión iniciada
  getMapasUsuario() {
    return this.http.get(this.url + 'usuario_mapas')
      .pipe(catchError(this.handleError("getMapasUsuario")));
  }

  //ok
  getObrasConUsuarios() {
    return this.http.get(this.url + "get_obras_con_usuarios")
      .pipe(catchError(this.handleError("getObrasConUsuarios")));
  }


  //ok
  delObra(id_obra) {
    return this.http.post(this.url + "del_obra/" + id_obra, {})
      .pipe(catchError(this.handleError("delObra")));
  }


  //ok
  getEstadisticasVentas(id_obra) {
    return this.http.get(this.url + "get_estadisticas_ventas/" + id_obra, {})
      .pipe(catchError(this.handleError("getEstadisticasVentas")));
  }

  //ok
  getEstadisticas(id_obra) {
    return this.http.get(this.url + "get_estadisticas/" + id_obra, {})
      .pipe(catchError(this.handleError("getEstadisticas")));
  }

  //ok
  getMaterialesResidentesTrabajadores(id_obra) {
    return this.http.get(this.url + "get_materiales_trabajadores_residentes/" + id_obra)
      .pipe(catchError(this.handleError("getMaterialesResidentesTrabajadores")));
  }

  getManzanasMateriales(id_obra) {
    return this.http.get(this.url + "get_manzanas_lotes_materiales/" + id_obra)
      .pipe(catchError(this.handleError("getManzanasMateriales")));
  }

  //ok
  getManzanasResidentesTrabajadores(id_obra) {
    return this.http.get(this.url + "get_manzanas_lotes_trabajadores_residentes/" + id_obra)
      .pipe(catchError(this.handleError("getManzanasResidentesTrabajadores")));
  }

  //ok
  getManzanasTrabajadores(id_obra) {
    return this.http.get(this.url + "get_manzanas_lotes_trabajadores/" + id_obra)
      .pipe(catchError(this.handleError("getManzanasTrabajadores")));
  }

  //ok
  getUltimosAvances(id_obra) {
    return this.http.get(this.url + "get_ultimos_avances/" + id_obra)
      .pipe(catchError(this.handleError("getUltimosAvances")));
  }

  //ok
  getInsumosAvance(id_obra, fecha) {
    return this.http.get(this.url + "get_insumos_avance/" + id_obra + "/" + fecha)
      .pipe(catchError(this.handleError("getInsumosAvance")));
  }

  //ok
  getInsumosPendientes(id_obra, params) {
    return this.http.post(this.url + "get_insumos_pendientes/" + id_obra, { params: params })
      .pipe(catchError(this.handleError("getInsumosPendientes")));
  }

  //ok
  getVentasDevolucionesPendientes(id_obra) {
    return this.http.get(this.url + "get_devoluciones_pendientes/" + id_obra, {})
      .pipe(catchError(this.handleError("getVentasDevolucionesPendientes")));
  }

  //ok
  getVentasCanceladasDevoluciones(id_obra) {
    return this.http.get(this.url + "get_devoluciones_cancelados/" + id_obra, {})
      .pipe(catchError(this.handleError("getVentasCanceladasDevoluciones")));
  }





  private handleError<T>(operation = 'operation') {
    return (error: HttpErrorResponse) => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message} (${error.status}- ${error.statusText})`);

      return observableThrowError(error);
    };
  }

}


import { throwError as observableThrowError, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ConfigService } from 'app/services/config.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
//esta es la forma correcta
import "rxjs/add/observable/throw";

@Injectable()
export class LotesService {
  url: string;

  constructor(
    private http: HttpClient,
    private config: ConfigService
  ) {
    this.url = this.config.api_url + "lotes/";
  }


  //ok
  updateLote(id_lote, lote) {
    return this.http.post(this.url + 'update_lote/' + id_lote, { lote: lote })
      .pipe(catchError(this.handleError("updateLote")));
  }

  //ok
  updateLoteConPrototipos(id_lote, lote) {
    return this.http.post(this.url + 'update_lote_con_prototipos/' + id_lote, { lote: lote })
      .pipe(catchError(this.handleError("updateLoteConPrototipos")));
  }

  //ok
  bulkUpdate(ids, props) {
    return this.http.post(this.url + 'bulk_update', { ids: ids, props: props })
      .pipe(catchError(this.handleError("bulkUpdate")));
  }

  //ok
  bulkAddLotePrototipo(ids_lotes, id_prototipo) {
    return this.http.post(this.url + 'bulk_add_lote_prototipo', { ids: ids_lotes, id_prototipo: id_prototipo })
      .pipe(catchError(this.handleError("bulkAddLotePrototipo")));
  }

  //ok
  getDetallesLoteVentas(id_lote) {
    return this.http.get(this.url + 'ventas_detalle/' + id_lote)
      .pipe(catchError(this.handleError("getDetallesLoteVentas")));
  }

  //ok
  getAvances(id_lote) {
    return this.http.get(this.url + "get_avances/" + id_lote)
      .pipe(catchError(this.handleError("getAvances")));
  }

  //ok
  getEspecialidades(id_lote) {
    return this.http.get(this.url + "get_especialidades/" + id_lote)
      .pipe(catchError(this.handleError("getEspecialidades")));
  }

  //ok
  getFotosAvances(id_lote) {
    return this.http.get(this.url + "get_fotos/" + id_lote)
      .pipe(catchError(this.handleError("getFotosAvances")));
  }

  //ok
  addLoteByNombre(nombre, id_manzana) {
    return this.http.post(this.url + 'add_by_nombre', { nombre: nombre, id_manzana: id_manzana })
      .pipe(catchError(this.handleError("addLoteByNombre")));
  }

  //ok
  addLoteByNumero(prefijo, ini, fin, id_manzana) {
    return this.http.post(this.url + 'add_by_numero', { prefijo: prefijo, ini: ini, fin: fin, id_manzana: id_manzana })
      .pipe(catchError(this.handleError("addLoteByNumero")));
  }

  //ok
  delLote(id_lote) {
    return this.http.post(this.url + "del_lote/" + id_lote, {})
      .pipe(catchError(this.handleError("delLote")));
  }

  //ok
  getUploadFotoURL() {
    return this.url + "upload_foto";
  }

  //ok
  addAvancePartida(ids_partidas, id_lote) {
    return this.http.post(this.url + 'add_avance_partida', { ids_partidas: ids_partidas, id_lote: id_lote })
      .pipe(catchError(this.handleError("addAvancePartida")));
  }

  //ok
  addLiberacionPartida(ids_partidas, id_lote) {
    return this.http.post(this.url + 'add_liberacion_partida', { ids_partidas: ids_partidas, id_lote: id_lote })
      .pipe(catchError(this.handleError("addLiberacionPartida")));
  }

  //ok
  delAvancePartida(ids_partidas, id_lote) {
    return this.http.post(this.url + 'del_avance_partida', { ids_partidas: ids_partidas, id_lote: id_lote })
      .pipe(catchError(this.handleError("delAvancePartida")));
  }

  //ok
  delLiberacionPartida(ids_partidas, id_lote) {
    return this.http.post(this.url + 'del_liberacion_partida', { ids_partidas: ids_partidas, id_lote: id_lote })
      .pipe(catchError(this.handleError("delLiberacionPartida")));
  }

  //ok
  addEspecialidadLote(ids_familias, id_lote, id_trabajador) {
    return this.http.post(this.url + 'add_especialidad_lote', { ids_familias: ids_familias, id_lote: id_lote, id_trabajador: id_trabajador })
      .pipe(catchError(this.handleError("addEspecialidadLote")));
  }

  //ok
  delEspecialidadLote(id_familia, id_lote, id_trabajador) {
    return this.http.post(this.url + 'del_especialidad_lote', { id_familia: id_familia, id_lote: id_lote, id_trabajador: id_trabajador })
      .pipe(catchError(this.handleError("delEspecialidadLote")));
  }

  //ok
  copiarEspecialidadesLote(id_lote_origen, id_lote_destino) {
    return this.http.post(this.url + 'copy_especialidades', { origen: id_lote_origen, destino: id_lote_destino })
      .pipe(catchError(this.handleError("copiarEspecialidadesLote")));
  }

  //ok
  getPartidasLote(id_lote) {
    return this.http.get(this.url + 'get_partidas/' + id_lote)
      .pipe(catchError(this.handleError("getPartidasLote")));
  }

  //ok
  girarFoto(id_imagen, grados) {
    return this.http.post(this.url + 'girar_foto/' + id_imagen, { grados: grados })
      .pipe(catchError(this.handleError("girarFoto")));
  }

  //ok
  delFoto(id_imagen) {
    return this.http.post(this.url + 'del_foto/' + id_imagen, {})
      .pipe(catchError(this.handleError("delFoto")));
  }

  //ok
  getArranque(id_lote) {
    return this.http.get(this.url + "get_arranque/" + id_lote)
      .pipe(catchError(this.handleError("getArranque")));
  }

  //ok
  addArranquePartidas(id_lote, ids_partidas) {
    return this.http.post(this.url + 'add_arranque_partidas', { ids_partidas: ids_partidas, id_lote: id_lote })
      .pipe(catchError(this.handleError("addArranquePartidas")));
  }

  //ok
  delArranquePartidas(id_lote, ids_partidas) {
    return this.http.post(this.url + 'del_arranque_partidas', { ids_partidas: ids_partidas, id_lote: id_lote })
      .pipe(catchError(this.handleError("delArranquePartidas")));
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

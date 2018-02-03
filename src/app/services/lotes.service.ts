import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
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


  /*   girar_foto(id_foto, grados) {
      return this.http.post(this.url + 'girar_foto/' + id_foto, { grados: grados })
        .map(this.extractData)
        .catch(this.handleError);
    } */

  /*    getFotosLote(id_lote) {
          return this.http.post(this.url + 'fotos/' + id_lote);
      }*/

  /* delFotoLote(id_foto) {
       return this.http.post(this.url + 'del_foto/' + id_foto);
   }*/

  //ok
  updateLote(id_lote, lote) {
    return this.http.post(this.url + 'update_lote/' + id_lote, { lote: lote })
      .pipe(
      tap(response => console.log("response", response)),
      catchError(this.handleError("updateLote"))
      )
  }

  //ok
  bulkUpdate(ids, props) {
    return this.http.post(this.url + 'bulk_update', { ids: ids, props: props })
      .pipe(
      tap(response => console.log("response", response)),
      catchError(this.handleError("bulkUpdate"))
      )
  }

  //ok
  bulkAddLotePrototipo(ids_lotes, id_prototipo) {
    return this.http.post(this.url + 'bulk_add_lote_prototipo', { ids: ids_lotes, id_prototipo: id_prototipo })
      .pipe(
      tap(response => console.log("response", response)),
      catchError(this.handleError("bulkAddLotePrototipo"))
      )
  }

  /*   addLotePrototipo(id_lote, id_prototipo) {
      return this.http.post(this.url + 'add_lote_prototipo', { id_lote: id_lote, id_prototipo: id_prototipo })
        .map(this.extractData)
        .catch(this.handleError);
    } */

  //ok
  getDetallesLoteVentas(id_lote) {
    return this.http.get(this.url + 'ventas_detalle/' + id_lote)
      .pipe(
      tap(response => console.log("response", response)),
      catchError(this.handleError("getDetallesLoteVentas"))
      )
  }

  /*    getTrabajadoresLote(id_lote) {
          return  this.http.post(this.url + "especialidades/" + id_lote);
      }
*/

  //ok
  getAvances(id_lote) {
    return this.http.get(this.url + "get_avances/" + id_lote)
      .pipe(
      tap(response => console.log("response", response)),
      catchError(this.handleError("getAvances"))
      )
  }

  /*   getArranque(id_lote) {
      return this.http.get(this.url + "get_arranque/" + id_lote)
        .map(this.extractData)
        .catch(this.handleError);
    } */

  /*   addAvance(ids, id_lote) {
      return this.http.post(this.url + "add_avance", { ids_partidas: ids, id_lote: id_lote })
        .map(this.extractData)
        .catch(this.handleError);
    } */

  /*   addLiberacion(ids, id_lote) {
      return this.http.post(this.url + "add_liberacion_partida", { ids_partidas: ids, id_lote: id_lote })
        .map(this.extractData)
        .catch(this.handleError);
    } */

  /*   addEspecialidadLote(id_trabajador, id_lote, familias) {
      return this.http.post(this.url + "add_especialidad_lote", { id_trabajador: id_trabajador, id_lote: id_lote, familias: familias })
        .map(this.extractData)
        .catch(this.handleError);
    }
   */

  /*   delEspecialidadLote(id_trabajador, id_lote, id_familia) {
      return this.http.post(this.url + "del_especialidad_lote", { id_trabajador: id_trabajador, id_lote: id_lote, id_familia: id_familia })
        .map(this.extractData)
        .catch(this.handleError);
    } */

  /*   copyEspecialidadesLote(id_lote_origen, id_lote_destino) {
      return this.http.post(this.url + "copy_especialidades", { origen: id_lote_origen, destino: id_lote_destino })
        .map(this.extractData)
        .catch(this.handleError);
    } */

  //ok
  addLoteByNombre(nombre, id_manzana) {
    return this.http.post(this.url + 'add_by_nombre', { nombre: nombre, id_manzana: id_manzana })
      .pipe(
      tap(response => console.log("response", response)),
      catchError(this.handleError("addLoteByNombre"))
      )
  }

  //ok
  addLoteByNumero(prefijo, ini, fin, id_manzana) {
    return this.http.post(this.url + 'add_by_numero', { prefijo: prefijo, ini: ini, fin: fin, id_manzana: id_manzana })
      .pipe(
      tap(response => console.log("response", response)),
      catchError(this.handleError("addLoteByNumero"))
      )
  }

  /*   asignarPrototipo(ids, id_prototipo) {
      return this.http.post(this.url + 'set_prototipo', { ids: ids, id_prototipo: id_prototipo })
        .map(this.extractData)
        .catch(this.handleError);
    } */

  /*   delAvance(ids, id_lote) {
      return this.http.post(this.url + "del_avance", { ids_partidas: ids, id_lote: id_lote })
        .map(this.extractData)
        .catch(this.handleError);
    } */

  /*   delLiberacion(ids, id_lote) {
      return this.http.post(this.url + "del_liberacion_partida", { ids_partidas: ids, id_lote: id_lote })
        .map(this.extractData)
        .catch(this.handleError);
    } */

  //ok
  delLote(id_lote) {
    return this.http.post(this.url + "del_lote/" + id_lote, {})
      .pipe(
      tap(response => console.log("response", response)),
      catchError(this.handleError("delLote"))
      )
  }

  /*   delLotePrototipo(id_lote, id_prototipo) {
      return this.http.post(this.url + "del_prototipo", { id_lote: id_lote, id_prototipo: id_prototipo })
        .map(this.extractData)
        .catch(this.handleError);
    } */

  /*   addArranque(id_partidas, id_lote) {
      return this.http.post(this.url + 'add_arranque/' + id_lote, { partidas: id_partidas })
        .map(this.extractData)
        .catch(this.handleError);
    } */

  /*   delArranque(id_partidas, id_lote) {
      return this.http.post(this.url + 'del_arranque/' + id_lote, { partidas: id_partidas })
        .map(this.extractData)
        .catch(this.handleError);
    } */

  /*      getPartidas(id_lote) {
            return  this.http.post(this.url + 'partidas/' + id_lote);
        
        }*/



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

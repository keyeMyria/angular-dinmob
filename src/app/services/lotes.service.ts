import { Injectable } from '@angular/core';
import { Http, Response } from "@angular/http";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class LotesService {
  url: string = "http://localhost:8080/controldeobras_api/index.php/";

  constructor(private http: Http) { }


  girar_foto(id_foto, grados) {
    return this.http.post(this.url + 'lotes/girar_foto/' + id_foto, { grados: grados })
      .map(this.extractData)
      .catch(this.handleError);
  }

  /*    getFotosLote(id_lote) {
          return this.http.post(this.url + 'lotes/fotos/' + id_lote);
      }*/

  /* delFotoLote(id_foto) {
       return this.http.post(this.url + 'lotes/del_foto/' + id_foto);
   }*/

  updateLote(id_lote, props) {
    return this.http.post(this.url + 'lotes/update', { id_lote: id_lote, props: props })
      .map(this.extractData)
      .catch(this.handleError);
  }

  bulkUpdateLote(ids, props) {
    return this.http.post(this.url + 'lotes/bulk_update', { ids: ids, props: props })
      .map(this.extractData)
      .catch(this.handleError);
  }

  bulkAddLotePrototipo(ids_lotes, id_prototipo) {
    return this.http.post(this.url + 'lotes/bulk_add_lote_prototipo', { ids: ids_lotes, id_prototipo: id_prototipo })
      .map(this.extractData)
      .catch(this.handleError);
  }

  addLotePrototipo(id_lote, id_prototipo) {
    return this.http.post(this.url + 'lotes/add_lote_prototipo', { id_lote: id_lote, id_prototipo: id_prototipo })
      .map(this.extractData)
      .catch(this.handleError);
  }

  getDetallesLoteVentas(id_lote) {
    return this.http.get(this.url + 'lotes/ventas_detalle/' + id_lote)
      .map(this.extractData)
      .catch(this.handleError);
  }

  /*    getTrabajadoresLote(id_lote) {
          return  this.http.post(this.url + "lotes/especialidades/" + id_lote);
      }
*/
  getAvances(id_lote) {
    return this.http.get(this.url + "lotes/avances/" + id_lote)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getArranque(id_lote) {
    return this.http.get(this.url + "lotes/get_arranque/" + id_lote)
      .map(this.extractData)
      .catch(this.handleError);
  }

  addAvance(ids, id_lote) {
    return this.http.post(this.url + "lotes/add_avance", { ids_partidas: ids, id_lote: id_lote })
      .map(this.extractData)
      .catch(this.handleError);
  }

  addLiberacion(ids, id_lote) {
    return this.http.post(this.url + "lotes/add_liberacion_partida", { ids_partidas: ids, id_lote: id_lote })
      .map(this.extractData)
      .catch(this.handleError);
  }

  addEspecialidadLote(id_trabajador, id_lote, familias) {
    return this.http.post(this.url + "lotes/add_especialidad_lote", { id_trabajador: id_trabajador, id_lote: id_lote, familias: familias })
      .map(this.extractData)
      .catch(this.handleError);
  }

  delEspecialidadLote(id_trabajador, id_lote, id_familia) {
    return this.http.post(this.url + "lotes/del_especialidad_lote", { id_trabajador: id_trabajador, id_lote: id_lote, id_familia: id_familia })
      .map(this.extractData)
      .catch(this.handleError);
  }

  copyEspecialidadesLote(id_lote_origen, id_lote_destino) {
    return this.http.post(this.url + "lotes/copy_especialidades", { origen: id_lote_origen, destino: id_lote_destino })
      .map(this.extractData)
      .catch(this.handleError);
  }

  addLoteByNombre(nombre, id_manzana) {
    return this.http.post(this.url + 'lotes/add_by_nombre', { nombre_lote: nombre, id_manzana: id_manzana })
      .map(this.extractData)
      .catch(this.handleError);
  }

  addLoteByNumero(prefijo, ini, fin, id_manzana) {
    return this.http.post(this.url + 'lotes/add_by_numero', { prefijo: prefijo, lote_ini: ini, lote_fin: fin, id_manzana: id_manzana })
      .map(this.extractData)
      .catch(this.handleError);
  }

  asignarPrototipo(ids, id_prototipo) {
    return this.http.post(this.url + 'lotes/set_prototipo', { ids: ids, id_prototipo: id_prototipo })
      .map(this.extractData)
      .catch(this.handleError);
  }

  delAvance(ids, id_lote) {
    return this.http.post(this.url + "lotes/del_avance", { ids_partidas: ids, id_lote: id_lote })
      .map(this.extractData)
      .catch(this.handleError);
  }

  delLiberacion(ids, id_lote) {
    return this.http.post(this.url + "lotes/del_liberacion_partida", { ids_partidas: ids, id_lote: id_lote })
      .map(this.extractData)
      .catch(this.handleError);
  }

  delLote(id_lote) {
    return this.http.post(this.url + "lotes/del_lote", { id_lote: id_lote })
      .map(this.extractData)
      .catch(this.handleError);
  }

  delLotePrototipo(id_lote, id_prototipo) {
    return this.http.post(this.url + "lotes/del_prototipo", { id_lote: id_lote, id_prototipo: id_prototipo })
      .map(this.extractData)
      .catch(this.handleError);
  }

  addArranque(id_partidas, id_lote) {
    return this.http.post(this.url + 'lotes/add_arranque/' + id_lote, { partidas: id_partidas })
      .map(this.extractData)
      .catch(this.handleError);
  }

  delArranque(id_partidas, id_lote) {
    return this.http.post(this.url + 'lotes/del_arranque/' + id_lote, { partidas: id_partidas })
      .map(this.extractData)
      .catch(this.handleError);
  }

  /*      getPartidas(id_lote) {
            return  this.http.post(this.url + 'lotes/partidas/' + id_lote);
        
        }*/



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


import { throwError as observableThrowError, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ConfigService } from 'app/services/config.service';
import { catchError, tap } from 'rxjs/operators';
//esta es la forma correcta
import "rxjs/add/observable/throw";

@Injectable({
  providedIn: 'root'
})
export class TareaService {

  url: string;

  constructor(
    private http: HttpClient,
    private config: ConfigService
  ) {
    this.url = this.config.api_url + "tareas/";
  }

  //ok
  getTarea(id_tarea) {
    return this.http.get(this.url + "get_tarea/" + id_tarea)
      .pipe(catchError(this.handleError("getTarea")));
  }

  createTarea(tarea) {
    return this.http.post(this.url + "create_tarea", { tarea: tarea })
      .pipe(catchError(this.handleError("createTarea")));
  }

    //ok
    updateTarea(id, tarea) {
      return this.http.post(this.url + "update_tarea/" + id, { tarea: tarea })
        .pipe(catchError(this.handleError("updateTarea")));
    }
  
    //ok
    delTarea(id) {
      return this.http.post(this.url + "del_tarea/" + id, {})
        .pipe(catchError(this.handleError("delTarea")));
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


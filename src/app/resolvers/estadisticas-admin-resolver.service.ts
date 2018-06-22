
import {forkJoin as observableForkJoin,  Observable } from 'rxjs';

import {map} from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { ObrasService } from '../services/obras.service';


@Injectable()
export class EstadisticasAdminResolverService implements Resolve<any[]> {


  constructor(
    private obraSrv: ObrasService,
    private router: Router
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {

    let id = route.paramMap.get('obra');

    return observableForkJoin(
      this.obraSrv.getEstadisticas(id),
      this.obraSrv.getObrasUsuario()
    ).pipe(map(res => {
      //console.log("res", res);
      if (res[0]) {
        return { estadisticas: res[0], obras: res[1] };
      } else {
        return { estadisticas: {}, obras: [] };
      }
    }));

    /*   Observable.of([[], []]); */

    /*  return this.obraSrv.getEstadisticas(id).take(1).map((estadisticas: any[]) => { 
       if (estadisticas) {
         return estadisticas;
       } else {         
         return null;
       }
     }); */

  }

}








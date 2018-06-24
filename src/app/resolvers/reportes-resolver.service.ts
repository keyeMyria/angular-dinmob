
import {map, take} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';



import { ReporteService } from '../services/reporte.service';

@Injectable()
export class ReportesResolverService implements Resolve<any[]> {

  constructor(
    private reporteSrv: ReporteService,
    private router: Router
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any[]> {


    return this.reporteSrv.getTipos().pipe(take(1),map((tipos: any[]) => {
      
      if (tipos) {
        return tipos;
      } else { 
        //this.router.navigate(['/tablero']);
        return null;
      }
    }),);

  }


}
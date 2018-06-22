
import {map, take} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { InstitucionCreditoService } from 'app/services/institucion-credito.service';





@Injectable()
export class InstitucionesCreditoResolverService implements Resolve<any[]> {

  constructor(
    private institucionSrv: InstitucionCreditoService,
    private router: Router
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any[]> {


    return this.institucionSrv.getInstituciones().pipe(take(1),map((instituciones: any[]) => {

      if (instituciones) {
        return instituciones;
      } else { 
        //this.router.navigate(['/tablero']);
        return null;
      }
    }),);

  }


}
















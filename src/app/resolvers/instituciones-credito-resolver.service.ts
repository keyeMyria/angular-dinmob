import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { InstitucionCreditoService } from 'app/services/institucion-credito.service';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';


@Injectable()
export class InstitucionesCreditoResolverService implements Resolve<any[]> {

  constructor(
    private institucionSrv: InstitucionCreditoService,
    private router: Router
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any[]> {


    return this.institucionSrv.getInstituciones().take(1).map((instituciones: any[]) => {

      //console.log("resolver instituciones", instituciones);


      if (instituciones) {
        return instituciones;
      } else { // id not found
        this.router.navigate(['/tablero']);
        return null;
      }
    });

  }


}
















import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { TipoOperacionService } from 'app/services/tipo-operacion.service';

@Injectable()
export class TiposOperacionResolverService implements Resolve<any[]> {

  constructor(
    private tipoSrv: TipoOperacionService,
    private router: Router
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any[]> {


    return this.tipoSrv.getTipos().take(1).map((tipos: any[]) => {

      
      if (tipos) {
        return tipos;
      } else { 
        //this.router.navigate(['/tablero']);
        return null;
      }
    });

  }


}



 
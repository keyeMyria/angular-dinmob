import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { TipoPagoService } from 'app/services/tipo-pago.service';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

@Injectable()
export class TiposPagoResolverService implements Resolve<any[]> {

  constructor(
    private tipoSrv: TipoPagoService,
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


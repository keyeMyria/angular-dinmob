import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { GastoService } from '../services/gasto.service';

@Injectable()
export class TiposGastosResolverService implements Resolve<any[]> {

  constructor(
    private gastoSrv: GastoService,
    private router: Router
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any[]> {


    return this.gastoSrv.getTipos().take(1).map((tipos: any[]) => {

      //console.log("resolver tipos", tipos);


      if (tipos) {
        return tipos;
      } else { // id not found
        this.router.navigate(['/tablero']);
        return null;
      }
    });

  }


}







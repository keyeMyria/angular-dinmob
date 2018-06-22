
import {map, take} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';


import { GastoService } from '../services/gasto.service';

@Injectable()
export class TiposGastosResolverService implements Resolve<any[]> {

  constructor(
    private gastoSrv: GastoService,
    private router: Router
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any[]> {


    return this.gastoSrv.getTipos().pipe(take(1),map((tipos: any[]) => {
      
      if (tipos) {
        return tipos;
      } else { 
        //this.router.navigate(['/tablero']);
        return null;
      }
    }),);

  }


}







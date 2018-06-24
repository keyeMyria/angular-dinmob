
import {map, take} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';



import { PagoTrabajadorService } from '../services/pago-trabajador.service';

@Injectable()
export class TiposPagoTrabajadorResolverService implements Resolve<any[]> {

  constructor(
    private pagoTrabajadorSrv: PagoTrabajadorService,
    private router: Router
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any[]> {


    return this.pagoTrabajadorSrv.getTipos().pipe(take(1),map((tipos: any[]) => {

      //console.log("resolver tipos", tipos);


      if (tipos) {
        return tipos;
      } else { 
        //this.router.navigate(['/tablero']);
        return null;
      }
    }),);

  }


}




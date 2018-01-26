import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { LoteEstadoVentaService } from 'app/services/lote-estado-venta.service';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

@Injectable()
export class EstadosVentaLoteResolverService implements Resolve<any[]> {

  constructor(
    private estadoSrv: LoteEstadoVentaService,
    private router: Router
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any[]> {


    return this.estadoSrv.getEstados().take(1).map((estados: any[]) => {

      //console.log("resolver estados", estados);


      if (estados) {
        return estados;
      } else { // id not found
        this.router.navigate(['/tablero']);
        return null;
      }
    });

  }


}

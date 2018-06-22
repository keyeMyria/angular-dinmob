
import {map, take} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoteEstadoVentaService } from 'app/services/lote-estado-venta.service';




@Injectable()
export class EstadosVentaLoteResolverService implements Resolve<any[]> {

  constructor(
    private estadoSrv: LoteEstadoVentaService,
    private router: Router
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any[]> {


    return this.estadoSrv.getEstados().pipe(take(1),map((estados: any[]) => {
     
      if (estados) {
        return estados;
      } else { 
        //this.router.navigate(['/tablero']);
        return null;
      }
    }),);

  }


}

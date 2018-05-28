import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { PedidoService } from '../services/pedido.service';

@Injectable()
export class EstadosPedidoResolverService implements Resolve<any[]> {

  constructor(
    private pedidoSrv: PedidoService,
    private router: Router
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any[]> {


    return this.pedidoSrv.getEstados().take(1).map((estados: any[]) => {

      if (estados) {
        return estados;
      } else {
        //this.router.navigate(['/tablero']);
        return null;
      }
    });

  }


}



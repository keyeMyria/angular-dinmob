import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { SalidasService } from '../services/salidas.service';



@Injectable()
export class PartidasUrbanizacionResolverService implements Resolve<any[]> {


  constructor(
    private salidaSrv: SalidasService,
    private router: Router
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any[]> {


    return this.salidaSrv.getPartidasUrbanizacion().take(1).map((partidas: any[]) => {
      //console.log("resolver estados", estados);
      if (partidas) {
        return partidas;
      } else { // id not found
        this.router.navigate(['/tablero']);
        return null;
      }
    });

  }

}






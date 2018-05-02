import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ObrasService } from '../services/obras.service';


@Injectable()
export class ObraMaterialesTrabajadoresResidentesResolverService implements Resolve<any[]> {


  constructor(
    private obraSrv: ObrasService,
    private router: Router
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any[]> {


    return this.obraSrv.getMaterialesResidentesTrabajadores(route.params["obra"]).take(1).map((res: any[]) => {
      //console.log("resolver estados", estados);
      if (res) {
        return res;
      } else { // id not found
        this.router.navigate(['/tablero']);
        return null;
      }
    });

  }

}

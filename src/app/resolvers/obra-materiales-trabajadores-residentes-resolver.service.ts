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

    let id = route.paramMap.get('obra');

    return this.obraSrv.getMaterialesResidentesTrabajadores(id).take(1).map((res: any[]) => {
      
      if (res) {
        return res;
      } else {
        //this.router.navigate(['/tablero']);
        return null;
      }
    });

  }

}

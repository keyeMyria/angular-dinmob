
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ObrasService } from '../services/obras.service';


@Injectable()
export class EstadisticasAdminResolverService implements Resolve<any[]> {


  constructor(
    private obraSrv:ObrasService,
    private router: Router
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any[]> {


    return this.obraSrv.getEstadisticas(route.params["obra"]).take(1).map((estadisticas: any[]) => {     


      if (estadisticas) {
        return estadisticas;
      } else { // id not found
        this.router.navigate(['/tablero']);
        return null;
      }
    });

  }

}



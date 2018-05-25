import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router/src/interfaces';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ObrasService } from 'app/services/obras.service';


import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take'

@Injectable()
export class MapasUsuarioResolverService {
  

  constructor(
    private obraSrv:ObrasService,  
    private router:Router
  ) { }


  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):  Observable<any[]>  {   
   
    return this.obraSrv.getMapasUsuario().take(1).map(mapas => {
      if (mapas) {
        return mapas;
      } else { 
        //this.router.navigate(['/tablero']);
        return null;
      }
    });

  }

}

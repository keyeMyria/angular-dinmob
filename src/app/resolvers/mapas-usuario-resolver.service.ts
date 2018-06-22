
import {map, take} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router/src/interfaces';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ObrasService } from 'app/services/obras.service';





@Injectable()
export class MapasUsuarioResolverService {
  

  constructor(
    private obraSrv:ObrasService,  
    private router:Router
  ) { }


  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):  Observable<any>  {   
   
    return this.obraSrv.getMapasUsuario().pipe(take(1),map(mapas => {
      if (mapas) {
        return mapas;
      } else { 
        //this.router.navigate(['/tablero']);
        return null;
      }
    }),);

  }

}

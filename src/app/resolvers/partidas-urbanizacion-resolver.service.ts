
import {map, take} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SalidasService } from '../services/salidas.service';



@Injectable()
export class PartidasUrbanizacionResolverService implements Resolve<any[]> {


  constructor(
    private salidaSrv: SalidasService,
    private router: Router
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any[]> {


    return this.salidaSrv.getPartidasUrbanizacion().pipe(take(1),map((partidas: any[]) => {
      
      if (partidas) {
        return partidas;
      } else { 
        //this.router.navigate(['/tablero']);
        return null;
      }
    }),);

  }

}






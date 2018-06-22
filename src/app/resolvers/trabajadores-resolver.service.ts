
import {map, take} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router/src/interfaces';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TrabajadorService } from '../services/trabajador.service';

@Injectable()
export class TrabajadoresResolverService implements Resolve<any> {

  constructor(
    private router:Router,
    private trabajadorSrv: TrabajadorService
    ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):  Observable<any>  {
   
    let id = route.paramMap.get('obra');

    return this.trabajadorSrv.getTrabajadoresObra(id).pipe(take(1),map(trabajadores => {
      if (trabajadores) {
        return trabajadores;
      } else { 
        //this.router.navigate(['/tablero']);
        return null;
      }
    }),);

  }


}








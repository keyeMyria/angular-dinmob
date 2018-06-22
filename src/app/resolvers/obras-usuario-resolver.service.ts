
import {map, take} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router/src/interfaces';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ObrasService } from 'app/services/obras.service';
//import { Usuario } from 'app/model/usuario';
//import { AuthService } from 'app/services/auth.service';




@Injectable()
export class ObrasUsuarioResolverService implements Resolve<any[]> {

  constructor(
    private obraSrv: ObrasService,
    private router: Router
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {


    return this.obraSrv.getObrasUsuario().pipe(take(1),map(obras => {
      if (obras) {
        return obras;
      } else {
        //this.router.navigate(['/tablero']);
        return null;
      }
    }),);

  }



}

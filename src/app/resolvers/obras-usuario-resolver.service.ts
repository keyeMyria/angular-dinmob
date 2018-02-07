import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router/src/interfaces';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ObrasService } from 'app/services/obras.service';
//import { Usuario } from 'app/model/usuario';
//import { AuthService } from 'app/services/auth.service';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

@Injectable()
export class ObrasUsuarioResolverService implements Resolve<any[]> {
  //usuario: Usuario;
  constructor( 
    private obraSrv:ObrasService,
    //private auth: AuthService,
    private router:Router
  ) {
    //this.usuario = this.auth.getUsuario();
   }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):  Observable<any[]>  {
   
    // this.usuario.id_usuario
    return this.obraSrv.getObrasUsuario().take(1).map(obras => {
      if (obras) {
        return obras;
      } else { // id not found
        this.router.navigate(['/tablero']);
        return null;
      }
    });

  }

  

}

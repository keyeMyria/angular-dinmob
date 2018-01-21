import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router/src/interfaces';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UsuarioService } from 'app/services/usuario.service';

@Injectable()
export class UsuariosContolAlmacenResolverService implements Resolve<any[]> {

  constructor(
    private router:Router,
    private usuarioSrv:UsuarioService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):  Observable<any[]>  {
   
   
    return this.usuarioSrv.getUsuariosControlAlmacen().take(1).map(usuarios => {
      if (usuarios) {
        return usuarios;
      } else { 
        this.router.navigate(['/tablero']);
        return null;
      }
    });

  }


}

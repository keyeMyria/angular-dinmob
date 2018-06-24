
import {map, take} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router/src/interfaces';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from 'app/services/usuario.service';

@Injectable()
export class UsuarioLoggedResolverService implements Resolve<any> {

  constructor(
    private router: Router,
    private usuarioSrv: UsuarioService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {


    return this.usuarioSrv.getUsuarioLogged().pipe(take(1),map(usuario => {
      if (usuario) {
        return usuario;
      } else {
        //this.router.navigate(['/login']);
        return null;
      }
    }),);

  }

}

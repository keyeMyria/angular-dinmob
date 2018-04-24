import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router/src/interfaces';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { UsuarioService } from '../services/usuario.service';

@Injectable()
export class UsuariosResolverService implements Resolve<any[]> {

  constructor(
    private usuarioSrv: UsuarioService,
    private router: Router
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any[]> {

    // this.usuario.id_usuario
    return this.usuarioSrv.getUsuarios().take(1).map((usuarios: any) => {
      if (usuarios) {
        return usuarios;
      } else { // id not found
        this.router.navigate(['/tablero']);
        return null;
      }
    });

  }
}
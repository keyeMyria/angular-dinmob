
import {map, take} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router/src/interfaces';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';


import { UsuarioService } from '../services/usuario.service';

@Injectable()
export class UsuariosResolverService implements Resolve<any[]> {

  constructor(
    private usuarioSrv: UsuarioService,
    private router: Router
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    
    return this.usuarioSrv.getUsuarios().pipe(take(1),map((usuarios: any) => {
      if (usuarios) {
        return usuarios;
      } else { 
        //this.router.navigate(['/tablero']);
        return null;
      }
    }),);

  }
}
import { TrabajadorService } from '../services/trabajador.service';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class EspecialidadesTrabajadorResolverService implements Resolve<any[]> {


  constructor(
    private trabajadorSrv: TrabajadorService,
    private router: Router
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any[]> {


    return this.trabajadorSrv.getEspecialidades().take(1).map((especialidades: any[]) => {
      
      if (especialidades) {
        return especialidades;
      } else { 
        //this.router.navigate(['/tablero']);
        return null;
      }
    });

  }

}

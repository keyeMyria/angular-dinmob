
import { map, take } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { InsumoService } from '../services/insumo.service';

@Injectable({
  providedIn: 'root'
})
export class FamiliasInsumosResolverService {

  constructor(
    private router: Router,
    private insumoSrv: InsumoService
  ) { }


  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any[]> {


    return this.insumoSrv.getInsumosFamilias().pipe(take(1), map((familias: any[]) => {


      if (familias) {
        return familias;
      } else {
        //this.router.navigate(['/tablero']);
        return null;
      }
    }), );

  }
}

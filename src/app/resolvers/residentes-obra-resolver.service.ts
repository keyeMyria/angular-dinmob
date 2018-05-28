import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { VendedorService } from '../services/vendedor.service';

@Injectable()
export class ResidentesObraResolverService implements Resolve<any[]>{

  constructor(
    private vendedorSrv: VendedorService,
    private router: Router
  ) { }


  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any[]> {

    let id = route.paramMap.get('obra');

    return this.vendedorSrv.getVendedoresObra(id).take(1).map((vendedores: any[]) => {
     
      if (vendedores) {
        return vendedores;
      } else { 
        //this.router.navigate(['/tablero']);
        return null;
      }
    });

  }

}








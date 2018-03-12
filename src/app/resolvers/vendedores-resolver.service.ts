import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { VendedorService } from '../services/vendedor.service';

@Injectable()
export class VendedoresResolverService implements Resolve<any[]>{

  constructor(
    private vendedorSrv: VendedorService,
    private router: Router
  ) { }


  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any[]> {


    return this.vendedorSrv.getVendedoresObra(route.params.get('obra')).take(1).map((vendedores: any[]) => {

      //console.log("resolver vendedores", vendedores);


      if (vendedores) {
        return vendedores;
      } else { // id not found
        this.router.navigate(['/tablero']);
        return null;
      }
    });

  }

}

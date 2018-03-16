import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

import { ProveedorService } from '../services/proveedor.service';

@Injectable()
export class ProveedoresResolverService implements Resolve<any[]>{

  constructor(
    private proveedorSrv: ProveedorService,
    private router: Router
  ) { }


  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any[]> {


    return this.proveedorSrv.getNombresProveedores().take(1).map((proveedores: any[]) => {

      //console.log("resolver proveedores", proveedores);


      if (proveedores) {
        return proveedores;
      } else { 
        this.router.navigate(['/tablero']);
        return null;
      }
    });

  }

}


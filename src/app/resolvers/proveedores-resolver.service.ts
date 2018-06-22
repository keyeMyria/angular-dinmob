
import {map, take} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';




import { ProveedorService } from '../services/proveedor.service';

@Injectable()
export class ProveedoresResolverService implements Resolve<any[]>{

  constructor(
    private proveedorSrv: ProveedorService,
    private router: Router
  ) { }


  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any[]> {


    return this.proveedorSrv.getNombresProveedores().pipe(take(1),map((proveedores: any[]) => {
      
      if (proveedores) {
        return proveedores;
      } else { 
        //this.router.navigate(['/tablero']);
        return null;
      }
    }),);

  }

}


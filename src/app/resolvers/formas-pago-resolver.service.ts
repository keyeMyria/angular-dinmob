import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { FormaPagoService } from 'app/services/forma-pago.service';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';


@Injectable()
export class FormasPagoResolverService {

  constructor(
    private formaSrv: FormaPagoService,
    private router: Router
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any[]> {


    return this.formaSrv.getFormas().take(1).map((formas: any[]) => {

     
      if (formas) {
        return formas;
      } else { 
        //this.router.navigate(['/tablero']);
        return null;
      }
    });

  }

}

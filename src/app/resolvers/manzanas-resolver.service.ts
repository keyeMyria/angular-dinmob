import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ManzanasService } from '../services/manzanas.service';
import { take, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ManzanasResolverService implements Resolve<any>  {

  constructor(
    private manzanaSrv: ManzanasService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    let id = route.paramMap.get('obra');

    return this.manzanaSrv.getManzanasObra(id).pipe(take(1), map((manzanas: any) => {

      if (manzanas) {
        return manzanas;
      } else {
        return null;
      }
    }), );

  }

}

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from "app/services/auth.service";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authSrv: AuthService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    console.log("canActivateGuard");


    //console.log("next", next);
    //console.log("state", state);
    console.log("url", state.url);

    let url: string = state.url;
    // si length es > 0 entonces queremos acceder a una ruta hija
    // sino entonces queremos acceder a raiz /
    if (next.data.permisos) {

      console.log("permisos", next.data.permisos);
      if (this.checkLogin(url)) {
        if (this.authSrv.usuario) {
          console.log("sync");

          return this.authSrv.tienePermiso(next.data.permisos);
        } else {
          console.log("async");

          return this.authSrv.tienePermisoAsync(next.data.permisos);
        }
      } else {
        console.log("NO TIENE PERMISOS");

        return false;
      }
    } else {
      console.log("NO TIENE PERMISOS");
      return false;
    }






  }


  checkLogin(url: string): boolean {

    if (this.authSrv.IsLoggedIn()) {
      //console.log("is logged in, guard passed!!");
      return true;
    }

    //console.log("is not logged in, redirect to login");
    //store the url for redirecting
    this.authSrv.redirectUrl = url;

    this.router.navigate(["/login"]);
    return false;

  }




}

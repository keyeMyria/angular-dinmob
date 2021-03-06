import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { AuthService } from "app/services/auth.service";
import { Router, ActivatedRoute } from "@angular/router";
import { MediaMatcher } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material';
import { UsuarioService } from 'app/services/usuario.service';
import { Rol } from "../../constantes/roles";
import { RolRoute } from "../../constantes/default-routes";
import { Subscription } from 'rxjs';




@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  @ViewChild("navLeft") sidenav: MatSidenav;
  usuario: any;
  username: string;
  obra_default: any;
  mobileQuery: MediaQueryList;
  Rol = Rol;
  private _mobileQueryListener: () => void;

  /* usuarioChangedSubscription:Subscription; */

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private media: MediaMatcher,
    private authSrv: AuthService,
    private usuarioSrv: UsuarioService,
    private router: Router,
    private route: ActivatedRoute,

  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

    /*  this.route.data
       .subscribe((data: { usuario: any }) => { */

    this.usuario = this.authSrv.usuario; //data.usuario;
    this.username = this.usuario.nombre.split(" ")[0];

    if (this.usuario.id_obra_default) {
      this.obra_default = { obra: this.usuario.id_obra_default };
    } else {
      this.obra_default = {};
    }
    /*  }); */

    /*  this.usuarioChangedSubscription=auth.usuarioChanged$.subscribe(nombre => {
       this.username = nombre.split(" ")[0];
     }); */
  }

  ngOnInit() { }

  //las rutas deben ser las mismas que se especifican en el login component
  gotoTablero() {
    //la pagina principal cambia de acuerdo al rol de usuario
    switch (Number(this.usuario.id_tipo_usuario)) {
      case Rol.Administrador:
        this.router.navigate([RolRoute.Administrador]);
        break;

      case Rol.Almacenista:
        this.router.navigate([RolRoute.Almacenista]);
        break;

      case Rol.AsesorVentas:
        this.router.navigate([RolRoute.AsesorVentas]);
        break;

      case Rol.Contabilidad:
        this.router.navigate([RolRoute.Contabilidad]);
        break;

      case Rol.Control:
        this.router.navigate([RolRoute.Control]);
        break;

      case Rol.ControlAlmacen:
        this.router.navigate([RolRoute.ControlAlmacen]);
        break;

      case Rol.Creditos:
        this.router.navigate([RolRoute.Creditos]);
        break;

      case Rol.Recepcion:
        this.router.navigate([RolRoute.Recepcion]);
        break;

      case Rol.Residente:
        this.router.navigate([RolRoute.Residente]);
        break;

      case Rol.Ventas:
        this.router.navigate([RolRoute.Ventas]);
        break;

      case Rol.JefeFrente:
        this.router.navigate([RolRoute.JefeFrente]);
        break;

      default:
        this.router.navigate(['/login']);
        break;
    }
  }

  gotoRoute(event) {
    //console.log("gotoRoute");

    //event.preventDefault();
    //event.stopPropagation();
    this.sidenav.toggle();
    //return false;
  }

  logout() {
    this.authSrv.logout();
    this.router.navigate(['/login']);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);

    //this.usuarioChangedSubscription.unsubscribe();

  }

  addTareas() {
    this.router.navigate(['/tareas']);
  }


}

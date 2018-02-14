import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { AuthService } from "app/services/auth.service";
import { Router, ActivatedRoute } from "@angular/router";
import { Usuario } from "app/model/usuario";
import { MediaMatcher } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material';
import { UsuarioService } from 'app/services/usuario.service';




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
  private _mobileQueryListener: () => void;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private media: MediaMatcher,
    private auth: AuthService,
    private usuarioSrv: UsuarioService,
    private router: Router,
    private route: ActivatedRoute,
   
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

    this.route.data
      .subscribe((data: { usuario: any }) => {
        
        this.usuario = data.usuario;
        this.username = this.usuario.nombre.split(" ")[0];

        if (this.usuario.id_obra_default) {
          this.obra_default = { obra: this.usuario.id_obra_default };
        } else {
          this.obra_default = {};
        }
      });
  }

  ngOnInit() { }

  //las rutas deben ser las mismas que se especifican en el login component
  gotoTablero() {
    //la pagina principal cambia de acuerdo al rol de usuario
    switch (Number(this.usuario.id_tipo_usuario)) {
      case this.auth.Rol.Administrador:
        this.router.navigate(['/tablero']);
        break;

      case this.auth.Rol.Almacenista:
        this.router.navigate(['/tablero-almacen']);
        break;

      case this.auth.Rol.AsesorVentas:
        this.router.navigate(['/tablero-ventas']);
        break;

      case this.auth.Rol.Contabilidad:
        this.router.navigate(['/tablero']);
        break;

      case this.auth.Rol.Control:
        this.router.navigate(['/tablero']);
        break;

      case this.auth.Rol.ControlAlmacen:
        this.router.navigate(['/tablero']);
        break;

      case this.auth.Rol.Creditos:
        this.router.navigate(['/tablero']);
        break;

      case this.auth.Rol.Recepcion:
        this.router.navigate(['/tablero']);
        break;

      case this.auth.Rol.Residente:
        this.router.navigate(['/tablero-avances']);
        break;

      case this.auth.Rol.Ventas:
        this.router.navigate(['/tablero-ventas']);
        break;

      default:
        this.router.navigate(['/login']);
        break;
    }
  }

  gotoRoute(event) {
    console.log("gotoRoute");

    //event.preventDefault();
    //event.stopPropagation();
    this.sidenav.toggle();
    //return false;
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener)

  }


}

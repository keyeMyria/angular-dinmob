import { Component, OnInit } from '@angular/core';
import { UsuarioService } from "app/services/usuario.service";
import { Router } from "@angular/router";
import { JwtHelper } from "angular2-jwt/angular2-jwt";
import { AuthService } from "app/services/auth.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loading: boolean = false;
  usuario: any = { email: "", password: "" };
  alert: string;


  constructor(
    private auth: AuthService,
    private router: Router) { }


  login(usuario) {

    this.loading = true;

    this.auth.login(usuario)
      .subscribe((res: any) => {

        this.loading = false;

        //guardamos el token el el localStorage
        this.auth.setToken(res.token);
        //this.auth.setUsuario(JSON.stringify(res.usuario));

        // reset form properties
        this.usuario = { email: "", password: "" };
        this.alert = "";

        //la pagina principal cambia de acuerdo al rol de usuario
        switch (Number(res.usuario.id_tipo_usuario)) {
          case this.auth.Rol.Administrador:
            this.router.navigate(['/tablero']);
            break;

          case this.auth.Rol.Almacenista:
            this.router.navigate(['/tablero']);
            break;

          case this.auth.Rol.AsesorVentas:
            this.router.navigate(['/tablero']);
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
            this.router.navigate(['/tablero']);
            break;

          case this.auth.Rol.Ventas:
            this.router.navigate(['/tablero']);
            break;

          default:
            this.router.navigate(['/login']);
            break;


        }
      }, (error: any) => {
        this.loading = false;
        if (error.status == 401 /* Unauthorized */) {
          this.alert = error.error;
        } else {
          this.alert = "Error en la conexión";
          //this.alert = error;
        }

      }
      );
  }

}



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
export class LoginComponent implements OnInit {
  loading: boolean = false;
  usuario: any = { email: "", password: "" };
  alert: string;
  jwtHelper: JwtHelper = new JwtHelper();

  constructor(private auth: AuthService, private router: Router) { }


  ngOnInit() {
  }

  login2(usuario) {
    this.router.navigate(['/tablero']);
  }

  login(usuario) {

    this.loading = true;

    this.auth.login(usuario)
      .subscribe(res => {

        this.loading = false;

        if (res.error) {
          this.alert = res.error;
        } else {

          console.log("login", res);
          localStorage.setItem('token', res.token);
          localStorage.setItem('usuario', JSON.stringify(res.usuario));

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

        }
      });
  }

}



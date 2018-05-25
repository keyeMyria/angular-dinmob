import { Component, OnInit } from '@angular/core';
import { UsuarioService } from "app/services/usuario.service";
import { Router } from "@angular/router";
import { AuthService } from "app/services/auth.service";
import { Rol } from "../../constantes/roles";
import { RolRoute } from "../../constantes/default-routes";


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
        //console.log("hola login");
        
        this.loading = false;

        //guardamos el token el el localStorage
        this.auth.setToken(res.token);
        //this.auth.setUsuario(JSON.stringify(res.usuario));

        // reset form properties
        //this.usuario = { email: "", password: "" };
        //this.alert = "";

        //la pagina principal cambia de acuerdo al rol de usuario
        switch (Number(res.usuario.id_tipo_usuario)) {
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



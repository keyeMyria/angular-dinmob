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

  login(usuario) {
    
        this.loading = true;
        /* this.router.navigate(['/tablero']); */
        this.auth.login(usuario)
          .subscribe(res => {
            this.loading = false;
            if (res.error) {
              this.alert = res.error;
            } else {
              console.log("login", res);
              localStorage.setItem('token', res.token);
              localStorage.setItem('usuario', JSON.stringify(res.usuario));
              this.usuario = { email: "", password: "" };
              this.alert = "";
    
              if (Number(res.usuario.id_rol) === this.auth.Rol.Administrador) {
                this.router.navigate(['/tablero']);
              } else if (Number(res.usuario.id_rol) === this.auth.Rol.Ventas) {
                this.router.navigate(['/ordenes']);
              } else if (Number(res.usuario.id_rol) === this.auth.Rol.Almacen) {
                this.router.navigate(['/inventario']);
              } else {
                //rol no valido
              }
    
            }
          });
      }

}



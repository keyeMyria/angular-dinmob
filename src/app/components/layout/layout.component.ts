import { Component, OnInit } from '@angular/core';
import { AuthService } from "app/services/auth.service";
import { Router } from "@angular/router";
import { Usuario } from "app/model/usuario";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  usuario: Usuario;
  username: string;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
    this.usuario = /* new Usuario();  */ this.auth.getUsuario();
    /* this.usuario.nombre = "Nuevo usuario";
    this.usuario.id_rol = 1; */
    this.username = this.usuario.nombre.split(" ")[0];
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }


}

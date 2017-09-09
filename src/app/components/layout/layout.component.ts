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

  obra_default: any;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
    this.usuario = this.auth.getUsuario();
    this.username = this.usuario.nombre.split(" ")[0];


    if (this.usuario.id_obra_default) {
      this.obra_default = { obra: this.usuario.id_obra_default };
    } else {
      this.obra_default = {};
    }


  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }


}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'app/services/usuario.service';

@Component({
  selector: 'app-tablero-admin',
  templateUrl: './tablero-admin.component.html',
  styleUrls: ['./tablero-admin.component.scss']
})
export class TableroAdminComponent implements OnInit {

  usuario: any;
  obra_default: any;

  constructor(
    private router: Router,
    private usuarioSrv: UsuarioService
  ) { }

  ngOnInit() {
    this.usuarioSrv.getUsuarioLogged()
    .subscribe(usuario => {
      this.usuario = usuario;

      if (this.usuario.id_obra_default) {
        this.obra_default = { obra: this.usuario.id_obra_default };
      } else {
        this.obra_default = {};
      }

    }, (error) => {
      this.router.navigate(['/login']);
    });
  }

  
  gotoUsuarios() {
    this.router.navigate(["/usuarios"]);
  }
  gotoTrabajadores() {
    this.router.navigate(["/trabajadores"]);
  } 
  gotoObras() {
    this.router.navigate(["/obras"]);
  }
  gotoPrototipo() {
    this.router.navigate(["/prototipos"]);
  }
  gotoEstructura() {
    this.router.navigate(["/estructura-obra"]);
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { UsuarioService } from 'app/services/usuario.service';

@Component({
  selector: 'app-tablero',
  templateUrl: './tablero.component.html',
  styleUrls: ['./tablero.component.scss']
})
export class TableroComponent implements OnInit {

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

  gotoAdmin() {
    this.router.navigate(["/tablero-admin"]);
  }

  gotoAvances() {
    this.router.navigate(["/tablero-avances"]);
  }

  gotoVentas() {
    this.router.navigate(["/tablero-ventas"]);
  }

  gotoAlmacen() {
    this.router.navigate(["/tablero-almacen"]);
  }


}

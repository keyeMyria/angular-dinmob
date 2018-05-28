import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { UsuarioService } from 'app/services/usuario.service';
import { AuthService } from '../../services/auth.service';

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
    private usuarioSrv: UsuarioService,
    private route: ActivatedRoute,
    private authSrv: AuthService
  ) { }

  ngOnInit() {

    this.usuario = this.authSrv.usuario;

/*     this.route.data
      .subscribe((data: { usuario: any }) => {

        console.log("tablero data", data);
        this.usuario = data.usuario; */

        if (this.usuario.id_obra_default) {
          this.obra_default = { obra: this.usuario.id_obra_default };
        } else {
          this.obra_default = {};
        }
/* 
      }); */

  }

/*   gotoAdmin() {
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
  } */


}

import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/services/auth.service';

@Component({
  selector: 'app-tablero-graficas',
  templateUrl: './tablero-graficas.component.html',
  styleUrls: ['./tablero-graficas.component.scss']
})
export class TableroGraficasComponent implements OnInit {

  usuario: any;
  obra_default: any;

  constructor(
    private authSrv: AuthService
  ) {

    this.usuario = this.authSrv.usuario;

    if (this.usuario.id_obra_default) {
      this.obra_default = { obra: this.usuario.id_obra_default };
    } else {
      this.obra_default = {};
    }
  }

  ngOnInit() {
  }

}

import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/services/auth.service';

@Component({
  selector: 'app-tablero',
  templateUrl: './tablero.component.html',
  styleUrls: ['./tablero.component.scss']
})
export class TableroComponent implements OnInit {

  obra_default: any;
  usuario: any;

  constructor(
    private authSrv: AuthService
  ) { }

  ngOnInit() {
    this.usuario = this.authSrv.usuario;

    if (this.usuario.id_obra_default) {
      this.obra_default = { obra: this.usuario.id_obra_default };
    } else {
      this.obra_default = {};
    }
  }

}

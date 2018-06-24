import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-tablero-escrituracion',
  templateUrl: './tablero-escrituracion.component.html',
  styleUrls: ['./tablero-escrituracion.component.scss']
})
export class TableroEscrituracionComponent implements OnInit {

  obra_default: any;
  usuario: any;

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

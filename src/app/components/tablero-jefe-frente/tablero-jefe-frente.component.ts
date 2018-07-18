import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuarioService } from 'app/services/usuario.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-tablero-jefe-frente',
  templateUrl: './tablero-jefe-frente.component.html',
  styleUrls: ['./tablero-jefe-frente.component.scss']
})
export class TableroJefeFrenteComponent implements OnInit {
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

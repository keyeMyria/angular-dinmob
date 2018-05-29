import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'app/services/usuario.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-tablero-comisiones',
  templateUrl: './tablero-comisiones.component.html',
  styleUrls: ['./tablero-comisiones.component.scss']
})
export class TableroComisionesComponent implements OnInit {

  usuario: any;
  obra_default: any;

  constructor(
    private router: Router,
    private usuarioSrv: UsuarioService,
    private route: ActivatedRoute,
    private authSrv: AuthService
  ) {

    this.usuario = authSrv.usuario;

/*     this.route.data
      .subscribe((data: { usuario: any }) => {
        this.usuario = data.usuario; */

        if (this.usuario.id_obra_default) {
          this.obra_default = { obra: this.usuario.id_obra_default };
        } else {
          this.obra_default = {};
        }

    /*   }); */
  }

  ngOnInit() {
  }

}

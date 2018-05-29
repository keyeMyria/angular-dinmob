import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuarioService } from 'app/services/usuario.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-tablero-contabilidad',
  templateUrl: './tablero-contabilidad.component.html',
  styleUrls: ['./tablero-contabilidad.component.scss']
})
export class TableroContabilidadComponent implements OnInit {
  usuario: any;
  obra_default: any;

  constructor(
    private router: Router,
    private usuarioSrv: UsuarioService,
    private route: ActivatedRoute,
    private authSrv: AuthService
  ) {

    this.usuario = this.authSrv.usuario;

/*     this.route.data
      .subscribe((data: { usuario: any }) => {
        this.usuario = data.usuario; */

        if (this.usuario.id_obra_default) {
          this.obra_default = { obra: this.usuario.id_obra_default };
        } else {
          this.obra_default = {};
        }

      /* }); */
  }


  ngOnInit() {
  }

}

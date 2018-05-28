import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'app/services/usuario.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-tablero-ventas',
  templateUrl: './tablero-ventas.component.html',
  styleUrls: ['./tablero-ventas.component.scss']
})
export class TableroVentasComponent implements OnInit {

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

     /*  }); */
  }

  ngOnInit() {


  }



}

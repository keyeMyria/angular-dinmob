import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuarioService } from 'app/services/usuario.service';

@Component({
  selector: 'app-tablero-almacenista',
  templateUrl: './tablero-almacenista.component.html',
  styleUrls: ['./tablero-almacenista.component.scss']
})
export class TableroAlmacenistaComponent implements OnInit {
  usuario: any;
  obra_default: any;

  constructor(
    private router: Router,
    private usuarioSrv: UsuarioService,
    private route: ActivatedRoute
  ) {
    this.route.data
      .subscribe((data: { usuario: any }) => {
        this.usuario = data.usuario;

        if (this.usuario.id_obra_default) {
          this.obra_default = { obra: this.usuario.id_obra_default };
        } else {
          this.obra_default = {};
        }

      });
  }

  
  ngOnInit() {
  }

}
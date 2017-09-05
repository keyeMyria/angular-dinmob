import { Component, OnInit } from '@angular/core';
import { AuthService } from "app/services/auth.service";
import { Usuario } from "app/model/usuario";
import { ObrasService } from "app/services/obras.service";
import { Obra } from "app/model/obra";


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
  
  usuario: Usuario;

  obras: Obra[];


  constructor(
    private auth: AuthService,
    private obraSrv:ObrasService
  ) { }

  ngOnInit() {
    this.usuario = this.auth.getUsuario();

    this.obraSrv.getObrasUsuario(18)
    .subscribe(response => {
      this.obras = response;
    });
  }

}

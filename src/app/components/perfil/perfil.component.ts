import { Component, OnInit } from '@angular/core';
import { AuthService } from "app/services/auth.service";
import { Usuario } from "app/model/usuario";


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
  
  usuario: Usuario;
  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.usuario = this.auth.getUsuario();
  }

}

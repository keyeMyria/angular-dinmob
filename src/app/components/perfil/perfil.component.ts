import { Component, OnInit } from '@angular/core';
import { AuthService } from "app/services/auth.service";
import { Usuario } from "app/model/usuario";
import { Obra } from "app/model/obra";
import { UsuarioService } from 'app/services/usuario.service';
import { ObrasService } from 'app/services/obras.service';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  usuario: Usuario;
  copia: any = {};
  obras: Obra[];


  constructor(
    private auth: AuthService,
    private usuarioSrv: UsuarioService,
    private obraSrv: ObrasService
  ) {


  }

  ngOnInit() {
    this.usuario = this.auth.getUsuario();
    this.copiarUsuario();

    this.obraSrv.getObrasUsuario(this.usuario.id_usuario)
      .subscribe(response => {
        this.obras = response;
      });
  }

  private copiarUsuario() {
    this.copia.nombre = this.usuario.nombre;
    this.copia.email = this.usuario.email;
    this.copia.id_obra_default = this.usuario.id_obra_default;
  }





  updateUsuario() {
    console.log("update");
    this.usuarioSrv.updateUsuario(this.usuario.id_usuario, this.copia)
      .subscribe(usuario => {
        this.usuario = usuario;
        //actualizamos los datos
        this.copiarUsuario();
      },
      (error) => {
        //recuperamos los datos
        this.copiarUsuario();
      });
  }

  updatePassword() {
    console.log("Not implemented");
  }

  print() {
    console.log("usuario actual", this.usuario);
  }

}

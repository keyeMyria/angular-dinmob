import { Component, OnInit, ViewChild } from '@angular/core';
import { UsuarioService } from "app/services/usuario.service";
import { Usuario } from "app/model/usuario";
import { NgForm } from "@angular/forms";


@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.scss']
})
export class CrearUsuarioComponent implements OnInit {
  @ViewChild('formCreateUsuario') formCreateUsuario: NgForm;

  roles: any[];
  usuario: Usuario = new Usuario();

  constructor(private usuarioSrv: UsuarioService) { }

  ngOnInit() {
    this.usuarioSrv.getRoles()
      .subscribe((res:any) => this.roles = res);
  }

  createUsuario() {
    console.log("createUsuario");

    this.usuarioSrv.createUsuario(this.usuario)
      .subscribe(res => {
        console.log("response", res);

        this.usuario = new Usuario();
        this.formCreateUsuario.reset();
      });
  }


}

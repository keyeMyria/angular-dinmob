import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from "@angular/material";
import { UsuarioService } from "app/services/usuario.service";
import { NgForm } from "@angular/forms";
import { Usuario } from "app/model/usuario";

@Component({
  selector: 'app-crear-usuario-dialogo',
  templateUrl: './crear-usuario-dialogo.component.html',
  styleUrls: ['./crear-usuario-dialogo.component.scss']
})
export class CrearUsuarioDialogoComponent implements OnInit {
  @ViewChild('formCreateUsuario') formCreateUsuario: NgForm;

  roles: any[];
  usuario: Usuario;

  constructor(
    private usuarioSrv: UsuarioService,
    @Inject(MD_DIALOG_DATA) public data: any,
    public dialogRef: MdDialogRef<CrearUsuarioDialogoComponent>
  ) { }

  ngOnInit() {
    this.roles = this.data.roles;
    this.usuario = this.data.usuario;
  }

}

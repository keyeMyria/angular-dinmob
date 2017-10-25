import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { Usuario } from "app/model/usuario";

@Component({
  selector: 'app-editar-usuario-dialogo',
  templateUrl: './editar-usuario-dialogo.component.html',
  styleUrls: ['./editar-usuario-dialogo.component.scss']
})
export class EditarUsuarioDialogoComponent implements OnInit {

  usuario:Usuario;
  roles:any[];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<EditarUsuarioDialogoComponent>
  ) { }

  ngOnInit() {
    this.usuario= this.data.usuario;
    this.roles=this.data.roles;
 
  }
  

}

import { Component, OnInit, Inject } from '@angular/core';
import { MD_DIALOG_DATA, MdDialogRef } from "@angular/material";
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
    @Inject(MD_DIALOG_DATA) public data: any,
    public dialogRef: MdDialogRef<EditarUsuarioDialogoComponent>
  ) { }

  ngOnInit() {
 
  }
  

}

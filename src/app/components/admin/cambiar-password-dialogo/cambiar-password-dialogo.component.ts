import { Component, OnInit, Inject } from '@angular/core';
import { MD_DIALOG_DATA, MdDialogRef } from "@angular/material";

@Component({
  selector: 'app-cambiar-password-dialogo',
  templateUrl: './cambiar-password-dialogo.component.html',
  styleUrls: ['./cambiar-password-dialogo.component.scss']
})
export class CambiarPasswordDialogoComponent implements OnInit {

  usuario:any;
  password:string;


  constructor(
    @Inject(MD_DIALOG_DATA) public data: any,
    public dialogRef: MdDialogRef<CambiarPasswordDialogoComponent>
  ) { }

  ngOnInit() {
    this.usuario=this.data.usuario;
    this.password=this.data.password;
  }

}

import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";

@Component({
  selector: 'app-cambiar-password-dialogo',
  templateUrl: './cambiar-password-dialogo.component.html',
  styleUrls: ['./cambiar-password-dialogo.component.scss']
})
export class CambiarPasswordDialogoComponent implements OnInit {

  usuario:any;
  password:string;


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<CambiarPasswordDialogoComponent>
  ) { }

  ngOnInit() {
    this.usuario=this.data.usuario;
    this.password=this.data.password;
  }

}

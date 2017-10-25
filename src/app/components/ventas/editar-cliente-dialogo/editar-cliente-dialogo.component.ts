import { Component, OnInit, Inject } from '@angular/core';
import { Cliente } from "app/model/cliente";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

@Component({
  selector: 'app-editar-cliente-dialogo',
  templateUrl: './editar-cliente-dialogo.component.html',
  styleUrls: ['./editar-cliente-dialogo.component.scss']
})
export class EditarClienteDialogoComponent implements OnInit {

  cliente:Cliente;
  
    constructor(
      /* @Inject(MAT_DIALOG_DATA) public data: any,
      public dialogRef: MatDialogRef<EditarClienteDialogoComponent> */
    ) { }
  
    ngOnInit() {
      /* this.cliente= this.data.cliente; */
    }
  
  }
  
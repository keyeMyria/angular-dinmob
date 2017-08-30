import { Component, OnInit, Inject } from '@angular/core';
import { Cliente } from "app/model/cliente";
import { MdDialogRef, MD_DIALOG_DATA } from "@angular/material";

@Component({
  selector: 'app-editar-cliente-dialogo',
  templateUrl: './editar-cliente-dialogo.component.html',
  styleUrls: ['./editar-cliente-dialogo.component.scss']
})
export class EditarClienteDialogoComponent implements OnInit {

  cliente:Cliente;
  
    constructor(
      /* @Inject(MD_DIALOG_DATA) public data: any,
      public dialogRef: MdDialogRef<EditarClienteDialogoComponent> */
    ) { }
  
    ngOnInit() {
      /* this.cliente= this.data.cliente; */
    }
  
  }
  
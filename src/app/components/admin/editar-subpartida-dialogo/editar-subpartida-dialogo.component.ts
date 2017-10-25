import { Component, OnInit, Inject } from '@angular/core';
import { Partida } from 'app/model/partida';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";

@Component({
  selector: 'app-editar-subpartida-dialogo',
  templateUrl: './editar-subpartida-dialogo.component.html',
  styleUrls: ['./editar-subpartida-dialogo.component.scss']
})
export class EditarSubpartidaDialogoComponent implements OnInit {
partida:Partida;

  constructor( @Inject(MAT_DIALOG_DATA) public data: any,
  public dialogRef: MatDialogRef<EditarSubpartidaDialogoComponent>) { }

  ngOnInit() {
    this.partida=this.data.subpartida;
  }

}

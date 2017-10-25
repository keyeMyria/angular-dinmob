import { Component, OnInit, Inject } from '@angular/core';
import { Partida } from 'app/model/partida';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";

@Component({
  selector: 'app-editar-partida-dialogo',
  templateUrl: './editar-partida-dialogo.component.html',
  styleUrls: ['./editar-partida-dialogo.component.scss']
})
export class EditarPartidaDialogoComponent implements OnInit {
  partida:Partida;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<EditarPartidaDialogoComponent>
  ) { }

  ngOnInit() {
    this.partida=this.data.partida;
  }

}

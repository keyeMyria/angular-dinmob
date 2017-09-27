import { Component, OnInit, Inject } from '@angular/core';
import { Partida } from 'app/model/partida';
import { MD_DIALOG_DATA, MdDialogRef } from "@angular/material";

@Component({
  selector: 'app-editar-partida-dialogo',
  templateUrl: './editar-partida-dialogo.component.html',
  styleUrls: ['./editar-partida-dialogo.component.scss']
})
export class EditarPartidaDialogoComponent implements OnInit {
  partida:Partida;

  constructor(
    @Inject(MD_DIALOG_DATA) public data: any,
    public dialogRef: MdDialogRef<EditarPartidaDialogoComponent>
  ) { }

  ngOnInit() {
    this.partida=this.data.partida;
  }

}

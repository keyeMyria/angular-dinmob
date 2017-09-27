import { Component, OnInit, Inject } from '@angular/core';
import { Partida } from 'app/model/partida';
import { MD_DIALOG_DATA, MdDialogRef } from "@angular/material";

@Component({
  selector: 'app-editar-subpartida-dialogo',
  templateUrl: './editar-subpartida-dialogo.component.html',
  styleUrls: ['./editar-subpartida-dialogo.component.scss']
})
export class EditarSubpartidaDialogoComponent implements OnInit {
partida:Partida;

  constructor( @Inject(MD_DIALOG_DATA) public data: any,
  public dialogRef: MdDialogRef<EditarSubpartidaDialogoComponent>) { }

  ngOnInit() {
    this.partida=this.data.subpartida;
  }

}

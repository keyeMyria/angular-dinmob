import { Component, OnInit, Inject } from '@angular/core';
import { Prototipo } from 'app/model/prototipo';
import { MD_DIALOG_DATA, MdDialogRef } from "@angular/material";

@Component({
  selector: 'app-agregar-partida-dialogo',
  templateUrl: './agregar-partida-dialogo.component.html',
  styleUrls: ['./agregar-partida-dialogo.component.scss']
})
export class AgregarPartidaDialogoComponent implements OnInit {
  prototipo:Prototipo;

  constructor(
    @Inject(MD_DIALOG_DATA) public data: any,
    public dialogRef: MdDialogRef<AgregarPartidaDialogoComponent>
  ) { }

  ngOnInit() {
    this.prototipo=this.data.prototipo;
  }

}

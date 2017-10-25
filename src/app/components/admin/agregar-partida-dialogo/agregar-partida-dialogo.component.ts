import { Component, OnInit, Inject } from '@angular/core';
import { Prototipo } from 'app/model/prototipo';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";

@Component({
  selector: 'app-agregar-partida-dialogo',
  templateUrl: './agregar-partida-dialogo.component.html',
  styleUrls: ['./agregar-partida-dialogo.component.scss']
})
export class AgregarPartidaDialogoComponent implements OnInit {
  prototipo:Prototipo;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AgregarPartidaDialogoComponent>
  ) { }

  ngOnInit() {
    this.prototipo=this.data.prototipo;
  }

}

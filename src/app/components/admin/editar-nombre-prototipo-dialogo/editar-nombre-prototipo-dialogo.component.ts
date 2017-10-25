import { Component, OnInit, Inject } from '@angular/core';
import { Prototipo } from 'app/model/prototipo';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";

@Component({
  selector: 'app-editar-nombre-prototipo-dialogo',
  templateUrl: './editar-nombre-prototipo-dialogo.component.html',
  styleUrls: ['./editar-nombre-prototipo-dialogo.component.scss']
})
export class EditarNombrePrototipoDialogoComponent implements OnInit {

  prototipo:Prototipo;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<EditarNombrePrototipoDialogoComponent>
  ) { }

  ngOnInit() {
    this.prototipo=this.data.prototipo;
  }

}

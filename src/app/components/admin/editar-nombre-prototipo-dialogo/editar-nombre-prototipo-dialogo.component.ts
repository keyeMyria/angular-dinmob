import { Component, OnInit, Inject } from '@angular/core';
import { Prototipo } from 'app/model/prototipo';
import { MD_DIALOG_DATA, MdDialogRef } from "@angular/material";

@Component({
  selector: 'app-editar-nombre-prototipo-dialogo',
  templateUrl: './editar-nombre-prototipo-dialogo.component.html',
  styleUrls: ['./editar-nombre-prototipo-dialogo.component.scss']
})
export class EditarNombrePrototipoDialogoComponent implements OnInit {

  prototipo:Prototipo;

  constructor(
    @Inject(MD_DIALOG_DATA) public data: any,
    public dialogRef: MdDialogRef<EditarNombrePrototipoDialogoComponent>
  ) { }

  ngOnInit() {
    this.prototipo=this.data.prototipo;
  }

}

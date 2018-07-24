import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '../../../../../node_modules/@angular/material';

@Component({
  selector: 'app-agregar-foto-lote-posventa-dialogo',
  templateUrl: './agregar-foto-lote-posventa-dialogo.component.html',
  styleUrls: ['./agregar-foto-lote-posventa-dialogo.component.scss']
})
export class AgregarFotoLotePosventaDialogoComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AgregarFotoLotePosventaDialogoComponent>,

  ) { }

  ngOnInit() {
  }

}

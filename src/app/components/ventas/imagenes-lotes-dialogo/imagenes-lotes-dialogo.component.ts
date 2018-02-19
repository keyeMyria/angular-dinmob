import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-imagenes-lotes-dialogo',
  templateUrl: './imagenes-lotes-dialogo.component.html',
  styleUrls: ['./imagenes-lotes-dialogo.component.scss']
})
export class ImagenesLotesDialogoComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ImagenesLotesDialogoComponent>
  ) { }

  ngOnInit() {
  }

}

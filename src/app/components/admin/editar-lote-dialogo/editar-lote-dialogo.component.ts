import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-editar-lote-dialogo',
  templateUrl: './editar-lote-dialogo.component.html',
  styleUrls: ['./editar-lote-dialogo.component.scss']
})
export class EditarLoteDialogoComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<EditarLoteDialogoComponent>
  ) { }

  ngOnInit() {
  }

}

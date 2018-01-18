import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-agregar-lote-dialogo',
  templateUrl: './agregar-lote-dialogo.component.html',
  styleUrls: ['./agregar-lote-dialogo.component.scss']
})
export class AgregarLoteDialogoComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AgregarLoteDialogoComponent>
  ) { }

  ngOnInit() {
  }

}

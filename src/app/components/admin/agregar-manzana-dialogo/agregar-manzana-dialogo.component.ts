import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-agregar-manzana-dialogo',
  templateUrl: './agregar-manzana-dialogo.component.html',
  styleUrls: ['./agregar-manzana-dialogo.component.scss']
})
export class AgregarManzanaDialogoComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AgregarManzanaDialogoComponent>
  ) { }

  ngOnInit() {
  }

}

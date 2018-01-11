import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-editar-manzana-dialogo',
  templateUrl: './editar-manzana-dialogo.component.html',
  styleUrls: ['./editar-manzana-dialogo.component.scss']
})
export class EditarManzanaDialogoComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<EditarManzanaDialogoComponent>
  ) { }

  ngOnInit() {
  }

}

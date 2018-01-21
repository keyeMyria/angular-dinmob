import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-editar-obra-dialogo',
  templateUrl: './editar-obra-dialogo.component.html',
  styleUrls: ['./editar-obra-dialogo.component.scss']
})
export class EditarObraDialogoComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<EditarObraDialogoComponent>
  ) { }

  ngOnInit() {
  }

}

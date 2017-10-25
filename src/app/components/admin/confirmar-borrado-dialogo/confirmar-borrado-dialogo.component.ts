import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";

@Component({
  selector: 'app-confirmar-borrado-dialogo',
  templateUrl: './confirmar-borrado-dialogo.component.html',
  styleUrls: ['./confirmar-borrado-dialogo.component.scss']
})
export class ConfirmarBorradoDialogoComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ConfirmarBorradoDialogoComponent>
  ) { }

  ngOnInit() {
  }

}

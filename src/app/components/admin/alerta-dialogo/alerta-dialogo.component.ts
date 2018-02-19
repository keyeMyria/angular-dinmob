import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-alerta-dialogo',
  templateUrl: './alerta-dialogo.component.html',
  styleUrls: ['./alerta-dialogo.component.scss']
})
export class AlertaDialogoComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AlertaDialogoComponent>,
   
  ) { }

  ngOnInit() {
  }

}

import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-insumos-avance-dialogo',
  templateUrl: './insumos-avance-dialogo.component.html',
  styleUrls: ['./insumos-avance-dialogo.component.scss']
})
export class InsumosAvanceDialogoComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<InsumosAvanceDialogoComponent>
  ) { }

  ngOnInit() {
  }

}

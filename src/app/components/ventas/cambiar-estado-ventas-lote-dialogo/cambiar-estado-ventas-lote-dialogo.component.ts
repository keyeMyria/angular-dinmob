import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-cambiar-estado-ventas-lote-dialogo',
  templateUrl: './cambiar-estado-ventas-lote-dialogo.component.html',
  styleUrls: ['./cambiar-estado-ventas-lote-dialogo.component.scss']
})
export class CambiarEstadoVentasLoteDialogoComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<CambiarEstadoVentasLoteDialogoComponent>,
  ) { }

  ngOnInit() {
  }

}

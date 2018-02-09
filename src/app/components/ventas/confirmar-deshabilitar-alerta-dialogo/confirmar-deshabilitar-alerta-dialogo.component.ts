import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-confirmar-deshabilitar-alerta-dialogo',
  templateUrl: './confirmar-deshabilitar-alerta-dialogo.component.html',
  styleUrls: ['./confirmar-deshabilitar-alerta-dialogo.component.scss']
})
export class ConfirmarDeshabilitarAlertaDialogoComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ConfirmarDeshabilitarAlertaDialogoComponent>
  ) { }

  ngOnInit() {
  }

}

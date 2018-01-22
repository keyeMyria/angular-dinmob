import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Cliente } from 'app/model/cliente';

@Component({
  selector: 'app-ver-celula-fiscal-dialogo',
  templateUrl: './ver-celula-fiscal-dialogo.component.html',
  styleUrls: ['./ver-celula-fiscal-dialogo.component.scss']
})
export class VerCelulaFiscalDialogoComponent implements OnInit {

  cliente: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<VerCelulaFiscalDialogoComponent>
  ) { }

  ngOnInit() {
    this.cliente = this.data.cliente;
  }

}

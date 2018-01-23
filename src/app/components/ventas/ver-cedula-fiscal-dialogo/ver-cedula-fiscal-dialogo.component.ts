import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Cliente } from 'app/model/cliente';

@Component({
  selector: 'app-ver-cedula-fiscal-dialogo',
  templateUrl: './ver-cedula-fiscal-dialogo.component.html',
  styleUrls: ['./ver-cedula-fiscal-dialogo.component.scss']
})
export class VerCedulaFiscalDialogoComponent implements OnInit {

  cliente: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<VerCedulaFiscalDialogoComponent>
  ) { }

  ngOnInit() {
    this.cliente = this.data.cliente;
  }

}
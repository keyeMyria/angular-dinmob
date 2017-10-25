import { Component, OnInit, Inject } from '@angular/core';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import { Insumo } from 'app/model/insumo';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";


@Component({
  selector: 'app-editar-insumo-dialogo',
  templateUrl: './editar-insumo-dialogo.component.html',
  styleUrls: ['./editar-insumo-dialogo.component.scss']
})
export class EditarInsumoDialogoComponent implements OnInit {
  insumo: Insumo;

  currencyMask = createNumberMask({
    allowDecimal: true
  });
  numberMask = createNumberMask({
    allowDecimal: true,
    prefix: '',
    decimalLimit: 6,
  });



  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<EditarInsumoDialogoComponent>) { }

  ngOnInit() {
    this.insumo = this.data.insumo;
  }

}

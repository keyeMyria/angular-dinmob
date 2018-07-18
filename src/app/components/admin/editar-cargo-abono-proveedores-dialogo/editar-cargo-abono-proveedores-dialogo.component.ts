import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormGroup, FormControl, FormArray, Validators, FormBuilder } from '@angular/forms';
import * as moment from 'moment';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';

@Component({
  selector: 'app-editar-cargo-abono-proveedores-dialogo',
  templateUrl: './editar-cargo-abono-proveedores-dialogo.component.html',
  styleUrls: ['./editar-cargo-abono-proveedores-dialogo.component.scss']
})
export class EditarCargoAbonoProveedoresDialogoComponent implements OnInit {
  numberMask = createNumberMask({
    allowDecimal: true,
    prefix: '',
    decimalLimit: 2
  });
  form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<EditarCargoAbonoProveedoresDialogoComponent>,
    private fb: FormBuilder,
  ) {
    this.form = this.fb.group({
      fecha: [moment(data.proveedor.fecha), Validators.required],
      monto: ["", Validators.required],
      nota: [data.proveedor.nota],
      es_ministracion: [""]

    });
  }

  ngOnInit() {
  }

  guardar() {

  }

}

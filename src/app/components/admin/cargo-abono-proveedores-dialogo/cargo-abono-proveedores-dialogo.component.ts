import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormGroup, FormControl, FormArray, Validators, FormBuilder } from '@angular/forms';
import * as moment from 'moment';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';

@Component({
  selector: 'app-cargo-abono-proveedores-dialogo',
  templateUrl: './cargo-abono-proveedores-dialogo.component.html',
  styleUrls: ['./cargo-abono-proveedores-dialogo.component.scss']
})
export class CargoAbonoProveedoresDialogoComponent implements OnInit {
  numberMask = createNumberMask({
    allowDecimal: true,
    prefix: '',
    decimalLimit: 2
  });
  form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<CargoAbonoProveedoresDialogoComponent>,
    private fb: FormBuilder,
  ) {
    this.form = this.fb.group({


      fecha: [moment(), Validators.required],
      monto: ["", Validators.required],
      id_obra: [this.data.id_obra, Validators.required],
      nota: [""],
      es_cargo: ["1", Validators.required]


    });
  }

  ngOnInit() {
  }

  guardar() {

  }

}

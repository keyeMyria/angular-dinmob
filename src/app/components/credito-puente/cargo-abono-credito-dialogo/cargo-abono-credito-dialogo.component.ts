import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormGroup, FormControl, FormArray, Validators, FormBuilder } from '@angular/forms';
import * as moment from 'moment';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';

@Component({
  selector: 'app-cargo-abono-credito-dialogo',
  templateUrl: './cargo-abono-credito-dialogo.component.html',
  styleUrls: ['./cargo-abono-credito-dialogo.component.scss']
})
export class CargoAbonoCreditoDialogoComponent implements OnInit {
  numberMask = createNumberMask({
    allowDecimal: true,
    prefix: '',
    decimalLimit: 2
  });
  form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<CargoAbonoCreditoDialogoComponent>,
    private fb: FormBuilder,
  ) {
    this.form = this.fb.group({


      fecha: [moment(""), Validators.required],
      monto: ["", Validators.required],
      nota: [""],


    });
  }

  ngOnInit() {
  }

  guardar() {
  }

}

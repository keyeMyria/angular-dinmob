import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormGroup, FormControl, FormArray, Validators, FormBuilder } from '@angular/forms';
import * as moment from 'moment';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';

@Component({
  selector: 'app-nuevo-gasto-dialogo',
  templateUrl: './nuevo-gasto-dialogo.component.html',
  styleUrls: ['./nuevo-gasto-dialogo.component.scss']
})
export class NuevoGastoDialogoComponent implements OnInit {
  numberMask = createNumberMask({
    allowDecimal: true,
    prefix: '',
    decimalLimit: 2
  });
  form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<NuevoGastoDialogoComponent>,
    private fb: FormBuilder,
  ) {
    this.form = this.fb.group({

      tipo_gasto: ["", Validators.required],
      fecha_gasto: [moment(), Validators.required],
      monto: ["", Validators.required],
      nota: [""],

    });
  }

  ngOnInit() {
  }


  guardar() {

  }

}

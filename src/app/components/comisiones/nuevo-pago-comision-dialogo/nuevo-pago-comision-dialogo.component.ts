import { Component, OnInit, Inject } from '@angular/core';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import { FormGroup, FormControl, FormArray, Validators, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import * as moment from 'moment';

@Component({
  selector: 'app-nuevo-pago-comision-dialogo',
  templateUrl: './nuevo-pago-comision-dialogo.component.html',
  styleUrls: ['./nuevo-pago-comision-dialogo.component.scss']
})
export class NuevoPagoComisionDialogoComponent implements OnInit {
  numberMask = createNumberMask({
    allowDecimal: true,
    prefix: '',
    decimalLimit: 2
  });
  form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<NuevoPagoComisionDialogoComponent>,
    private fb: FormBuilder,
  ) {
    this.form = this.fb.group({
      monto: ["", Validators.required],
      fecha: [moment("", "YYYY-MM-DD"), Validators.required],
      destinatario: ["", Validators.required],
    });
  }

  ngOnInit() {
  }

  guardar() {
    console.log("datos", this.form.value);
  }

}

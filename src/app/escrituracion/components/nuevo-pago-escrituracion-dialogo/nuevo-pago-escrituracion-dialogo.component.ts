import { Component, OnInit, Inject } from '@angular/core';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import { FormGroup, FormControl, FormArray, Validators, FormBuilder } from '@angular/forms';
import * as moment from 'moment';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-nuevo-pago-escrituracion-dialogo',
  templateUrl: './nuevo-pago-escrituracion-dialogo.component.html',
  styleUrls: ['./nuevo-pago-escrituracion-dialogo.component.scss']
})
export class NuevoPagoEscrituracionDialogoComponent implements OnInit {
  numberMask = createNumberMask({
    allowDecimal: true,
    prefix: '',
    decimalLimit: 2
  });
  form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<NuevoPagoEscrituracionDialogoComponent>,
    private fb: FormBuilder,
  ) { 
    this.form = this.fb.group({

      monto: ["", Validators.required],
      fecha_programada: [moment(), Validators.required],
      fecha_pago: [moment()],
      id_tipo_pago: ["", Validators.required],
      id_forma_pago: ["", Validators.required],
      nota: [""],

    });
  }

  ngOnInit() {
  }

}

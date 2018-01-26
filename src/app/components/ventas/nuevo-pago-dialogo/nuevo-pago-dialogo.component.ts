import { Component, OnInit, Inject } from '@angular/core';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import { FormGroup, FormControl, FormArray, Validators, FormBuilder } from '@angular/forms';
import * as moment from 'moment';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-nuevo-pago-dialogo',
  templateUrl: './nuevo-pago-dialogo.component.html',
  styleUrls: ['./nuevo-pago-dialogo.component.scss']
})
export class NuevoPagoDialogoComponent implements OnInit {
  numberMask = createNumberMask({
    allowDecimal: true
  });
  form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<NuevoPagoDialogoComponent>,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({

      monto: ["", Validators.required],     
      fecha_entrega: [moment(), Validators.required],
      tipo: ["", Validators.required],
      forma: ["", Validators.required],
      nota: [""],

    });
   }

  ngOnInit() {
  }

  guardar() {
    console.log("nuevo pago", this.form.value);    
  }


}

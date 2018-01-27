import { Component, OnInit, Inject } from '@angular/core';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, FormArray, Validators, FormBuilder } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-editar-pago-dialogo',
  templateUrl: './editar-pago-dialogo.component.html',
  styleUrls: ['./editar-pago-dialogo.component.scss']
})
export class EditarPagoDialogoComponent implements OnInit {
  form: FormGroup;


  numberMask = createNumberMask({
    allowDecimal: true
  });


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<EditarPagoDialogoComponent>,
    private fb: FormBuilder,
  ) {


    this.form = this.fb.group({

      monto: [data.pago.monto, Validators.required],
      fecha_programada: [moment(data.pago.fecha_programada, "YYYY-MM-DD"), Validators.required],
      fecha_pago: moment(data.pago.fecha_pago, "YYYY-MM-DD"),
      tipo: [data.pago.id_tipo_pago, Validators.required],
      forma: [data.pago.id_forma_pago, Validators.required],
      nota: [data.pago.nota],


    });
  }

  ngOnInit() {

  }

  guardar() {
    console.log("pago", this.form.value);
  }



}

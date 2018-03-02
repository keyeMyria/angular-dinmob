import { Component, OnInit, Inject } from '@angular/core';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import { FormGroup, FormControl, FormArray, Validators, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import * as moment from 'moment';
import { ComisionService } from '../../../services/comision.service';

@Component({
  selector: 'app-editar-pago-comision-dialogo',
  templateUrl: './editar-pago-comision-dialogo.component.html',
  styleUrls: ['./editar-pago-comision-dialogo.component.scss']
})
export class EditarPagoComisionDialogoComponent implements OnInit {
  numberMask = createNumberMask({
    allowDecimal: true,
    prefix: '',
    decimalLimit: 2
  });
  form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<EditarPagoComisionDialogoComponent>,
    private fb: FormBuilder,
    private comisionSrv: ComisionService
  ) {
    this.form = this.fb.group({
      monto: [data.pago.monto, Validators.required],
      fecha: [moment(data.pago.fecha), Validators.required],
      id_destinatario: [data.pago.id_destinatario, Validators.required],
      nota: [data.pago.nota],
    });
  }

  ngOnInit() {
  }

  guardar() {
    console.log("ok", this.form.value);

    this.comisionSrv.updatePago(this.data.pago.id_pago, this.form.value)
      .subscribe(pago => {

        let i = this.data.comision.pagos.indexOf(this.data.trabajador);
        this.data.comision.pagos[i] = pago;
        this.dialogRef.close(true);

      },
        (error) => {
          this.dialogRef.close({ error: "Ha ocurrido un error. Vuelva a intentarlo más tarde." });
        });
  }

}

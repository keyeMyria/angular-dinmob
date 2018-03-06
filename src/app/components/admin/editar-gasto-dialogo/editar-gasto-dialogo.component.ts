import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormGroup, FormControl, FormArray, Validators, FormBuilder } from '@angular/forms';
import * as moment from 'moment';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import { GastoService } from '../../../services/gasto.service';

@Component({
  selector: 'app-editar-gasto-dialogo',
  templateUrl: './editar-gasto-dialogo.component.html',
  styleUrls: ['./editar-gasto-dialogo.component.scss']
})
export class EditarGastoDialogoComponent implements OnInit {
  numberMask = createNumberMask({
    allowDecimal: true,
    prefix: '',
    decimalLimit: 2
  });
  form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<EditarGastoDialogoComponent>,
    private fb: FormBuilder,
    private gastoSrv: GastoService
  ) {
    this.form = this.fb.group({

      id_tipo_gasto: [data.gasto.id_tipo_gasto, Validators.required],
      fecha: [moment(data.gasto.fecha), Validators.required],
      monto: [data.gasto.monto, Validators.required],
      nota: [data.gasto.nota],

    });
  }

  ngOnInit() {
  }

  private clonar(objeto): any {

    let strObject = JSON.stringify(objeto);
    return JSON.parse(strObject);

  }

  guardar() {
    console.log("ok", this.form.value);
    let frmGasto = this.clonar(this.form.value);
    frmGasto.monto = frmGasto.monto.replace(/,/g, "");

    this.gastoSrv.updateGasto(this.data.gasto.id_gasto, frmGasto)
      .subscribe(gasto => {

        let i = this.data.gastos.indexOf(this.data.gasto);
        this.data.gastos[i] = gasto;
        this.dialogRef.close(true);

      },
        (error) => {
          this.dialogRef.close({ error: "Ha ocurrido un error. Vuelva a intentarlo más tarde." });
        });
  }

}

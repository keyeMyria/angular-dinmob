import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormGroup, FormControl, FormArray, Validators, FormBuilder } from '@angular/forms';
import * as moment from 'moment';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import { CreditoPuenteService } from '../../../services/credito-puente.service';

@Component({
  selector: 'app-editar-cargo-abono-credito-dialogo',
  templateUrl: './editar-cargo-abono-credito-dialogo.component.html',
  styleUrls: ['./editar-cargo-abono-credito-dialogo.component.scss']
})
export class EditarCargoAbonoCreditoDialogoComponent implements OnInit {
  numberMask = createNumberMask({
    allowDecimal: true,
    prefix: '',
    decimalLimit: 2
  });
  form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<EditarCargoAbonoCreditoDialogoComponent>,
    private fb: FormBuilder,
    private creditoSrv: CreditoPuenteService
  ) {
    this.form = this.fb.group({


      fecha: [moment(data.mov.fecha), Validators.required],
      monto: [data.mov.monto, Validators.required],
      nota: [data.mov.nota],
      es_ministracion: [data.mov.es_ministracion]


    });
  }

  ngOnInit() {
  }

  guardar() {
    console.log("datos", this.form.value);
    this.form.value.monto = this.form.value.monto.replace(/,/g, "");
    this.creditoSrv.updateMovimiento(this.data.mov.id_movimiento, this.form.value)
      .subscribe(movimiento => {

        let i = this.data.movimientos.indexOf(this.data.mov);
        this.data.movimientos[i] = movimiento;
        this.dialogRef.close(true);

      },
        (error) => {
          this.dialogRef.close({ error: "Ha ocurrido un error. Vuelva a intentarlo más tarde." });
        });
  }

}

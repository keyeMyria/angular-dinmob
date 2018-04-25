import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormGroup, FormControl, FormArray, Validators, FormBuilder } from '@angular/forms';
import * as moment from 'moment';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import { GastoService } from '../../../services/gasto.service';

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
    private gastoSrv: GastoService
  ) {
    this.form = this.fb.group({

      id_tipo_gasto: ["", Validators.required],
      fecha: [moment(), Validators.required],
      monto: ["", Validators.required],
      nota: [""],
      id_obra: [data.obra.id_obra, Validators.required],

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

    this.gastoSrv.createGasto(frmGasto)
      .subscribe(gasto => {
        this.data.gastos.unshift(gasto);
        this.dialogRef.close(true);

      },
        (error) => {
          this.dialogRef.close({ error: "Ha ocurrido un error de conexión. Inténtelo más tarde" });
        });
  }

}

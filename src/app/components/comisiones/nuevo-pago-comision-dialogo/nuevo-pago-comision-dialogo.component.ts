import { Component, OnInit, Inject } from '@angular/core';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import { FormGroup, FormControl, FormArray, Validators, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import * as moment from 'moment';
import { ComisionService } from '../../../services/comision.service';

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
    private comisionSrv: ComisionService
  ) {
    this.form = this.fb.group({
      monto: ["", Validators.required],
      fecha: [moment("", "YYYY-MM-DD"), Validators.required],
      id_destinatario: ["", Validators.required],
      nota: "",
    });
  }

  private clonar(objeto): any {

    let strObject = JSON.stringify(objeto);
    return JSON.parse(strObject);

  }


  ngOnInit() {
  }

  guardar() {
    console.log("datos", this.form.value);

    let frmPago = this.clonar(this.form.value);
    frmPago.monto = frmPago.monto.replace(/,/g, "");
    frmPago.id_compra = this.data.comision.id_compra;
    this.comisionSrv.createPago(frmPago)
      .subscribe(pago => {
        console.log("COMISION", this.data.comision);
        this.data.comision.pagos.push(pago);
        this.dialogRef.close(true);

      },
        (error) => {
          this.dialogRef.close({ error: "Ha ocurrido un error de conexión. Inténtelo más tarde" });
        });

  }
}



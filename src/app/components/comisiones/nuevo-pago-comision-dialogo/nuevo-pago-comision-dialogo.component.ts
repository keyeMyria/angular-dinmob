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
      //monto: [""],
      fecha: [moment(), Validators.required],
      destinatario: ["", Validators.required],
      nota: "",
      porcentaje: ["", Validators.required]
    });
  }

  private clonar(objeto): any {

    let strObject = JSON.stringify(objeto);
    return JSON.parse(strObject);

  }


  ngOnInit() { }

  calcMonto() {
    let monto = 0;
    if (this.form.get("destinatario").value) {
      let destinatario = this.data.destinatarios.find(d => d.destinatario == this.form.get("destinatario").value);
      //console.log("dest", destinatario);


      monto = this.data.comision.valor_operacion * (destinatario.comision/100) * (this.form.get('porcentaje').value / 100)
    }
    return monto;

  }

  guardar() {
    //console.log("datos", this.form.value);

    let frmPago = this.clonar(this.form.value);
    //frmPago.monto = frmPago.monto.replace(/,/g, "");
    frmPago.id_compra = this.data.comision.id_compra;
    this.comisionSrv.createPago(frmPago)
      .subscribe(pago => {
        //console.log("COMISION", this.data.comision);
        this.data.comision.pagos.unshift(pago);
        this.dialogRef.close(true);

      },
        (error) => {
          this.dialogRef.close({ error: "Ha ocurrido un error de conexión. Inténtelo más tarde" });
        });

  }
}



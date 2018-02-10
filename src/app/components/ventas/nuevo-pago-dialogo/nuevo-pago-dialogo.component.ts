import { Component, OnInit, Inject } from '@angular/core';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import { FormGroup, FormControl, FormArray, Validators, FormBuilder } from '@angular/forms';
import * as moment from 'moment';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { VentasPagosService } from 'app/services/ventas-pagos.service';

@Component({
  selector: 'app-nuevo-pago-dialogo',
  templateUrl: './nuevo-pago-dialogo.component.html',
  styleUrls: ['./nuevo-pago-dialogo.component.scss']
})
export class NuevoPagoDialogoComponent implements OnInit {
  numberMask = createNumberMask({
    allowDecimal: true,
    prefix: '',
    decimalLimit: 2
  });
  form: FormGroup;
  loading: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<NuevoPagoDialogoComponent>,
    private fb: FormBuilder,
    private pagoSrv: VentasPagosService
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


  private clonar(objeto): any {

    let strObject = JSON.stringify(objeto);
    return JSON.parse(strObject);

  }

  guardar() {
    //console.log("nuevo pago", this.form.value);
    this.loading = true;

    let frmPago = this.clonar(this.form.value);
    frmPago.monto = frmPago.monto.replace(/,/g, "");
    frmPago.id_cliente = this.data.compra.id_cliente;
    frmPago.id_lote = this.data.compra.id_lote;

    //console.log("nuevo pago", frmPago);
    this.pagoSrv.createPago(frmPago)
      .subscribe(pago => {
        this.loading = false;
        this.data.compra.pagos.push(pago);
        this.dialogRef.close(true);

      }, (error) => {
        this.loading = false;
        this.dialogRef.close({ error: "Ha ocurrido un error de conexión. Inténtelo más tarde" });

      });
  }


}

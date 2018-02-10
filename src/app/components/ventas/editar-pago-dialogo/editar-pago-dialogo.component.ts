import { Component, OnInit, Inject } from '@angular/core';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, FormArray, Validators, FormBuilder } from '@angular/forms';
import * as moment from 'moment';
import { VentasPagosService } from 'app/services/ventas-pagos.service';

@Component({
  selector: 'app-editar-pago-dialogo',
  templateUrl: './editar-pago-dialogo.component.html',
  styleUrls: ['./editar-pago-dialogo.component.scss']
})
export class EditarPagoDialogoComponent implements OnInit {
  form: FormGroup;
  loading: boolean;

  numberMask = createNumberMask({
    allowDecimal: true,
    prefix: '',
    decimalLimit: 2
  });


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<EditarPagoDialogoComponent>,
    private fb: FormBuilder,
    private pagoSrv: VentasPagosService
  ) {


    this.form = this.fb.group({

      monto: [data.pago.monto, Validators.required],
      fecha_programada: [moment(data.pago.fecha_programada, "YYYY-MM-DD"), Validators.required],
      fecha_pago: moment(data.pago.fecha_pago, "YYYY-MM-DD"),
      id_tipo_pago: [data.pago.id_tipo_pago, Validators.required],
      id_forma_pago: [data.pago.id_forma_pago, Validators.required],
      nota: [data.pago.nota],


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
    this.pagoSrv.updatePago(this.data.pago.id_pago, frmPago)
      .subscribe(pago => {
        this.loading = false;
        let i = this.data.compra.pagos.indexOf(this.data.pago);
        this.data.compra.pagos[i] = pago;
        this.dialogRef.close(true);

      }, (error) => {
        this.loading = false;
        this.dialogRef.close({ error: "Ha ocurrido un error de conexión. Inténtelo más tarde" });

      });
  }




}

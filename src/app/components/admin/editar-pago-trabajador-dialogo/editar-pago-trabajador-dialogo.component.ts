import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormGroup, FormControl, FormArray, Validators, FormBuilder } from '@angular/forms';
import * as moment from 'moment';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import { PagoTrabajadorService } from 'app/services/pago-trabajador.service';

@Component({
  selector: 'app-editar-pago-trabajador-dialogo',
  templateUrl: './editar-pago-trabajador-dialogo.component.html',
  styleUrls: ['./editar-pago-trabajador-dialogo.component.scss']
})
export class EditarPagoTrabajadorDialogoComponent implements OnInit {
  numberMask = createNumberMask({
    allowDecimal: true,
    prefix: '',
    decimalLimit: 2
  });
  form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<EditarPagoTrabajadorDialogoComponent>,
    private fb: FormBuilder,
    private pagoSrv: PagoTrabajadorService
  ) {
    this.form = this.fb.group({


      fecha_pago: [moment(data.pago.fecha_pago), Validators.required],
      pagado: [data.pago.pagado, Validators.required],
      notas: [data.pago.notas],
      id_tipo_pago: [data.pago.id_tipo_pago],
      id_trabajador: [{ value: data.pago.id_trabajador, disabled: true }]


    });
  }

  ngOnInit() {
  }

  guardar() {
    console.log("pago", this.form.value);
    this.form.value.pagado = this.form.value.pagado.replace(/,/g, "");
    this.pagoSrv.updatePagoTrabajador(this.data.pago.id_pago, this.form.value)
      .subscribe(pago => {

        let i = this.data.historial.indexOf(this.data.pago);
        this.data.historial[i] = pago;
        this.data.historial.sort((a, b) => Number(new Date(b.fecha_pago)) - Number(new Date(a.fecha_pago)));
        this.dialogRef.close(true);

      },
        (error) => {
          this.dialogRef.close({ error: "Ha ocurrido un error. Vuelva a intentarlo más tarde." });
        });
  }

}

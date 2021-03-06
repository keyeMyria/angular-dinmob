import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import * as moment from 'moment';

@Component({
  selector: 'app-cambiar-estado-ventas-lote-dialogo',
  templateUrl: './cambiar-estado-ventas-lote-dialogo.component.html',
  styleUrls: ['./cambiar-estado-ventas-lote-dialogo.component.scss']
})
export class CambiarEstadoVentasLoteDialogoComponent implements OnInit {
  form: FormGroup;

  numberMask = createNumberMask({
    allowDecimal: true,
    prefix: '',
    decimalLimit: 2,
  });


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<CambiarEstadoVentasLoteDialogoComponent>,
    private fb: FormBuilder,
  ) {
    this.form = this.fb.group({
      id_estado_venta: data.lote.id_estado_venta,
      fecha_cambio_estado: [moment(data.lote.fecha_cambio_estado, "YYYY-MM-DD")],
      valor_base: data.lote.valor_base
    });
  }

  ngOnInit() {
  }

  guardar() {

    if (this.form.value.id_estado_lote != this.data.lote.id_estado_venta) {
      //console.log("estados diferentes");
      this.dialogRef.close(this.form.value);

    } else {
      //console.log("estados iguales");
      this.dialogRef.close(false);
    }



  }

}

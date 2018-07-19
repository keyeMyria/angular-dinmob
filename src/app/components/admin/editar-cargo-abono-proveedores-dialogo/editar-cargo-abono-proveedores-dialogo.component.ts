import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormGroup, FormControl, FormArray, Validators, FormBuilder } from '@angular/forms';
import * as moment from 'moment';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import { ProveedorService } from '../../../services/proveedor.service';

@Component({
  selector: 'app-editar-cargo-abono-proveedores-dialogo',
  templateUrl: './editar-cargo-abono-proveedores-dialogo.component.html',
  styleUrls: ['./editar-cargo-abono-proveedores-dialogo.component.scss']
})
export class EditarCargoAbonoProveedoresDialogoComponent implements OnInit {
  numberMask = createNumberMask({
    allowDecimal: true,
    prefix: '',
    decimalLimit: 2
  });
  form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<EditarCargoAbonoProveedoresDialogoComponent>,
    private fb: FormBuilder,
    private proveedorSrv: ProveedorService
  ) {
    this.form = this.fb.group({

      fecha: [moment(data.mov.fecha), Validators.required],
      monto: [data.mov.monto, Validators.required],
      nota: [data.mov.nota],
      es_cargo: [data.mov.es_cargo]

    });
  }

  ngOnInit() {
  }

  guardar() {

    //console.log("datos", this.form.value);
    this.form.value.monto = this.form.value.monto.replace(/,/g, "");
    this.proveedorSrv.updateMovimiento(this.data.mov.id_movimiento, this.form.value)
      .subscribe(movimiento => {

        let i = this.data.movimientos.indexOf(this.data.mov);
        this.data.movimientos[i] = movimiento;
        this.data.movimientos.sort((a, b) => Number(new Date(b.fecha)) - Number(new Date(a.fecha)));
        this.dialogRef.close(true);

      },
        (error) => {
          this.dialogRef.close({ error: "Ha ocurrido un error. Vuelva a intentarlo más tarde." });
        });

  }

}

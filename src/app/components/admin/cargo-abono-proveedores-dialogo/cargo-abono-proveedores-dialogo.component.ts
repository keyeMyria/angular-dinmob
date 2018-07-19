import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormGroup, FormControl, FormArray, Validators, FormBuilder } from '@angular/forms';
import * as moment from 'moment';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import { ProveedorService } from '../../../services/proveedor.service';

@Component({
  selector: 'app-cargo-abono-proveedores-dialogo',
  templateUrl: './cargo-abono-proveedores-dialogo.component.html',
  styleUrls: ['./cargo-abono-proveedores-dialogo.component.scss']
})
export class CargoAbonoProveedoresDialogoComponent implements OnInit {
  numberMask = createNumberMask({
    allowDecimal: true,
    prefix: '',
    decimalLimit: 2
  });
  form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<CargoAbonoProveedoresDialogoComponent>,
    private fb: FormBuilder,
    private proveedorSrv:ProveedorService
  ) {
    this.form = this.fb.group({

      fecha: [moment(), Validators.required],
      monto: ["", Validators.required],
      id_obra: [this.data.id_obra, Validators.required],
      nota: [""],
      es_cargo: ["1", Validators.required]


    });
  }

  ngOnInit() {
  }

  guardar() {

    this.form.value.monto = this.form.value.monto.replace(/,/g, "");
    this.proveedorSrv.createMovimiento(this.form.value)
      .subscribe(mov => {
        this.data.movimientos.push(mov);
        this.data.movimientos.sort((a, b) => Number(new Date(b.fecha)) - Number(new Date(a.fecha)));
        this.dialogRef.close(true);

      }, (error) => {
        this.dialogRef.close({ error: "Ha ocurrido un error de conexión. Inténtelo más tarde" });
      });

  }

}

import { Component, OnInit, Inject } from '@angular/core';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { FormGroup, FormControl, FormArray, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-editar-insumo-dialogo',
  templateUrl: './editar-insumo-dialogo.component.html',
  styleUrls: ['./editar-insumo-dialogo.component.scss']
})
export class EditarInsumoDialogoComponent implements OnInit {
  form: FormGroup;

  currencyMask = createNumberMask({
    allowDecimal: true
  });
  numberMask = createNumberMask({
    allowDecimal: true,
    prefix: '',
    decimalLimit: 6,
  });



  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<EditarInsumoDialogoComponent>,
    private fb: FormBuilder, ) {
    this.form = this.fb.group({
      insumo: [data.insumo.insumo],
      unidad: [data.insumo.unidad],
      cantidad: [data.insumo.cantidad, Validators.required],
      precio: [data.insumo.precio, Validators.required]


    });

  }

  ngOnInit() {
  }

  guardar() {
    console.log("ok", this.form.value)
  }

}

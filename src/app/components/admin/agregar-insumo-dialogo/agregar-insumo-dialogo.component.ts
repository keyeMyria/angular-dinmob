import { Component, OnInit, Inject } from '@angular/core';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import { FormGroup, FormControl, FormArray, Validators, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-agregar-insumo-dialogo',
  templateUrl: './agregar-insumo-dialogo.component.html',
  styleUrls: ['./agregar-insumo-dialogo.component.scss']
})
export class AgregarInsumoDialogoComponent implements OnInit {
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
    public dialogRef: MatDialogRef<AgregarInsumoDialogoComponent>,
    private fb: FormBuilder,
  ) { 
    this.form = this.fb.group({
      add_insumo_selected: ["", Validators.required],
      unidad: ["", Validators.required],
      precio: ["", Validators.required],
      cantidad: ["", Validators.required]

    });
  }

  ngOnInit() {
  }

  guardar() {
    console.log("insumo", this.form.value);
  }

}

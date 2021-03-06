import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormGroup, FormControl, FormArray, Validators, FormBuilder } from '@angular/forms';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';

import { ObrasService } from "app/services/obras.service";


import * as moment from 'moment';


@Component({
  selector: 'app-agregar-obra-dialogo',
  templateUrl: './agregar-obra-dialogo.component.html',
  styleUrls: ['./agregar-obra-dialogo.component.scss']
})
export class AgregarObraDialogoComponent implements OnInit {
  form: FormGroup;
  numberMask = createNumberMask({
    allowDecimal: true,
    prefix: '',
    decimalLimit: 2,
  });


  constructor(
    private obrasSrv: ObrasService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AgregarObraDialogoComponent>,
    private fb: FormBuilder,
  ) {


    this.form = this.fb.group({                 

      nombre: ["", Validators.required],
      fecha_ini: [moment(""), Validators.required],
      en_venta: false,
      residentes: this.fb.array([], this.checkUsuariosRepetidos),
      control_almacen: this.fb.array([], this.checkUsuariosRepetidos),
      almacenistas: this.fb.array([], this.checkUsuariosRepetidos),
      comision_vendedor: [""],
      comision_gerente: [""],
      comision_expediente: [""]
    });

  }

  ngOnInit() {

  }

  checkUsuariosRepetidos(control: FormArray): { [key: string]: boolean } {

    //console.log("chekrepetidos", control);

    let tiene_repetidos = (new Set(control.value)).size !== control.value.length;

    if (tiene_repetidos) {
      return { repetidos: true };
    } else {
      return null;
    }

  }
  get residentes(): FormArray {
    return this.form.get('residentes') as FormArray;
  }
  get almacenistas(): FormArray {
    return this.form.get('almacenistas') as FormArray;
  }
  get control_almacen(): FormArray {
    return this.form.get('control_almacen') as FormArray;
  }

  addResidente() {
    (<FormArray>this.form.controls["residentes"]).push(new FormControl("", Validators.required));
  }

  delResidente(index: number) {
    (<FormArray>this.form.controls["residentes"]).removeAt(index);
  }


  addAlmacenista() {
    (<FormArray>this.form.controls["almacenistas"]).push(new FormControl("", Validators.required));
  }

  delAlmacenista(index: number) {
    (<FormArray>this.form.controls["almacenistas"]).removeAt(index);
  }

  addControlAlmacen() {
    (<FormArray>this.form.controls["control_almacen"]).push(new FormControl("", Validators.required));
  }

  delControlAlmacen(index: number) {
    (<FormArray>this.form.controls["control_almacen"]).removeAt(index);
  }


  debug() {
    console.log("formgroup", this.form);
    console.log("value", this.form.value);
    console.log("status", this.form.status);
  }

  crear() {


    this.obrasSrv.createObra(this.form.value)
      .subscribe(obra => {

        this.data.obras.push(obra);

        this.dialogRef.close(true);

      }, (error) => {
        this.dialogRef.close({ error: "Ha ocurrido un error de conexión. Inténtelo más tarde" });
      });

  }



}

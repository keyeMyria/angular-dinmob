import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormGroup, FormControl, FormArray, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-editar-obra-dialogo',
  templateUrl: './editar-obra-dialogo.component.html',
  styleUrls: ['./editar-obra-dialogo.component.scss']
})
export class EditarObraDialogoComponent implements OnInit {

  form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<EditarObraDialogoComponent>,
    private fb: FormBuilder,
  ) {

    this.form = this.fb.group({

      nombre: [data.obra.nombre, Validators.required],
      fecha_ini: [data.obra.fecha_ini, Validators.required],
      en_venta: data.obra.en_venta == "0" ? false : true,
      residentes: this.fb.array([], this.checkUsuariosRepetidos),
      control_almacen: this.fb.array([], this.checkUsuariosRepetidos),
      almacenistas: this.fb.array([], this.checkUsuariosRepetidos),
    });

    this.data.obra.residentes.forEach(usuario => {
      (<FormArray>this.form.controls["residentes"]).push(new FormControl(usuario.id_usuario, Validators.required));
    });

    this.data.obra.control_almacen.forEach(usuario => {
      (<FormArray>this.form.controls["control_almacen"]).push(new FormControl(usuario.id_usuario, Validators.required));
    });

    this.data.obra.almacenistas.forEach(usuario => {
      (<FormArray>this.form.controls["almacenistas"]).push(new FormControl(usuario.id_usuario, Validators.required));
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

}

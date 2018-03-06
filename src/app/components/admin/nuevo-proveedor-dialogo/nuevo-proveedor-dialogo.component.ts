import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormGroup, FormControl, FormArray, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-nuevo-proveedor-dialogo',
  templateUrl: './nuevo-proveedor-dialogo.component.html',
  styleUrls: ['./nuevo-proveedor-dialogo.component.scss']
})
export class NuevoProveedorDialogoComponent implements OnInit {
  form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<NuevoProveedorDialogoComponent>,
    private fb: FormBuilder,
  ) {
    this.form = this.fb.group({
      nombre: ["", Validators.required],
      contacto: [""],
      email: [""],
      telefono: [""],
      rfc: [""],
      domicilio: [""],
      nota: [""]
    })
  }

  ngOnInit() {
  }

  guardar() {
    console.log("ok")
  }

}

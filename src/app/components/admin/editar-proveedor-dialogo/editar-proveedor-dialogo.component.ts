import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormGroup, FormControl, FormArray, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-editar-proveedor-dialogo',
  templateUrl: './editar-proveedor-dialogo.component.html',
  styleUrls: ['./editar-proveedor-dialogo.component.scss']
})
export class EditarProveedorDialogoComponent implements OnInit {
  form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<EditarProveedorDialogoComponent>,
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

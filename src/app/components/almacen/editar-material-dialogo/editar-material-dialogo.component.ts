import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-editar-material-dialogo',
  templateUrl: './editar-material-dialogo.component.html',
  styleUrls: ['./editar-material-dialogo.component.scss']
})
export class EditarMaterialDialogoComponent implements OnInit {
  form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<EditarMaterialDialogoComponent>,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      codigo: ["", Validators.required],
      nombre: ["", Validators.required],
      unidad: ["", Validators.required],
      existencias: ["", Validators.required]
    });
  }

  guardar() {
    console.log("ok", this.form.value);
  }

}

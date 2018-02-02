import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-nuevo-material-dialogo',
  templateUrl: './nuevo-material-dialogo.component.html',
  styleUrls: ['./nuevo-material-dialogo.component.scss']
})
export class NuevoMaterialDialogoComponent implements OnInit {
  form: FormGroup

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<NuevoMaterialDialogoComponent>,
    private fb: FormBuilder
  ) {

    this.form = this.fb.group({
      obra: ["", Validators.required],
      codigo: ["", Validators.required],
      nombre: ["", Validators.required],
      unidad: ["", Validators.required],
      existencias: ["", Validators.required]
    });
  }

  ngOnInit() {
  }

  guardar() {
    console.log("ok", this.form.value);
  }


}

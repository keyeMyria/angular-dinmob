import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-agregar-prototipo-dialogo',
  templateUrl: './agregar-prototipo-dialogo.component.html',
  styleUrls: ['./agregar-prototipo-dialogo.component.scss']
})
export class AgregarPrototipoDialogoComponent implements OnInit {
  form: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AgregarPrototipoDialogoComponent>,
    private fb: FormBuilder,
  ) {
    this.form = this.fb.group({
      nombre: ["", Validators.required]
    });
  }

  ngOnInit() {
  }

  guardar() {
    console.log("agregar prototipo", this.form.value);


  }

}

import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-agregar-instituto-credito-dialogo',
  templateUrl: './agregar-instituto-credito-dialogo.component.html',
  styleUrls: ['./agregar-instituto-credito-dialogo.component.scss']
})
export class AgregarInstitutoCreditoDialogoComponent implements OnInit {
  form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AgregarInstitutoCreditoDialogoComponent>,
    private fb: FormBuilder,
  ) {
    this.form = this.fb.group({
      institucion: ["", Validators.required]
    });
  }

  ngOnInit() {
  }

  guardar() {
    console.log("Institución", this.form.value);



  }

}

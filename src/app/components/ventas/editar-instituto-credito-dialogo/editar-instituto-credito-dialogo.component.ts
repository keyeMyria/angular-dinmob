import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { FormGroup, FormControl, FormArray, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-editar-instituto-credito-dialogo',
  templateUrl: './editar-instituto-credito-dialogo.component.html',
  styleUrls: ['./editar-instituto-credito-dialogo.component.scss']
})
export class EditarInstitutoCreditoDialogoComponent implements OnInit {
  form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<EditarInstitutoCreditoDialogoComponent>,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      nombre: ["", Validators.required]
    });
  }

  ngOnInit() {
  }

  guardar() {
  }

}

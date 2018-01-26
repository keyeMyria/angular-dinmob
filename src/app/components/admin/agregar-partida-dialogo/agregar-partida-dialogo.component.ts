import { Component, OnInit, Inject } from '@angular/core';
import { Prototipo } from 'app/model/prototipo';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { FormGroup, FormControl, FormArray, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-agregar-partida-dialogo',
  templateUrl: './agregar-partida-dialogo.component.html',
  styleUrls: ['./agregar-partida-dialogo.component.scss']
})
export class AgregarPartidaDialogoComponent implements OnInit {
  form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AgregarPartidaDialogoComponent>,
    private fb: FormBuilder,
  ) {
    this.form = this.fb.group({
      codigo: ["", Validators.required],
      nombre: ["", Validators.required],

    });
  }

  ngOnInit() {
  }

  guardar() {
    console.log("agregar partida", this.form.value);    


  }


}

import { Component, OnInit, Inject } from '@angular/core';
import { Partida } from 'app/model/partida';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { FormGroup, FormControl, FormArray, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-editar-partida-dialogo',
  templateUrl: './editar-partida-dialogo.component.html',
  styleUrls: ['./editar-partida-dialogo.component.scss']
})
export class EditarPartidaDialogoComponent implements OnInit {
  form: FormGroup;


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<EditarPartidaDialogoComponent>,
    private fb: FormBuilder
  ) { 
    this.form = this.fb.group({
      codigo: [data.partida.codigo, Validators.required],
      nombre: [data.partida.nombre, Validators.required]
    });
  }

  ngOnInit() {

  }

  guardar() {
    console.log("partida", this.form.value);
  }

}

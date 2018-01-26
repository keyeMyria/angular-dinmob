import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { FormGroup, FormControl, FormArray, Validators, FormBuilder } from '@angular/forms';



@Component({
  selector: 'app-editar-nombre-prototipo-dialogo',
  templateUrl: './editar-nombre-prototipo-dialogo.component.html',
  styleUrls: ['./editar-nombre-prototipo-dialogo.component.scss']
})
export class EditarNombrePrototipoDialogoComponent implements OnInit {
  form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<EditarNombrePrototipoDialogoComponent>,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      nombre: [data.prototipo.info.nombre, Validators.required]
    });


  }

  ngOnInit() {

  }

  guardar() {
    console.log("guardar", this.form.value);

  }
  /* data.prototipo.info.nombre */


}

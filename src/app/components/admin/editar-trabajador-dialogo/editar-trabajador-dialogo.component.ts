import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-editar-trabajador-dialogo',
  templateUrl: './editar-trabajador-dialogo.component.html',
  styleUrls: ['./editar-trabajador-dialogo.component.scss']
})
export class EditarTrabajadorDialogoComponent implements OnInit {
  form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<EditarTrabajadorDialogoComponent>,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({

      nombre: ["", Validators.required],
      especialidad: ["", Validators.required],
      retencion: ["", Validators.required],
      obra: ["", Validators.required],

    });
  }

  ngOnInit() {
  }

  guardar() {
    console.log("ok", this.form.value);
  }

}






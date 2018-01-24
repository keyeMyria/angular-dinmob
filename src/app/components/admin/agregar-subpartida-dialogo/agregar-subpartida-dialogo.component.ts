import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { CrearUsuarioDialogoComponent } from 'app/components/admin/crear-usuario-dialogo/crear-usuario-dialogo.component';

@Component({
  selector: 'app-agregar-subpartida-dialogo',
  templateUrl: './agregar-subpartida-dialogo.component.html',
  styleUrls: ['./agregar-subpartida-dialogo.component.scss']
})
export class AgregarSubpartidaDialogoComponent implements OnInit {
  form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<CrearUsuarioDialogoComponent>,
    private fb: FormBuilder,
  ) {
    this.form = this.fb.group({
      nombre: ["", Validators.required],
      codigo: ["", Validators.required]

    });
   }

  ngOnInit() {
  }

  guardar() {
    console.log("usuario", this.form.value);
  }


}

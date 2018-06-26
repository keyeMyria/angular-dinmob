import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-editar-equipo-dialogo',
  templateUrl: './editar-equipo-dialogo.component.html',
  styleUrls: ['./editar-equipo-dialogo.component.scss']
})
export class EditarEquipoDialogoComponent implements OnInit {
  form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<EditarEquipoDialogoComponent>,
    private fb: FormBuilder,
  ) {
    this.form = this.fb.group({
      equipo_nombre: [null, Validators.required],
    });
  }

  ngOnInit() {
  }

}

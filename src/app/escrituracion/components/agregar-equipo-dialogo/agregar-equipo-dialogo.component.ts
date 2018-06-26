import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-agregar-equipo-dialogo',
  templateUrl: './agregar-equipo-dialogo.component.html',
  styleUrls: ['./agregar-equipo-dialogo.component.scss']
})
export class AgregarEquipoDialogoComponent implements OnInit {
  form: FormGroup;


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AgregarEquipoDialogoComponent>,
    private fb: FormBuilder,
  ) {
    this.form = this.fb.group({
      equipo_nombre: [null, Validators.required],
    });
  }

  ngOnInit() {
  }

}

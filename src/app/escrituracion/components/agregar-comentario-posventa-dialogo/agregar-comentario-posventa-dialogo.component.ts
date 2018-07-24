import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-agregar-comentario-posventa-dialogo',
  templateUrl: './agregar-comentario-posventa-dialogo.component.html',
  styleUrls: ['./agregar-comentario-posventa-dialogo.component.scss']
})
export class AgregarComentarioPosventaDialogoComponent implements OnInit {
  form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AgregarComentarioPosventaDialogoComponent>,
    private fb: FormBuilder,
  ) {
    this.form = this.fb.group({
      comentario: [null, Validators.required],
    });
  }

  ngOnInit() {
  }

  guardar() {

  }

}

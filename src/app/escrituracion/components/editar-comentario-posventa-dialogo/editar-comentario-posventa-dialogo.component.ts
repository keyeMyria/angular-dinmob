import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-editar-comentario-posventa-dialogo',
  templateUrl: './editar-comentario-posventa-dialogo.component.html',
  styleUrls: ['./editar-comentario-posventa-dialogo.component.scss']
})
export class EditarComentarioPosventaDialogoComponent implements OnInit {
  form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<EditarComentarioPosventaDialogoComponent>,
    private fb: FormBuilder,
  ) {
    this.form = this.fb.group({
      comentario: [(data.c.comentario), Validators.required],
    });
  }

  ngOnInit() {
  }

}

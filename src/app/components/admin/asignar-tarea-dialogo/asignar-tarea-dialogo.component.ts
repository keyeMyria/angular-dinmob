import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-asignar-tarea-dialogo',
  templateUrl: './asignar-tarea-dialogo.component.html',
  styleUrls: ['./asignar-tarea-dialogo.component.scss']
})
export class AsignarTareaDialogoComponent implements OnInit {
  form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AsignarTareaDialogoComponent>,
    private fb: FormBuilder,
  ) {
    this.form = this.fb.group({

    });
  }

  ngOnInit() {
  }

}

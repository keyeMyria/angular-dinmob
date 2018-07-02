import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-editar-tarea-dialogo',
  templateUrl: './editar-tarea-dialogo.component.html',
  styleUrls: ['./editar-tarea-dialogo.component.scss']
})
export class EditarTareaDialogoComponent implements OnInit {
  form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<EditarTareaDialogoComponent>,
    private fb: FormBuilder,
  ) { 
    this.form = this.fb.group({

    });
  }

  ngOnInit() {
  }

}

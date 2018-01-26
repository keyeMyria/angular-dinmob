import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, FormArray, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-editar-manzana-dialogo',
  templateUrl: './editar-manzana-dialogo.component.html',
  styleUrls: ['./editar-manzana-dialogo.component.scss']
})
export class EditarManzanaDialogoComponent implements OnInit {
  form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<EditarManzanaDialogoComponent>,
    private fb: FormBuilder
  ) { 
    this.form = this.fb.group({      
      nombre: [data.manzana.nombre, Validators.required]
    });
  }

  ngOnInit() {
  }

  guardar() {
    console.log("editar manzana", this.form.value);
  }

}

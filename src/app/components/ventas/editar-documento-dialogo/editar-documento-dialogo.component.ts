import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, FormArray, Validators, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-editar-documento-dialogo',
  templateUrl: './editar-documento-dialogo.component.html',
  styleUrls: ['./editar-documento-dialogo.component.scss']
})
export class EditarDocumentoDialogoComponent implements OnInit {
  form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<EditarDocumentoDialogoComponent>,
    private fb: FormBuilder,
  ) {  
    this.form = this.fb.group({
      nombre: [data.doc.nombre, Validators.required]      
    });
  }

  ngOnInit() {
  }

  guardar() {
    console.log("guardar", this.form.value);
    
  }

}

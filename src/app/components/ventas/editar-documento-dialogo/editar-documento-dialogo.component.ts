import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


@Component({
  selector: 'app-editar-documento-dialogo',
  templateUrl: './editar-documento-dialogo.component.html',
  styleUrls: ['./editar-documento-dialogo.component.scss']
})
export class EditarDocumentoDialogoComponent implements OnInit {
  nombre: FormControl;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<EditarDocumentoDialogoComponent>
  ) {
    this.nombre = new FormControl(this.data.doc.nombre, Validators.required);
  }

  ngOnInit() {
  }

  guardar() {
    console.log("guardar", this.nombre.value);
    
  }

}

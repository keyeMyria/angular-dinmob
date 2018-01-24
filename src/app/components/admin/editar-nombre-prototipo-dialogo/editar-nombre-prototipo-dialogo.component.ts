import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-editar-nombre-prototipo-dialogo',
  templateUrl: './editar-nombre-prototipo-dialogo.component.html',
  styleUrls: ['./editar-nombre-prototipo-dialogo.component.scss']
})
export class EditarNombrePrototipoDialogoComponent implements OnInit {
  nombre: FormControl;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<EditarNombrePrototipoDialogoComponent>
  ) {
    this.nombre = new FormControl(this.data.prototipo.info.nombre, Validators.required);
  }

  ngOnInit() {

  }
  
  guardar() {
    console.log("guardar", this.nombre.value);

  }


}

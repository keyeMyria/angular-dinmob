import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-editar-lote-escrituracion-dialogo',
  templateUrl: './editar-lote-escrituracion-dialogo.component.html',
  styleUrls: ['./editar-lote-escrituracion-dialogo.component.scss']
})
export class EditarLoteEscrituracionDialogoComponent implements OnInit {

  estados_selected: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<EditarLoteEscrituracionDialogoComponent>,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
  }

}
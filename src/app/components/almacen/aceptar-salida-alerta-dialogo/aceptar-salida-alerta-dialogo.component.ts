import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { FormGroup, Validators, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-aceptar-salida-alerta-dialogo',
  templateUrl: './aceptar-salida-alerta-dialogo.component.html',
  styleUrls: ['./aceptar-salida-alerta-dialogo.component.scss']
})
export class AceptarSalidaAlertaDialogoComponent implements OnInit {
  form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AceptarSalidaAlertaDialogoComponent>,
    private fb: FormBuilder,
  ) {
    this.form = this.fb.group({
      motivo: ["", Validators.required]
    });
   }

  ngOnInit() {
  }

}

import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-cambiar-estado-ventas-lote-dialogo',
  templateUrl: './cambiar-estado-ventas-lote-dialogo.component.html',
  styleUrls: ['./cambiar-estado-ventas-lote-dialogo.component.scss']
})
export class CambiarEstadoVentasLoteDialogoComponent implements OnInit {
  form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<CambiarEstadoVentasLoteDialogoComponent>,
    private fb: FormBuilder,
  ) {
    this.form = this.fb.group({
      id_estado: null
    });
  }

  ngOnInit() {
  }

}

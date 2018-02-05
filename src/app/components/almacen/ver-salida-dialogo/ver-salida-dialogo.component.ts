import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, FormArray, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-ver-salida-dialogo',
  templateUrl: './ver-salida-dialogo.component.html',
  styleUrls: ['./ver-salida-dialogo.component.scss']
})
export class VerSalidaDialogoComponent implements OnInit {
  form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<VerSalidaDialogoComponent>,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      folio: [data.salida.folio],
      num_vale: [data.salida.num_vale],
      tipo: [data.salida.tipo],
      fecha: [data.salida.fecha],
      obra_destino: [data.salida.obra_destino],
      nombre_lote: [data.salida.nombre_lote],
      nombre_partida: [data.salida.nombre_partida],
      autoriza: [data.salida.autoriza],
      entrega: [data.salida.entraga],
      nombre_trabajador: [data.salida.nombre_trabajador],
     


    });

  }

  ngOnInit() {
  }

}

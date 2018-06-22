import { Component, OnInit, Inject } from '@angular/core';
import { Partida } from 'app/model/partida';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { FormGroup, FormControl, FormArray, Validators, FormBuilder } from '@angular/forms';
import { PrototiposService } from '../../../services/prototipos.service';

@Component({
  selector: 'app-editar-subpartida-dialogo',
  templateUrl: './editar-subpartida-dialogo.component.html',
  styleUrls: ['./editar-subpartida-dialogo.component.scss']
})
export class EditarSubpartidaDialogoComponent implements OnInit {
  form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<EditarSubpartidaDialogoComponent>,
    private fb: FormBuilder,
    private prototipoSrv: PrototiposService
  ) {
    this.form = this.fb.group({
      nombre: [data.subpartida.nombre, Validators.required],
      codigo: [data.subpartida.codigo, Validators.required]
    });
  }

  ngOnInit() {

  }

  guardar() {
    //console.log("subpartida", this.form.value);
    this.prototipoSrv.updatePartida(this.data.subpartida.id_partida, this.form.value)
      .subscribe((partida: any) => {
        this.data.subpartida.codigo = partida.codigo;
        this.data.subpartida.nombre = partida.nombre;
        this.dialogRef.close(true);
      }, (error) => {
        this.dialogRef.close({ error: "Ha ocurrido un error de conexión. Inténtelo más tarde" });
      })
  }

}

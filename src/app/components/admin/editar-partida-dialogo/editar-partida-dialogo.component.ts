import { Component, OnInit, Inject } from '@angular/core';
import { Partida } from 'app/model/partida';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { FormGroup, FormControl, FormArray, Validators, FormBuilder } from '@angular/forms';
import { PrototiposService } from '../../../services/prototipos.service';

@Component({
  selector: 'app-editar-partida-dialogo',
  templateUrl: './editar-partida-dialogo.component.html',
  styleUrls: ['./editar-partida-dialogo.component.scss']
})
export class EditarPartidaDialogoComponent implements OnInit {
  form: FormGroup;


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<EditarPartidaDialogoComponent>,
    private fb: FormBuilder,
    private prototipoSrv: PrototiposService
  ) {
    this.form = this.fb.group({
      codigo: [data.partida.codigo, Validators.required],
      nombre: [data.partida.nombre, Validators.required]
    });
  }

  ngOnInit() {

  }

  guardar() {
    //console.log("partida", this.form.value);
    this.prototipoSrv.updatePartida(this.data.partida.id_partida, this.form.value)
      .subscribe((partida: any) => {
        this.data.partida.codigo = partida.codigo;
        this.data.partida.nombre = partida.nombre;
        this.dialogRef.close(true);
      }, (error) => {
        this.dialogRef.close({ error: "Ha ocurrido un error de conexión. Inténtelo más tarde" });
      })
  }

}

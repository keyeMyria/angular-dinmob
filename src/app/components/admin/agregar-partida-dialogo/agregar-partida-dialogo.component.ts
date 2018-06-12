import { Component, OnInit, Inject } from '@angular/core';
import { Prototipo } from 'app/model/prototipo';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { FormGroup, FormControl, FormArray, Validators, FormBuilder } from '@angular/forms';
import { PrototiposService } from '../../../services/prototipos.service';

@Component({
  selector: 'app-agregar-partida-dialogo',
  templateUrl: './agregar-partida-dialogo.component.html',
  styleUrls: ['./agregar-partida-dialogo.component.scss']
})
export class AgregarPartidaDialogoComponent implements OnInit {
  form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AgregarPartidaDialogoComponent>,
    private fb: FormBuilder,
    private prototipoSrv: PrototiposService
  ) {
    this.form = this.fb.group({
      codigo: ["", Validators.required],
      nombre: ["", Validators.required],
      id_prototipo: [data.prototipo.id_prototipo, Validators.required]

    });
  }

  ngOnInit() {
  }

  guardar() {
    //console.log("agregar partida", this.form.value);
    this.prototipoSrv.createPartida(this.form.value)
      .subscribe(partida => {
        this.data.partidas.push(partida);
        this.dialogRef.close(true);
      }, (error) => {
        this.dialogRef.close({ error: "Ha ocurrido un error de conexión. Inténtelo más tarde" });
      });

  }


}

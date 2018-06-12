import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { CrearUsuarioDialogoComponent } from 'app/components/admin/crear-usuario-dialogo/crear-usuario-dialogo.component';
import { PrototiposService } from '../../../services/prototipos.service';

@Component({
  selector: 'app-agregar-subpartida-dialogo',
  templateUrl: './agregar-subpartida-dialogo.component.html',
  styleUrls: ['./agregar-subpartida-dialogo.component.scss']
})
export class AgregarSubpartidaDialogoComponent implements OnInit {
  form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<CrearUsuarioDialogoComponent>,
    private fb: FormBuilder,
    private prototipoSrv: PrototiposService
  ) {
    this.form = this.fb.group({
      nombre: ["", Validators.required],
      codigo: ["", Validators.required],
      id_prototipo: [data.prototipo.id_prototipo, Validators.required],
      partida: [data.partida.id_partida, Validators.required]

    });
  }

  ngOnInit() {
  }

  guardar() {
    this.prototipoSrv.createPartida(this.form.value)
      .subscribe(partida => {
        this.data.partida.subpartidas.push(partida);
        this.dialogRef.close(true);
      }, (error) => {
        this.dialogRef.close({ error: "Ha ocurrido un error de conexión. Inténtelo más tarde" });
      });
  }


}

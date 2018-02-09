import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { PrototiposService } from 'app/services/prototipos.service';

@Component({
  selector: 'app-agregar-prototipo-dialogo',
  templateUrl: './agregar-prototipo-dialogo.component.html',
  styleUrls: ['./agregar-prototipo-dialogo.component.scss']
})
export class AgregarPrototipoDialogoComponent implements OnInit {
  form: FormGroup;
  loading: boolean;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AgregarPrototipoDialogoComponent>,
    private fb: FormBuilder,
    private prototipoSrv: PrototiposService
  ) {
    this.form = this.fb.group({
      nombre: ["", Validators.required]
    });
  }

  ngOnInit() {
    console.log("onInit", this.data);

  }

  guardar() {
    console.log("agregar prototipo", this.form.value);

    this.loading = true;
    let prototipo = { id_obra: this.data.obra.id_obra, nombre: this.form.get('nombre').value };

    console.log("agregar prototipo", this.form.value);
    console.log("prototipo", prototipo);
    

    this.prototipoSrv.createPrototipo(prototipo)
      .subscribe(prototipo => {
        this.loading = false;
        this.data.prototipos.push(prototipo);
        this.dialogRef.close(true);

      }, (error) => {
        this.loading = false;
        this.dialogRef.close({ error: "Ha ocurrido un error de conexión. Inténtelo más tarde" });
      })


  }

}

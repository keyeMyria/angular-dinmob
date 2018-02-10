import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { FormGroup, FormControl, FormArray, Validators, FormBuilder } from '@angular/forms';
import { PrototiposService } from 'app/services/prototipos.service';
import { templateJitUrl } from '@angular/compiler';



@Component({
  selector: 'app-editar-nombre-prototipo-dialogo',
  templateUrl: './editar-nombre-prototipo-dialogo.component.html',
  styleUrls: ['./editar-nombre-prototipo-dialogo.component.scss']
})
export class EditarNombrePrototipoDialogoComponent implements OnInit {
  form: FormGroup;
  loading: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<EditarNombrePrototipoDialogoComponent>,
    private fb: FormBuilder,
    private prototipoSrv: PrototiposService
  ) {
    this.form = this.fb.group({
      nombre: [data.prototipo.nombre, Validators.required]
    });


  }

  ngOnInit() {

  }

  guardar() {
    //console.log("guardar", this.form.value);
    this.loading = true;
    this.prototipoSrv.updatePrototipo(this.data.prototipo.id_prototipo, this.form.value)
      .subscribe(prototipo => {
        this.loading = false;
        this.data.prototipo.nombre = prototipo.nombre;
        this.dialogRef.close(true);
      }, (error) => {
        this.loading = false;
        this.dialogRef.close({ error: "Ha ocurrido un error de conexión. Inténtelo más tarde" });
      })

  }


}

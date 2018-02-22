import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { FormGroup, FormControl, FormArray, Validators, FormBuilder } from '@angular/forms';
import { InstitucionCreditoService } from '../../../services/institucion-credito.service';

@Component({
  selector: 'app-editar-instituto-credito-dialogo',
  templateUrl: './editar-instituto-credito-dialogo.component.html',
  styleUrls: ['./editar-instituto-credito-dialogo.component.scss']
})
export class EditarInstitutoCreditoDialogoComponent implements OnInit {
  form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<EditarInstitutoCreditoDialogoComponent>,
    private fb: FormBuilder,
    private institucionSrv: InstitucionCreditoService
  ) {
    this.form = this.fb.group({
      nombre: [data.institucion.nombre, Validators.required],
      //color: [data.institucion.color]
    });
  }

  ngOnInit() {
  }

  guardar() {
    this.institucionSrv.updateInstitucion(this.data.institucion.id_institucion_credito, this.form.value)
      .subscribe(institucion => {
        this.data.institucion.nombre = institucion.nombre;
        this.dialogRef.close(true);
      }, (error) => {
        this.dialogRef.close({ error: "Ha ocurrido un error de conexión. Inténtelo más tarde" });
      })
  }

}

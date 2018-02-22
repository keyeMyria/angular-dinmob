import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { InstitucionCreditoService } from '../../../services/institucion-credito.service';

@Component({
  selector: 'app-agregar-instituto-credito-dialogo',
  templateUrl: './agregar-instituto-credito-dialogo.component.html',
  styleUrls: ['./agregar-instituto-credito-dialogo.component.scss']
})
export class AgregarInstitutoCreditoDialogoComponent implements OnInit {
  form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AgregarInstitutoCreditoDialogoComponent>,
    private fb: FormBuilder,
    private institucionSrv: InstitucionCreditoService
  ) {
    this.form = this.fb.group({
      nombre: ["", Validators.required],
      color: ["", Validators.required]
    });
  }

  ngOnInit() {
  }

  guardar() {
    console.log("Institución", this.form.value);

    this.institucionSrv.createInstitucion(this.form.value)
      .subscribe(institucion => {
        this.data.instituciones.push(institucion);
        this.dialogRef.close(true);

      },
        (error) => {
          this.dialogRef.close({ error: "Ha ocurrido un error de conexión. Inténtelo más tarde" });
        });
  }



}

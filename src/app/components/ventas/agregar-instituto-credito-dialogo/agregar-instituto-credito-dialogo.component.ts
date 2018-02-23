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
  //form: FormGroup;
  // color = "#000;"
  insti = {
    nombre: "",
    color: "#ffffff"
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AgregarInstitutoCreditoDialogoComponent>,
    private fb: FormBuilder,
    private institucionSrv: InstitucionCreditoService
  ) {
    /*     this.form = this.fb.group({
          nombre: ["", Validators.required],
          color: ["", Validators.required]
        }); */
  }

  ngOnInit() {
  }

  guardar() {
    console.log("Institución", this.insti);

    this.institucionSrv.createInstitucion(this.insti)
      .subscribe(institucion => {
        this.data.instituciones.push(institucion);
        this.dialogRef.close(true);

      },
        (error) => {
          this.dialogRef.close({ error: "Ha ocurrido un error de conexión. Inténtelo más tarde" });
        });
  }

/*   colorChange(event) {
    console.log("colorChange", event);

  }
  colorSelect(event) {
    console.log("colorSelect", event);

  }
  colorToggleChange(event) {
    console.log("colorToggleChange", event);

  }
  colorInputChange(event) {
    console.log("colorInputChage", event);

  } */


}

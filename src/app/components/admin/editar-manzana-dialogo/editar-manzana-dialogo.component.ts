import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, FormArray, Validators, FormBuilder } from '@angular/forms';
import { ManzanasService } from '../../../services/manzanas.service';

@Component({
  selector: 'app-editar-manzana-dialogo',
  templateUrl: './editar-manzana-dialogo.component.html',
  styleUrls: ['./editar-manzana-dialogo.component.scss']
})
export class EditarManzanaDialogoComponent implements OnInit {
  form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<EditarManzanaDialogoComponent>,
    private fb: FormBuilder,
    private manzanaSrv: ManzanasService
  ) {
    this.form = this.fb.group({
      nombre: [data.manzana.nombre, Validators.required]
    });
  }

  ngOnInit() {
  }

  guardar() {
    //console.log("editar manzana", this.form.value);
    //console.log("manzana", this.data.manzana);

    this.manzanaSrv.updateManzana(this.data.manzana.id_manzana, this.form.value)
      .subscribe((manzana: any) => {

        this.data.manzana.nombre = manzana.nombre;
        this.dialogRef.close(true);

      }, (error) => {
        this.dialogRef.close({ error: "Ha ocurrido un error. Vuelva a intentarlo más tarde." });
      });

  }

}

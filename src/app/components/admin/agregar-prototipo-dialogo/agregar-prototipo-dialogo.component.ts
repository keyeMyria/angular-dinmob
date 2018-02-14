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

 
    let prototipo = { id_obra: this.data.obra.id_obra, nombre: this.form.get('nombre').value };

    //console.log("agregar prototipo", this.form.value);
    //console.log("prototipo", prototipo);
    

    this.prototipoSrv.createPrototipo(prototipo)
      .subscribe(prototipo => {
        this.data.prototipos.push(prototipo);
        this.dialogRef.close(true);

      }, (error) => {
        this.dialogRef.close({ error: "Ha ocurrido un error de conexión. Inténtelo más tarde" });
      })


  }

}

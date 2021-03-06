import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TrabajadorService } from '../../../services/trabajador.service';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';

@Component({
  selector: 'app-nuevo-trabajador-dialogo',
  templateUrl: './nuevo-trabajador-dialogo.component.html',
  styleUrls: ['./nuevo-trabajador-dialogo.component.scss']
})
export class NuevoTrabajadorDialogoComponent implements OnInit {
  numberMask = createNumberMask({
    allowDecimal: true,
    prefix: '',
    decimalLimit: 2,
  });
  form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<NuevoTrabajadorDialogoComponent>,
    private fb: FormBuilder,
    private trabajadorSrv: TrabajadorService
  ) {
    this.form = this.fb.group({

      nombre: ["", Validators.required],
      id_especialidad: ["", Validators.required],
      retencion: ["", Validators.required],
      id_obra: [data.obra.id_obra, Validators.required],

    });
  }

  ngOnInit() {
  }

  guardar() {
    /* console.log("ok", this.form.value); */
    this.trabajadorSrv.createTrabajador(this.form.value)
      .subscribe(trabajador => {
        this.data.trabajadores.push(trabajador);
        this.dialogRef.close(true);

      },
        (error) => {
          this.dialogRef.close({ error: "Ha ocurrido un error de conexión. Inténtelo más tarde" });
        });

  }

}

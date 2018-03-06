import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import { TrabajadorService } from '../../../services/trabajador.service';

@Component({
  selector: 'app-editar-trabajador-dialogo',
  templateUrl: './editar-trabajador-dialogo.component.html',
  styleUrls: ['./editar-trabajador-dialogo.component.scss']
})
export class EditarTrabajadorDialogoComponent implements OnInit {
  numberMask = createNumberMask({
    allowDecimal: true,
    prefix: '',
    decimalLimit: 2,
  });
  form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<EditarTrabajadorDialogoComponent>,
    private fb: FormBuilder,
    private trabajadorSrv: TrabajadorService
  ) {
    this.form = this.fb.group({

      nombre: [data.trabajador.nombre, Validators.required],
      id_especialidad: [data.trabajador.id_especialidad, Validators.required],
      retencion: [data.trabajador.retencion, Validators.required],


    });
  }

  ngOnInit() {
  }

  guardar() {
    console.log("ok", this.form.value);

    this.trabajadorSrv.updateTrabajador(this.data.trabajador.id_trabajador, this.form.value)
      .subscribe(trabajador => {

        let i = this.data.trabajadores.indexOf(this.data.trabajador);
        this.data.trabajadores[i] = trabajador;
        this.dialogRef.close(true);

      },
        (error) => {
          this.dialogRef.close({ error: "Ha ocurrido un error. Vuelva a intentarlo más tarde." });
        });
  }


}






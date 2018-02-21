import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';

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
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({

      nombre: [data.trabajador.nombre, Validators.required],
      especialidad: [data.trabajador.id_especialidad, Validators.required],
      retencion: [data.trabajador.retencion, Validators.required],
      obra: ["", Validators.required],

    });
  }

  ngOnInit() {
  }

  guardar() {
    console.log("ok", this.form.value);
  }

}






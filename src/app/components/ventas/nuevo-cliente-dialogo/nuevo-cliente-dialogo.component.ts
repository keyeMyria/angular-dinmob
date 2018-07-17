import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';

@Component({
  selector: 'app-nuevo-cliente-dialogo',
  templateUrl: './nuevo-cliente-dialogo.component.html',
  styleUrls: ['./nuevo-cliente-dialogo.component.scss']
})
export class NuevoClienteDialogoComponent implements OnInit {


  form: FormGroup;

  numberMask = createNumberMask({
    allowDecimal: true,
    prefix: '',
    decimalLimit: 2,
  });


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<NuevoClienteDialogoComponent>,
    private fb: FormBuilder,
  ) {

    this.form = this.fb.group({
      nombre: [null, Validators.required],
      valor_operacion:"",
      fecha_entrega:""

    });

  }

  ngOnInit() {
  }

  guardar() {
    console.log("form", this.form.value);
    
    this.dialogRef.close("guardar");
  }

}

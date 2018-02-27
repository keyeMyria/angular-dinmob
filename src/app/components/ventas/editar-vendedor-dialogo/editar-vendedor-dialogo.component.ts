import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-editar-vendedor-dialogo',
  templateUrl: './editar-vendedor-dialogo.component.html',
  styleUrls: ['./editar-vendedor-dialogo.component.scss']
})
export class EditarVendedorDialogoComponent implements OnInit {
  form: FormGroup;
  public maskPhone = ['(', /\d/, /\d/, /\d/, ')', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<EditarVendedorDialogoComponent>,
    private fb: FormBuilder,
  ) {
    this.form = this.fb.group({
      nombre: [data.vendedor.nombre, Validators.required],
      email: [data.vendedor.email, Validators.required],
      telefono: [data.vendedor.telefono, Validators.required],
    });
  }

  ngOnInit() {
  }

  guardar() {
    console.log("datos", this.form.value);
  }

}

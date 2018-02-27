import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-crear-vendedor-dialogo',
  templateUrl: './crear-vendedor-dialogo.component.html',
  styleUrls: ['./crear-vendedor-dialogo.component.scss']
})
export class CrearVendedorDialogoComponent implements OnInit {
  form: FormGroup;
  public maskPhone = ['(', /\d/, /\d/, /\d/, ')', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<CrearVendedorDialogoComponent>,
    private fb: FormBuilder,
  ) {
    this.form = this.fb.group({
      nombre: ["", Validators.required],
      email: ["", Validators.required],
      telefono: ["", Validators.required],
    });
  }

  ngOnInit() {
  }

  guardar() {
    console.log("datos", this.form.value);
  }

}

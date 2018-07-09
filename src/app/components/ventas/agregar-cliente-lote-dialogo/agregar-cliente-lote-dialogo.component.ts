import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, FormArray, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-agregar-cliente-lote-dialogo',
  templateUrl: './agregar-cliente-lote-dialogo.component.html',
  styleUrls: ['./agregar-cliente-lote-dialogo.component.scss']
})
export class AgregarClienteLoteDialogoComponent implements OnInit {
  public maskPhone = ['(', /\d/, /\d/, /\d/, ')', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  form: FormGroup;
  tab_selected: string = "Cliente";

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AgregarClienteLoteDialogoComponent>,
    private fb: FormBuilder,
  ) {
    this.form = this.fb.group({
      //persona fisica
      persona_moral: ["0", Validators.required],
      nombre: ["", Validators.required],
      celular_persona_fisica: null,
      email_persona_fisica: null,


      //persona moral
      telefono_persona_moral: null,
      email_persona_moral: null,

    });
  }

  ngOnInit() {
  }

  guardarGenerales() {
    console.log("guardar datos generales", this.tab_selected);
    console.log(this.form.value);

  }

}

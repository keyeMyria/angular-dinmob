import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import * as moment from 'moment';



@Component({
  selector: 'app-agregar-vendedor-equipo-dialogo',
  templateUrl: './agregar-vendedor-equipo-dialogo.component.html',
  styleUrls: ['./agregar-vendedor-equipo-dialogo.component.scss']
})
export class AgregarVendedorEquipoDialogoComponent implements OnInit {
  form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AgregarVendedorEquipoDialogoComponent>,
    private fb: FormBuilder,
  ) {
    this.form = this.fb.group({
      id_vendedor: [null, Validators.required],

    });
  }

  ngOnInit() {
  }

  guardar(){
    
  }


}

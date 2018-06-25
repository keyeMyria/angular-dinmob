import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-agregar-vendedor-equipo-dialogo',
  templateUrl: './agregar-vendedor-equipo-dialogo.component.html',
  styleUrls: ['./agregar-vendedor-equipo-dialogo.component.scss']
})
export class AgregarVendedorEquipoDialogoComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AgregarVendedorEquipoDialogoComponent>,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
  }


}

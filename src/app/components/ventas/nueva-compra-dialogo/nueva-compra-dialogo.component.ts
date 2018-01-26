import { Component, OnInit, Inject } from '@angular/core';
import { ObrasService } from "app/services/obras.service";
import { FormGroup, FormControl, FormArray, Validators, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-nueva-compra-dialogo',
  templateUrl: './nueva-compra-dialogo.component.html',
  styleUrls: ['./nueva-compra-dialogo.component.scss']
})
export class NuevaCompraDialogoComponent implements OnInit {
  obras: any = [];
  lotes: any = [];
  obra: any = {
    datos: {}
  };
  obras_selected: any = {};
  form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<NuevaCompraDialogoComponent>,
    private fb: FormBuilder,
  ) {
    this.form = this.fb.group({
      obra_selected: ["", Validators.required],
      lote: ["", Validators.required]
    });
  }

  ngOnInit() {
    /*     this.obraSrv.loadFullObra(58)
        .subscribe(response => {
          this.obra = response;
          console.log("obra", this.obra);
        });
    
      this.obraSrv.getObrasUsuario(18)
        .subscribe(response => {
          this.obras = response;
        }); */


  }

  guardar() {

    console.log("nuevo pago", this.form.value);

  }

}

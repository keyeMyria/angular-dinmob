import { Component, OnInit, Inject } from '@angular/core';
import { ObrasService } from "app/services/obras.service";
import { FormGroup, FormControl, FormArray, Validators, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ClientesService } from 'app/services/clientes.service';

@Component({
  selector: 'app-nueva-compra-dialogo',
  templateUrl: './nueva-compra-dialogo.component.html',
  styleUrls: ['./nueva-compra-dialogo.component.scss']
})
export class NuevaCompraDialogoComponent implements OnInit {
  loading: boolean = false;
  obras: any = [];
  manzanas: any = [];
  obra: any = {
    datos: {}
  };
  obras_selected: any = {};
  form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<NuevaCompraDialogoComponent>,
    private fb: FormBuilder,
    private obraSrv: ObrasService,
    private clienteSrv: ClientesService
  ) {
    this.form = this.fb.group({
      obra: ["", Validators.required],
      lote: ["", Validators.required]
    });
  }

  ngOnInit() {
  }

  cargarObra(id_obra) {

    console.log("cargar obra", id_obra);

    if (id_obra) {
      this.loading = true;
      this.obraSrv.getLotesEnVentaLibres(id_obra)
        .subscribe(obra => {
          console.log("getLotes", obra.manzanas);
          this.manzanas = obra.manzanas;
          this.loading = false;
        }, (error) => {
          this.loading = false;
        });

    } else {
      this.manzanas = [];
    }



  }


  guardar() {

    console.log("nuevo pago", this.form.value);

    this.clienteSrv.asociarClienteLote(this.data.id_cliente, this.form.value.lote)
      .subscribe(compra => {

        console.log("compra", compra);

        this.data.compras.push(compra);
        this.dialogRef.close(true);


      }, (error) => {

        this.dialogRef.close(error);
      });

  }

}

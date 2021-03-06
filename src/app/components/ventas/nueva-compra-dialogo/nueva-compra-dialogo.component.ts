
import {map} from 'rxjs/operators';
import { Component, OnInit, Inject } from '@angular/core';
import { ObrasService } from "app/services/obras.service";
import { FormGroup, FormControl, FormArray, Validators, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ClientesService } from 'app/services/clientes.service';
import { Observable } from 'rxjs';

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
      lote: ["", Validators.required, this.checkAsignadoYCancelado.bind(this)]
    });
  }

  ngOnInit() {
  }

  cargarObra(id_obra) {

    console.log("cargar obra", id_obra);

    if (id_obra) {
      //this.loading = true;
      this.obraSrv.getLotesEnVentaLibres(id_obra)
        .subscribe((obra: any) => {
          //console.log("getLotes", obra.manzanas);
          this.manzanas = obra.manzanas;
          //this.loading = false;
        }, (error) => {
          //this.loading = false;
        });

    } else {
      this.manzanas = [];
    }



  }

  checkAsignadoYCancelado(control: FormControl) {

    return this.clienteSrv.validarCompra(this.data.id_cliente, control.value).pipe(

      map((res: any) => {
        if (!res.disponible) {
          return { nodisponible: true };
        }

        return null;

      }));

  }


  guardar() {

    //console.log("nuevo compra", this.form.value);
    this.loading = true;
    this.clienteSrv.addCompra(this.data.id_cliente, this.form.value.lote)
      .subscribe((compra: any) => {

        console.log("compra", compra);
        this.loading = false;
        this.data.compras.push(compra);
        this.dialogRef.close(true);



      }, (error) => {
        this.loading = false;

        this.dialogRef.close({ error: "Ha ocurrido un error de conexión. Inténtelo más tarde" });
      });

  }

  debug() {
    console.log("formgroup", this.form);
    console.log("value", this.form.value);
    console.log("status", this.form.status);

  }

}

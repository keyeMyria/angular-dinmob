import { Component, OnInit } from '@angular/core';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import { FormGroup, FormControl, FormArray, Validators, FormBuilder } from '@angular/forms';
import * as moment from 'moment';
import { ActivatedRoute, Router } from '@angular/router';
import { EntradasService } from 'app/services/entradas.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-editar-entrada',
  templateUrl: './editar-entrada.component.html',
  styleUrls: ['./editar-entrada.component.scss']
})
export class EditarEntradaComponent implements OnInit {
  numberMask = createNumberMask({
    allowDecimal: true,
    prefix: '',
    decimalLimit: 2
  });
  form: FormGroup;
  entrada: any;
  proveedores: any = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private entradaSrv: EntradasService,
    private route: ActivatedRoute,
    public snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      id_proveedor: ["", Validators.required],
      fecha: [moment("", "YYYY-MM-DD"), Validators.required],
      folio: ["", Validators.required],
      total: ["", Validators.required],
      al_contado: ["", Validators.required],
      es_factura: ["", Validators.required],
      nota: [""]
    });
  }

  ngOnInit() {

    this.route.data
      .subscribe((data: { proveedores: any }) => {
        this.proveedores = data.proveedores;
      });

    let id = this.route.snapshot.paramMap.get('id');
    this.entradaSrv.getEntrada(id)
      .subscribe(entrada => {
        console.log("entrada OK", entrada);
        this.entrada = entrada;
        this.form.patchValue(this.entrada.datos);
      });
  }

  guardar() {
    console.log("datos", this.form.value);
    this.form.value.total = this.form.value.total.replace(/,/g, "");
    this.entradaSrv.editarEntrada(this.entrada.datos.id_entrada, this.form.value)
      .subscribe(entrada => {
        this.entrada = entrada;
        this.form.patchValue(this.entrada.datos);

        this.snackBar.open("Datos actualizados", "", {
          duration: 2000,
          panelClass: ["bg-success", "text-white"]
        });

      }, (error) => {

        this.snackBar.open("Ha ocurrido un error de conexión. Inténtelo más tarde", "", {
          duration: 3000,
          panelClass: ["bg-danger", "text-white"]
        });

      });
  }

}

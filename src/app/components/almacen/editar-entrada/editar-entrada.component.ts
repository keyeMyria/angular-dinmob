import { Component, OnInit } from '@angular/core';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import { FormGroup, FormControl, FormArray, Validators, FormBuilder } from '@angular/forms';
import * as moment from 'moment';
import { ActivatedRoute, Router } from '@angular/router';
import { EntradasService } from 'app/services/entradas.service';

@Component({
  selector: 'app-editar-entrada',
  templateUrl: './editar-entrada.component.html',
  styleUrls: ['./editar-entrada.component.scss']
})
export class EditarEntradaComponent implements OnInit {
  numberMask = createNumberMask({
    allowDecimal: true
  });
  form: FormGroup;
  entrada: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private entradaSrv: EntradasService,
    private route: ActivatedRoute,
  ) {
    this.form = this.fb.group({
      proveedor: ["", Validators.required],
      fecha: [moment("", "YYYY-MM-DD"), Validators.required],
      folio: ["", Validators.required],
      total: ["", Validators.required],   
      al_contado: ["", Validators.required],  
      es_factura: ["", Validators.required],  
    });
  }

  ngOnInit() {
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
  }

}

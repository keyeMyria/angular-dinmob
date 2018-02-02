import { Component, OnInit } from '@angular/core';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import { FormGroup, FormControl, FormArray, Validators, FormBuilder } from '@angular/forms';
import * as moment from 'moment';
import { ActivatedRoute, Router } from '@angular/router';

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

  constructor(
    private fb: FormBuilder,
    private router: Router,
  ) {
    this.form = this.fb.group({
      proveedor: ["", Validators.required],
      fecha_entrada: [moment("", "YYYY-MM-DD"), Validators.required],
      folio: ["", Validators.required],
      total: ["", Validators.required],
      forma_pago: ["", Validators.required],
      documento: ["", Validators.required],
    });
  }

  ngOnInit() {
  }

  guardar() {
    console.log("pago", this.form.value);
  }

  gotoEntradas(){
    this.router.navigate(["/entradas"]);
  }

}

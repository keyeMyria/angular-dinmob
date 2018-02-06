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

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private entradaSrv: EntradasService
  ) {
    this.form = this.fb.group({
      proveedor: [null, Validators.required],
      fecha_entrada: [moment(null, "YYYY-MM-DD"), Validators.required],
      folio: [null, Validators.required],
      total: [null, Validators.required],
      forma_pago: [null, Validators.required],
      documento: [null, Validators.required],
    });
  }

  ngOnInit() {
  }

  guardar() {
    console.log("datos", this.form.value);
  }

  gotoEntradas(){
    this.router.navigate(["/entradas"]);
  }

}

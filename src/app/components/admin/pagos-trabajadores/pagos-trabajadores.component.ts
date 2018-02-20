import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import { FormGroup, FormControl, FormArray, Validators, FormBuilder } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-pagos-trabajadores',
  templateUrl: './pagos-trabajadores.component.html',
  styleUrls: ['./pagos-trabajadores.component.scss']
})
export class PagosTrabajadoresComponent implements OnInit {
  numbermask = createNumberMask({
    allowDecimal: true,
    prefix: '',
    decimalLimit: 2
  });

  obras: any = [];
  obra_selected: string = "";
  form: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
  ) {
    this.form = this.fb.group({

      obra: ["", Validators.required],
      trabajador: ["", Validators.required],
      fecha_inicio: [moment(), Validators.required],
      fecha_fin: [moment(), Validators.required],
      inicio_obra: [""],
      trabajador_nuevo_pago: ["", Validators.required],
      pago: ["", Validators.required],
      fecha_pago: [moment(), Validators.required],
      nota: [""],

    });
  }

  ngOnInit() {
    this.route.data
      .subscribe((data: { obras: any[] }) => {
        this.obras = data.obras;
      });
  }

  cargarObra(id_obra) {

    if (id_obra) {
      this.router.navigate([".", { obra: id_obra }]);
    } else {
      this.router.navigate([".", {}]);

    }

  }

}

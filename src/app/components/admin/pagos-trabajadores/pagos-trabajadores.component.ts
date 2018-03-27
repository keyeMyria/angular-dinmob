import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import { FormGroup, FormControl, FormArray, Validators, FormBuilder } from '@angular/forms';
import * as moment from 'moment';
import { TrabajadorService } from '../../../services/trabajador.service';
import { of } from "rxjs/observable/of";

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
  formNuevo: FormGroup;
  form: FormGroup;
  totales: any = {};
  trabajadores: any = [];
  historiales = [];
  avances = [];

  pagos = [
    { generado_neto: "5000", pagado: "1500", pendiente: "3500" }
  ];

  pagos_avances = [
    { generado: "5000", retenciones: "1500", liberaciones: "3500", generado_neto_avances: "5000" }
  ]


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private trabajadorSrv: TrabajadorService
  ) {
    this.formNuevo = this.fb.group({


      id_trabajador: [null, Validators.required],
      pago: [null, Validators.required],
      fecha_pago: [moment(null), Validators.required],
      nota: [null],
    });

    this.form = this.fb.group({
      obra: [null, Validators.required],
      trabajador_historial: [null, Validators.required],
      inicio_obra: null,
      fecha_inicio: [null],
      fecha_fin: [null, Validators.required]

    });
  }

  ngOnInit() {
    this.route.data
      .subscribe((data: { obras: any[] }) => {
        this.obras = data.obras;
      });

    this.route.paramMap
      .switchMap((params: ParamMap) => {
        if (params.has("obra")) {
          this.obra_selected = params.get("obra");
          return this.trabajadorSrv.getTrabajadoresObra(params.get("obra"));
        } else {
          return of([]);
        }
      }).subscribe(trabajadores => {
        this.trabajadores = trabajadores;
      }, (error) => {
      });
  }

  cargarObra(id_obra) {

    if (id_obra) {
      this.router.navigate([".", { obra: id_obra }]);
    } else {
      this.router.navigate([".", {}]);

    }

  }

  createPago() {
    console.log("Crear Pago", this.formNuevo.value)
  }

  getAvancesHistorial() {
    this.trabajadorSrv.avances(this.form.value.trabajador_historial, this.form.value.fecha_inicio, this.form.value.fecha_fin)
    .subscribe(res => {
      this.avances = res.avances;
      this.totales = res.total_avances;
      this.historiales = res.historial;
    });
    
  }

}

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import { FormGroup, FormControl, FormArray, Validators, FormBuilder } from '@angular/forms';
import * as moment from 'moment';
import { TrabajadorService } from '../../../services/trabajador.service';
import { of } from "rxjs/observable/of";
import { PagoTrabajadorService } from 'app/services/pago-trabajador.service';
import { MatSnackBar } from '@angular/material';

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
  total_avances: any = {};
  total_historial: any = {};
  trabajadores: any = [];
  historial = [];
  avances = [];
  tipos: any = [];

/*   pagos = [];
  pagos_avances = []; */


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private trabajadorSrv: TrabajadorService,
    private pagoTrabajadorSrv: PagoTrabajadorService,
    public snackBar: MatSnackBar
  ) {
    this.formNuevo = this.fb.group({


      id_trabajador: ["", Validators.required],
      id_tipo_pago: ["", Validators.required],
      pagado: [null, Validators.required],
      fecha_pago: [moment(), Validators.required],
      notas: [null],
    });

    this.form = this.fb.group({
      id_obra: [null, Validators.required],
      trabajador_historial: [null, Validators.required],
      inicio_obra: [false],
      fecha_inicio: [moment(), Validators.required],
      fecha_fin: [moment(), Validators.required]

    });

    this.form.controls["inicio_obra"].valueChanges
      .subscribe((value) => {
        //console.log("valueChanges", value);

        if (value == true) {
          this.form.controls["fecha_inicio"].disable();

        } else {/* false*/
          this.form.controls["fecha_inicio"].enable();

        }

      });



  }

  ngOnInit() {
    this.route.data
      .subscribe((data: { obras: any[], tipos: any[] }) => {
        this.obras = data.obras;
        this.tipos = data.tipos;
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
    //console.log("Crear Pago", this.formNuevo.value)
    this.pagoTrabajadorSrv.createPagoTrabajador(this.formNuevo.value)
      .subscribe(pago => {
        console.log("Pago id:", pago);
        this.snackBar.open("Gasto Eliminado", "", {
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

  getAvancesHistorial() {

    //console.log("get avances", this.form.value);


    this.trabajadorSrv.getAvances(this.form.value.id_obra, this.form.value.inicio_obra, this.form.value.trabajador_historial, this.form.value.fecha_inicio, this.form.value.fecha_fin)
      .subscribe(res => {
        this.avances = res.avances;
        this.total_avances = res.total_avances;
        this.total_historial = res.total_historial;
        this.historial = res.historial;
      });

  }

}

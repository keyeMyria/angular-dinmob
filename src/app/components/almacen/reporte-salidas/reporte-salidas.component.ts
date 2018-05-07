import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators, FormBuilder } from '@angular/forms';
import * as moment from 'moment';
import { log } from 'util';
import { ObrasService } from '../../../services/obras.service';

@Component({
  selector: 'app-reporte-salidas',
  templateUrl: './reporte-salidas.component.html',
  styleUrls: ['./reporte-salidas.component.scss']
})
export class ReporteSalidasComponent implements OnInit {
  obras: any = [];
  obra_selected: string = "";
  insumo_selected: string = "";
  lote_selected: string = "";
  form: FormGroup;
  toda_obra_selected: any;
  insumos: any;
  manzanas: any;
  datos_obra: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private obrasSrv: ObrasService
  ) {
    this.form = this.fb.group({
      id_obra: [null],
      fecha_ini: [moment(), Validators.required],
      fecha_fin: [moment(), Validators.required],
      inicio_obra: [null],
      obra: [null],
      insumo: [null],
      todo_insumo: [false],
      toda_obra: [false]
    });

    this.desableSelect("todo_insumo", "insumo");
    this.desableSelect("toda_obra", "obra");
    this.desableSelect("inicio_obra", "fecha_ini");
  }

  ngOnInit() {
    this.route.data
      .subscribe((data: { obras: any[], tipos: any }) => {
        this.obras = data.obras;

      });
  }

  desableSelect(check, control) {
    this.form.controls[check].valueChanges
      .subscribe((value) => {

        if (value) {
          this.form.controls[control].disable();
        } else {
          this.form.controls[control].enable();
        }

      });
  }

  cargarObra(id_obra) {

    if (id_obra) {
      this.router.navigate([".", { obra: id_obra }]);
    } else {
      this.router.navigate([".", {}]);

    }

  }

  getReporteSalidas() {

  }

  getManzanasMateriales(id_obra) {
    if (id_obra) {
      this.obrasSrv.getManzanasMateriales(this.obra_selected)
        .subscribe((res: any) => {
          this.insumos = res.insumos;
          this.manzanas = res.manzanas;
          this.datos_obra = res.obra;
        });
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators, FormBuilder } from '@angular/forms';
import * as moment from 'moment';
import { NullAstVisitor } from '@angular/compiler';
import { ObrasService } from '../../../services/obras.service';

@Component({
  selector: 'app-reporte-entradas',
  templateUrl: './reporte-entradas.component.html',
  styleUrls: ['./reporte-entradas.component.scss']
})
export class ReporteEntradasComponent implements OnInit {
  obras: any = [];
  obra_selected: string = "";
  form: FormGroup;
  insumo_selected: string = "";
  insumos: any;
  manzanas: any;
  entradas: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private obrasSrv: ObrasService
  ) {
    this.form = this.fb.group({
      id_obra: [null],
      fecha_ini: [moment()],
      fecha_fin: [moment()],
      inicio_obra: [null],
      todo_insumo: [null],
      insumo: [null]

    });

    this.desableSelect("todo_insumo", "insumo");
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

  getManzanasMateriales(id_obra) {
    if (id_obra) {
      this.obrasSrv.getManzanasMateriales(this.obra_selected)
        .subscribe((res: any) => {
          this.insumos = res.insumos;
          this.manzanas = res.manzanas;
        });
    }
  }

  getReporteEntradas() {
    console.log("entradas", this.form.value);

  }

  getManzanasTrabajadores(id_obra) {

  }

}
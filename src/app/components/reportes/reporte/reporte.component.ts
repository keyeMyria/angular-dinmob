import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ObrasService } from '../../../services/obras.service';
import { SelectionModel } from '@angular/cdk/collections';
import * as moment from 'moment';
import { ReporteService } from '../../../services/reporte.service';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.scss']
})
export class ReporteComponent implements OnInit {

  form: FormGroup;
  obras: any = [];
  obra_selected: string = "";
  tipos: any = [];
  tipo_selected: string = "";
  ambito_selected: string = "";
  trabajadores: any = [];
  manzanas: any = [];
  ultimo_avance: string = "";
  ultimo_pago: string = "";

  //selector de clientes
  selection_trabajadores = new SelectionModel<any>(true);
  selection_lotes = new SelectionModel<any>(true);

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private obrasSrv: ObrasService,
    private route: ActivatedRoute,
    private reporteSrv: ReporteService
  ) {
    this.form = this.fb.group({
      id_obra: [null, Validators.required],
      reporte: [null, Validators.required],
      ambito: [null, Validators.required],
      inicio_obra: [null, Validators.required],
      fecha_ini: [moment(), Validators.required],
      fecha_fin: [moment(), Validators.required]

    });
  }

  ngOnInit() {
    this.route.data
      .subscribe((data: { obras: any[], tipos: any }) => {
        this.obras = data.obras;
        this.tipos = data.tipos;
      });
  }

  cargarObra(id_obra) {

    if (id_obra) {
      this.router.navigate([".", { obra: id_obra }]);
    } else {
      this.router.navigate([".", {}]);

    }

  }

  getManzanasTrabajadores(id_obra) {
    this.trabajadores = [];
    this.manzanas = [];
    if (id_obra != "") {
      this.obrasSrv.getManzanasTrabajadores(id_obra)
        .subscribe(res => {
          this.trabajadores = res.trabajadores;
          this.manzanas = res.manzanas;
          this.ultimo_avance = res.ultimo_avance;
          this.ultimo_pago = res.ultimo_pago;
        });
    }
  }

  showLotes() {
    console.log("Lotes seleccionados:", this.selection_lotes.selected);
  }

  showTrabajadores() {
    console.log("Trabajadores seleccionados:", this.selection_trabajadores.selected);
  }

  reporte(url) {
    let link = document.createElement("a");
    link.href = url;
    link.target = "_blank";
    link.click();
  }

  getReporte() {
    let url = '';
    switch (this.tipo_selected) {
      case "ACU":
        url = this.reporteSrv.getUrlReporteAcumulado(this.form.get("id_obra").value, this.form.get("fecha_ini").value, this.form.get("fecha_fin").value, this.form.get("inicio_obra").value);
        this.reporte(url);
        break;
      case "AVN":
        console.log("AVN");
        break;
      case "ENT":
        url = this.reporteSrv.getUrlReporteEntradas(this.form.get("id_obra").value, this.form.get("fecha_ini").value, this.form.get("fecha_fin").value, this.form.get("inicio_obra").value);
        this.reporte(url);
        break;
      case "HPT":
        let ids = '';
        this.selection_trabajadores.selected.forEach(trabajador => {
          ids += trabajador.id_trabajador + '_';
        });
        ids = ids.substr(0, ids.length - 1);
        url = this.reporteSrv.getUrlReporteHistorial(ids);
        this.reporte(url);
        break;
      case "INV":
        url = this.reporteSrv.getUrlReporteInventario(this.form.get("id_obra").value);
        this.reporte(url);
        break;
      case "PAT":
        console.log("PAT");
        break;
      case "SAL":
        url = this.reporteSrv.getUrlReporteSalidas(this.form.get("id_obra").value, this.form.get("fecha_ini").value, this.form.get("fecha_fin").value, this.form.get("inicio_obra").value);
        this.reporte(url);
        break;

      default:
        console.log("Seleccione un tipo de reporte");
    }
  }

}

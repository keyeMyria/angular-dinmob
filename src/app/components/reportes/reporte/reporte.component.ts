import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ObrasService } from '../../../services/obras.service';
import { SelectionModel } from '@angular/cdk/collections';
import * as moment from 'moment';
import { ReporteService } from '../../../services/reporte.service';
import * as FileSaver from "file-saver";

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
      inicio_obra: [false],
      fecha_ini: [moment(), Validators.required],
      fecha_fin: [moment(), Validators.required]

    });

    this.form.controls["inicio_obra"].valueChanges
      .subscribe((value) => {
        //console.log("valueChanges", value);

        if (value == true) {
          this.form.controls["fecha_ini"].disable();

        } else {/* false*/
          this.form.controls["fecha_ini"].enable();

        }

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
        .subscribe((res:any) => {
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
    let trabajadores = [];
    let lotes = [];
    let date = new Date().toDateString();
    switch (this.tipo_selected) {
      case "ACU":
        this.reporteSrv.getReporteAcumulado(this.form.get("id_obra").value, this.form.get("fecha_ini").value, this.form.get("fecha_fin").value, this.form.get("inicio_obra").value)
          .subscribe(data => this.downloadFile(data, `ReporteAcumulado_${date}`));

        break;
      case "AVN":

        trabajadores = [];
        this.selection_trabajadores.selected.forEach(trabajador => {
          trabajadores.push(trabajador.id_trabajador);
        });

        lotes = [];
        this.selection_lotes.selected.forEach(lote => {
          lotes.push(lote.id_lote);
        });

        this.reporteSrv.getReporteAvances(this.form.get("id_obra").value, this.form.get("fecha_ini").value, this.form.get("fecha_fin").value, this.form.get("inicio_obra").value, this.form.get("ambito").value, lotes, lotes)
          .subscribe(data => this.downloadFile(data, `ReporteEntradas_${date}`));
        break;
      case "ENT":
        this.reporteSrv.getReporteEntradas(this.form.get("id_obra").value, this.form.get("fecha_ini").value, this.form.get("fecha_fin").value, this.form.get("inicio_obra").value)
          .subscribe(data => this.downloadFile(data, `ReporteEntradas_${date}`));

        break;
      case "HPT":
        trabajadores = [];
        this.selection_trabajadores.selected.forEach(trabajador => {
          trabajadores.push(trabajador.id_trabajador);
        });

        this.reporteSrv.getReporteHistorial(this.form.get("id_obra").value, trabajadores)
          .subscribe(data => this.downloadFile(data, `ReporteHistorialPagos_${date}`));
        break;
      case "INV":
        this.reporteSrv.getReporteInventario(this.form.get("id_obra").value)
          .subscribe(data => this.downloadFile(data, `ReporteInventario_${date}`));
        break;
      case "PAT":
        console.log("PAT");
        break;
      case "SAL":
        this.reporteSrv.getReporteSalidas(this.form.get("id_obra").value, this.form.get("fecha_ini").value, this.form.get("fecha_fin").value, this.form.get("inicio_obra").value)
          .subscribe(data => this.downloadFile(data, `ReporteSalidas_${date}`));
        break;

      default:
        console.log("Seleccione un tipo de reporte");
    }
  }

  downloadFile(data, filename) {
    let contentType = "application/pdf";
    let blob = new Blob([data], { type: contentType });
    FileSaver.saveAs(blob, filename);
  }

}

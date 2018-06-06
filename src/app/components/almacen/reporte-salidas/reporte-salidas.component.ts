import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators, FormBuilder } from '@angular/forms';
import * as moment from 'moment';
import { log } from 'util';
import { ObrasService } from '../../../services/obras.service';
import { SalidasService } from '../../../services/salidas.service';

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


  otras_obras: any = [];
  paquetes: any = [];
  partidas: any = [];
  salidas: any = [];
  urbanizacion: any = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private obrasSrv: ObrasService,
    private salidaSrv: SalidasService
  ) {
    this.form = this.fb.group({
      id_obra: [null],
      fecha_ini: [moment(), Validators.required],
      fecha_fin: [moment(), Validators.required],
      inicio: [false],
      id_lote: [null],
      id_insumo: [null],
      all_insumos: [false],
      all_obra: [false]
    });

    this.disableSelect("all_insumos", "id_insumo");
    this.disableSelect("all_obra", "id_lote");
    this.disableSelect("inicio", "fecha_ini");
  }

  ngOnInit() {
    this.route.data
      .subscribe((data: { obras: any[], tipos: any }) => {
        this.obras = data.obras;
      });
  }

  disableSelect(check, control) {
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
    console.log("reporte", this.form.value);
    this.otras_obras = [];
    this.paquetes = [];
    this.partidas = [];
    this.salidas = [];
    this.urbanizacion = [];
    this.salidaSrv.getReporteSalidas(this.form.value)
      .subscribe(res => {
        this.otras_obras = res.otras_obras;
        this.paquetes = res.paquetes;
        this.partidas = res.partidas;
        this.salidas = res.salidas;
        this.urbanizacion = res.urbanizacion;

      }, (error) => {

      });
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

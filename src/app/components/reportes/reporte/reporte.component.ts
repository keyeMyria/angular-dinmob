import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ObrasService } from '../../../services/obras.service';
import { SelectionModel } from '@angular/cdk/collections';
import * as moment from 'moment';

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
    private route: ActivatedRoute, ) {
    this.form = this.fb.group({
      id_obra: [null, Validators.required],
      reporte: [null, Validators.required],
      ambito: [null, Validators.required],
      inicio_obra: [null, Validators.required],
      fecha_inicio: [moment(), Validators.required],
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

}

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators, FormBuilder } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-reporte-salidas',
  templateUrl: './reporte-salidas.component.html',
  styleUrls: ['./reporte-salidas.component.scss']
})
export class ReporteSalidasComponent implements OnInit {
  obras: any = [];
  obra_selected: string = "";
  form: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
  ) {
    this.form = this.fb.group({
      id_obra: [null, Validators.required],
      fecha_ini: [moment(), Validators.required],
      fecha_fin: [moment(), Validators.required],
      inicio_obra: [null, Validators.required],
      toda_obra: [null, Validators.required],
      todo_insumo: [null, Validators.required],

    });
  }

  ngOnInit() {
    this.route.data
      .subscribe((data: { obras: any[], tipos: any }) => {
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

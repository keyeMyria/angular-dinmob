import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ObrasService } from '../../../services/obras.service';

@Component({
  selector: 'app-materiales-ejecutar',
  templateUrl: './materiales-ejecutar.component.html',
  styleUrls: ['./materiales-ejecutar.component.scss']
})
export class MaterialesEjecutarComponent implements OnInit {
  obras: any = [];
  form: FormGroup;
  insumos: any;
  manzanas: any;
  datos_obra: any;
  pendientes: any = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private obrasSrv: ObrasService,
  ) {
    this.form = this.fb.group({
      id_obra: ["", Validators.required],
      id_lote: ["", Validators.required],
      id_insumo: ["", Validators.required],
      all_insumos: [true],
      all_obra: [true]
    });
    this.disableSelect("all_insumos", "id_insumo");
    this.disableSelect("all_obra", "id_lote");

    this.form.patchValue({ all_insumos: true, all_obra: true });
  }

  ngOnInit() {
    this.route.data
      .subscribe((data: { obras: any[], usuario: any }) => {
        this.obras = data.obras;
      });
  }

  getManzanasMateriales(id_obra) {
    if (id_obra) {
      this.obrasSrv.getManzanasMateriales(id_obra)
        .subscribe((res: any) => {
          this.insumos = res.insumos;
          this.manzanas = res.manzanas;
          this.datos_obra = res.obra;
        });
    }
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

  getReporteMateriales() {
    console.log("form", this.form.value);
    this.obrasSrv.getInsumosPendientes(this.form.get('id_obra').value, this.form.value)
      .subscribe(insumos => {
        this.pendientes = insumos;
      })

  }

}

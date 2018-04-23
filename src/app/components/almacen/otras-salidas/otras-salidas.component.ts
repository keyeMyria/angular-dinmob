import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators, FormBuilder } from '@angular/forms';
import { InsumoService } from 'app/services/insumo.service';
import { of } from "rxjs/observable/of";

@Component({
  selector: 'app-otras-salidas',
  templateUrl: './otras-salidas.component.html',
  styleUrls: ['./otras-salidas.component.scss']
})
export class OtrasSalidasComponent implements OnInit {
  obra_selected: string = "";
  obras: any = [];
  form: FormGroup;
  insumos: any[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private insumoSrv: InsumoService,
  ) {
    this.form = this.fb.group({
      obra: ["", Validators.required],
      lote: ["", Validators.required],
      partida: ["", Validators.required],
      vale: [""],
      entrega: [""],
      recibe: ["", Validators.required],
      autoriza: ["", Validators.required],
      notas: [""],

    });
  }

  ngOnInit() {
    this.route.data
      .subscribe((data: { obras: any[], proveedores: any }) => {
        this.obras = data.obras;
      });

      this.route.paramMap
      .switchMap((params: ParamMap) => {
        if (params.has("obra")) {
          this.obra_selected = params.get("obra");
          return this.insumoSrv.getMaterialesObra(params.get("obra"));
        } else {
          return of([]);
        }
      }).subscribe(insumos => {
        this.insumos = insumos
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

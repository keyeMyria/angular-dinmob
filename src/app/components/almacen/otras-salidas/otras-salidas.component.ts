import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators, FormBuilder } from '@angular/forms';
import { InsumoService } from 'app/services/insumo.service';
import { of } from "rxjs/observable/of";
import { AlertaDialogoComponent } from 'app/components/admin/alerta-dialogo/alerta-dialogo.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-otras-salidas',
  templateUrl: './otras-salidas.component.html',
  styleUrls: ['./otras-salidas.component.scss']
})
export class OtrasSalidasComponent implements OnInit {
  obra_selected: string = "";
  obras: any = [];
  form: FormGroup;
  /*   formInsumos: FormGroup; */
  insumos: any[] = [];
  residentes: any = [];
  trabajadores: any = [];
  manzanas: any = [];
  partidas_urbanizacion: any = [];
  obra: any = {};
  usuario: any = {};
  insumos_filtrados: any[] = [];


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private insumoSrv: InsumoService,
    public dialog: MatDialog,
  ) {
    this.form = this.fb.group({
      tipo: "O",
      obra: ["", Validators.required],
      lote: ["", Validators.required],
      partida: [{ value: "", disabled: true }, Validators.required],
      vale: [""],
      entrega: [""],
      recibe: ["", Validators.required],
      autoriza: ["", Validators.required],
      notas: [""],
    });

    /*    this.formInsumos= this.fb.group({
         insumos:this.fb.array([])
       }); */

    this.form.controls["tipo"].valueChanges
      .subscribe((value) => {
        //console.log("valueChanges", value);

        if (value == "O") {
          this.form.controls["partida"].disable();

          this.form.controls["obra"].enable();
          this.form.controls["lote"].enable();

        } else {/* U*/
          this.form.controls["obra"].disable();
          this.form.controls["lote"].disable();

          this.form.controls["partida"].enable();

        }

      });
  }

  ngOnInit() {
    this.route.data
      .subscribe((data: { obras: any[], obra: { obra: any, trabajadores: any, manzanas: any, residentes: any }, partidas_urbanizacion: any, usuario: any }) => {
        this.obras = data.obras;
        this.trabajadores = data.obra.trabajadores;
        this.residentes = data.obra.residentes;
        this.obra = data.obra.obra;
        this.manzanas = data.obra.manzanas;
        this.partidas_urbanizacion = data.partidas_urbanizacion;
        this.usuario = data.usuario;
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
        this.insumos = insumos;
        this.insumos_filtrados = this.insumos.slice();
        /*   this.insumos.forEach(insumo=> {
            (<FormArray>this.formInsumos.controls["insumos"]).push(new FormControl(insumo));
          }); */
      });
  }

  cargarObra(id_obra) {

    if (id_obra) {
      this.router.navigate([".", { obra: id_obra }]);
    } else {
      this.router.navigate([".", {}]);

    }

  }

  borrarFiltro(input_filtro) {
    //console.log("filtro", input_filtro.value);
    input_filtro.value = "";
    this.insumos_filtrados = this.insumos.slice();
  }

  aplicarFiltro(termino) {

    let min_termino = termino.toLowerCase();
    this.insumos_filtrados = this.insumos.filter(insumo => {
      let nombre = insumo.insumo.toLowerCase();
      return nombre.includes(min_termino);
    });
  }


  insumosConSalida($event, filtro) {

    //console.log("change", $event.checked);

    if ($event.checked == true) {
      this.insumos_filtrados = this.insumos.filter(insumo => insumo.salida > 0);
      filtro.value = '';
    } else {
      this.insumos_filtrados = this.insumos.slice();
    }

  }


  guardar() {
    console.log("guardar", this.form.value);

    let insumos_salida = this.insumos.filter(insumo => insumo.salida > 0);
    let insumos_errores = insumos_salida.filter(insumo => insumo.salida > insumo.existencias);

    if (insumos_salida.length > 0) {
      console.log("insumos", insumos_salida);
      console.log("errores", insumos_errores);

      if (insumos_errores.length == 0) {
        //guardar
      } else {
        this.dialog.open(AlertaDialogoComponent, {
          data: {
            title: "Corregir",
            content: "Las cantidades son incorrectas. La salida no puede ser mayor que las existencias.",
            icon: true
          },
          width: '400px',
        });
      }


    } else {
      this.dialog.open(AlertaDialogoComponent, {
        data: {
          title: "Corregir",
          content: "La salida que intenta crear no contiene ningún material.",
          icon: true
        },
        //width: '500px',
      });
    }
  }

}



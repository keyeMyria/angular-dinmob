import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators, FormBuilder } from '@angular/forms';
import { InsumoService } from 'app/services/insumo.service';
import { of } from "rxjs/observable/of";
import { AlertaDialogoComponent } from 'app/components/admin/alerta-dialogo/alerta-dialogo.component';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ObrasService } from '../../../services/obras.service';
import { SalidasService } from 'app/services/salidas.service';
import { AuthService } from '../../../services/auth.service';

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
  residentes: any = [];
  trabajadores: any = [];
  manzanas: any = [];
  partidas_urbanizacion: any = [];
  obra: any = {};
  usuario: any = {};
  insumos_filtrados: any[] = [];
  lote_selected: any = {};


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private insumoSrv: InsumoService,
    public dialog: MatDialog,
    private salidaSrv: SalidasService,
    private obraSrv: ObrasService,
    public snackBar: MatSnackBar,
    private authSrv: AuthService
  ) {

    this.form = this.fb.group({
      id_tipo_salida: ["O", Validators.required],
      id_obra_origen: ["", Validators.required],
      id_obra_destino: ["", Validators.required],
      id_lote: ["", Validators.required],
      id_salida_urbanizacion_partida: [{ value: "", disabled: true }, Validators.required],
      num_vale: [""],
      id_usuario_entrega: ["", Validators.required],
      id_trabajador_recibe: ["", Validators.required],
      id_usuario_autoriza: ["", Validators.required],
      notas: [""]
    });



    this.form.controls["id_tipo_salida"].valueChanges
      .subscribe((value) => {

        if (value == "O") {
          this.form.controls["id_salida_urbanizacion_partida"].disable();

          this.form.controls["id_obra_destino"].enable();
          this.form.controls["id_lote"].enable();

        } else {
          this.form.controls["id_obra_destino"].disable();
          this.form.controls["id_lote"].disable();

          this.form.controls["id_salida_urbanizacion_partida"].enable();

        }

      });
  }

  ngOnInit() {

    this.usuario = this.authSrv.usuario;

    this.route.data
      .subscribe((data: { obras: any[], obra: { obra: any, trabajadores: any, materiales: any, residentes: any }, partidas_urbanizacion: any, usuario: any }) => {
        this.obras = data.obras;
        this.trabajadores = data.obra.trabajadores;
        this.residentes = data.obra.residentes;
        this.obra = data.obra.obra;
        //this.manzanas = [];
        this.partidas_urbanizacion = data.partidas_urbanizacion;
        //this.usuario = data.usuario;

        this.initForm();

        this.insumos = data.obra.materiales;
        this.insumos_filtrados = this.insumos.slice();


      });

    this.obra_selected = this.route.snapshot.params["obra"] ? this.route.snapshot.params["obra"] : "";
  }

  initForm() {
    console.log("initForm");
    this.manzanas = [];

    this.insumos = [];
    this.insumos_filtrados = [];
    this.lote_selected = {};
    this.form.reset({
      id_tipo_salida: "O",
      id_obra_origen: this.obra.id_obra,
      id_obra_destino: "",
      id_lote: "",
      id_salida_urbanizacion_partida: "",
      id_usuario_entrega: this.usuario.id_usuario,
      id_trabajador_recibe: "",
      id_usuario_autoriza: ""
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

    let insumos_salida = this.insumos.filter(insumo => insumo.salida > 0);
    let insumos_errores = insumos_salida.filter(insumo => insumo.salida > insumo.existencias);

    console.log("guardar", this.form.value);
    console.log("insumos", insumos_salida);
    console.log("errores", insumos_errores);

    if (insumos_salida.length > 0) {

      if (insumos_errores.length == 0) {
        //guardar

        this.salidaSrv.createSalida(this.form.value, insumos_salida)
          .subscribe(res => {

            console.log("respuesta", res);
            this.initForm();

            this.insumos = res.materiales;
            this.insumos_filtrados = this.insumos.slice();

            this.snackBar.open("Salida Creada", "", {
              duration: 2000,
              panelClass: ["bg-success", "text-white"]
            });

          }, error => {

            this.snackBar.open("Ha ocurrido un error de conexión. Inténtelo más tarde", "", {
              duration: 3000,
              panelClass: ["bg-danger", "text-white"]
            });
          });


      } else {
        this.dialog.open(AlertaDialogoComponent, {
          data: {
            title: "Corregir",
            content: "Las cantidades son incorrectas. La salida no puede ser mayor que la existencia.",
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

  getLotesObra(id_obra) {

    if (id_obra != "") {
      console.log("getLotesObra", id_obra);

      this.obraSrv.getAcordeonManzanas(id_obra)
        .subscribe(obra => {
          //console.log("getLotes", obra.manzanas);
          this.manzanas = obra.manzanas;


        }, (error) => {

        });


    } else {
      console.log("seleccione una obra");

    }

  }

  debug() {
    console.log("form", this.form.value);

  }


}



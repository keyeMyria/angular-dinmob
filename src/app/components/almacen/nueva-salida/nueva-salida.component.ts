import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { MatDrawer, MatDialog } from '@angular/material';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import { MediaMatcher } from '@angular/cdk/layout';
import { ObrasService } from 'app/services/obras.service';
import { Observable } from 'rxjs/Observable';
import { LotesService } from 'app/services/lotes.service';
import { InsumoService } from 'app/services/insumo.service';
import { AlertaDialogoComponent } from 'app/components/admin/alerta-dialogo/alerta-dialogo.component';

@Component({
  selector: 'app-nueva-salida',
  templateUrl: './nueva-salida.component.html',
  styleUrls: ['./nueva-salida.component.scss']
})
export class NuevaSalidaComponent implements OnInit {

  @ViewChild(MatDrawer) drawer: MatDrawer;


  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  numbermask = createNumberMask({
    allowDecimal: true,
    prefix: '',
    decimalLimit: 2
  });

  form: FormGroup;
  obras: any = [];
  obra_selected: string = "";
  obra: any;
  partidas: any[] = [];
  partida_selected: string = "";
  lote_selected: any = {};
  insumos: any[] = [];
  residentes: any = [];
  trabajadores: any = [];
  manzanas: any = [];
  usuario: any = {};
  nombre_partida: string = "";
  insumos_filtrados: any[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private media: MediaMatcher,
    private changeDetectorRef: ChangeDetectorRef,
    private obraSrv: ObrasService,
    private loteSrv: LotesService,
    private insumoSrv: InsumoService,
    public dialog: MatDialog,
  ) {
    this.form = this.fb.group({
      partida: ["", Validators.required],
      entrega: ["", Validators.required],
      recibe: ["", Validators.required],
      autoriza: ["", Validators.required],
      num_vale: [""],
      notas: [""],
    });
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);



  }

  ngOnInit() {

    this.route.data
      .subscribe((data: { obras: any[], usuario: any, obra: { obra: any, trabajadores: any, manzanas: any, residentes: any } }) => {
        this.obras = data.obras;
        this.usuario = data.usuario;

        this.partida_selected = "";
        this.partidas = [];
        this.insumos = [];
        this.nombre_partida = "";
        this.obra = data.obra.obra;
        this.form.reset();

        this.trabajadores = data.obra.trabajadores;
        this.residentes = data.obra.residentes;
        this.manzanas = data.obra.manzanas;

        this.form.patchValue({entrega: this.usuario.id_usuario});

      });

    this.obra_selected = this.route.snapshot.params["obra"] ? this.route.snapshot.params["obra"] : "";


    /*     this.route.paramMap
          .switchMap((params: ParamMap) => {
            if (params.has("obra")) {
              this.obra_selected = params.get("obra");
              return this.obraSrv.getManzanasResidentesTrabajadores(params.get("obra"));
    
            } else {
              return Observable.of({ datos: {} });
            }
          }).subscribe(obra => {
            console.log("obra", obra);
    
            this.partida_selected = "";
            this.partidas = [];
            this.insumos = [];
            this.nombre_partida = "";
            this.obra = obra.obra;
            this.form.reset();
    
            this.trabajadores = obra.trabajadores;
            this.residentes = obra.residentes;
            this.manzanas = obra.manzanas;
          }); */
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


  cargarObra(id_obra) {

    if (id_obra) {
      this.router.navigate([".", { obra: id_obra }]);
    } else {
      //this.router.navigate([".", {}]);

    }

  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener)

  }

  getPartidasLote(lote) {
    console.log("getPartidasLote", lote);

    this.loteSrv.getPartidasLote(lote.id_lote)
      .subscribe(partidas => {
        this.partidas = partidas;
        this.lote_selected = lote;
      });
  }

  getInsumosPartida(id_partida) {
    if (id_partida != "") {
      this.insumoSrv.getPartidaSalida(id_partida, this.obra_selected, this.lote_selected.id_lote)
        .subscribe(insumos => {
          this.insumos = insumos;
          this.insumos_filtrados = this.insumos.slice();
          this.nombre_partida = this.partidas.find(partida => partida.id_partida == id_partida).nombre;
        });
    } else {
      this.insumos = [];
      this.nombre_partida = "";
    }
  }

  aplicarFiltro(termino) {
    let min_termino = termino.toLowerCase();
    this.insumos_filtrados = this.insumos.filter(insumo => {
      let nombre = insumo.insumo.toLowerCase();
      return nombre.includes(min_termino);
    });
  }

  borrarFiltro(input_filtro) {
    console.log("filtro", input_filtro.value);
    input_filtro.value = "";
    this.insumos_filtrados = this.insumos.slice();
  }

  insumosConSalida($event, filtro) {

    console.log("change", $event.checked);

    if ($event.checked == true) {
      this.insumos_filtrados = this.insumos.filter(insumos => insumos.salida > 0);
      filtro.value = "";
    } else {
      this.insumos_filtrados = this.insumos.slice();
    }



  }
  
  debug(){
    console.log("form", this.form.value);
    
  }


}

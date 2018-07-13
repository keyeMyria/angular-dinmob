
import { forkJoin as observableForkJoin, of } from 'rxjs';

import { switchMap } from 'rxjs/operators';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MapasService } from "app/services/mapas.service";
import 'jvectormap';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { MatDialog, MatSnackBar } from '@angular/material';
import { CurrencyPipe } from '@angular/common';
import { LotesService } from 'app/services/lotes.service';
import { MapasVentasConfigDialogoComponent } from 'app/components/ventas/mapas-ventas-config-dialogo/mapas-ventas-config-dialogo.component';
import { TIPO_MAPA } from '../../../constantes/tipo_mapa';
import { LoadingService } from '../../../services/loading.service';
import { ClientesLoteEscrituracionDialogoComponent } from '../clientes-lote-escrituracion-dialogo/clientes-lote-escrituracion-dialogo.component';


declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-mapas-escrituracion',
  templateUrl: './mapas-escrituracion.component.html',
  styleUrls: ['./mapas-escrituracion.component.scss'],
  providers: [CurrencyPipe]
})
export class MapasEscrituracionComponent implements OnInit, OnDestroy {


  //creamos estas propiedades como objetos para que cuando las
  //pasemos al diálogo se actualicen
  verLeyenda: any = { toggle: true };
  tipoMapa: any = { tipo: TIPO_MAPA.EstadoVenta };

  map: any;
  lote_selected: any = null;
  obra_selected: any = "";
  lotes: any = [];
  obras: any = [];
  jsonMap: any = {};
  scalePrototipos: any = {};
  scaleLoteTipo: any = {};
  scaleFormaPago: any = {};
  valuesPrototipos: any = {};
  valuesEstadosVenta: any = {};

  valuesFormaPago: any = {};
  valuesLoteTipo: any = {};

  constructor(
    private router: Router,
    private mapaSrv: MapasService,
    private loteSrv: LotesService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private currecyPipe: CurrencyPipe,
    private loading: LoadingService
  ) { }

  ngOnInit() {
    this.route.data
      .subscribe((data: { obras: any }) => {
        this.obras = data.obras;
      });



    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        let obra;

        if (params.has("index")) {

          //convertimos el string a int
          this.obra_selected = +params.get("index");
          obra = this.obras[params.get("index")];

          //unimos la consulta de los valores y el mapa
          return observableForkJoin(
            this.mapaSrv.getVentasLotesObra(obra.id_obra),
            this.mapaSrv.getMapaObra(obra.mapa)
          )



        } else if (params.has("obra")) {

          this.obra_selected = this.getIndexObra(params.get("obra"));

          obra = this.obras[this.obra_selected]; //this.getObra(this.obra_selected);

          //unimos la consulta de los valores y el mapa
          return observableForkJoin(
            this.mapaSrv.getVentasLotesObra(obra.id_obra),
            this.mapaSrv.getMapaObra(obra.mapa)
          )

        } else {
          return of([[], {}]);
        }

      })).subscribe((res: any) => {

        //console.log("respuesta", res);

        //activamos el loading spinner
        this.loading.start();

        this.lotes = res[0].lotes;
        this.scalePrototipos = res[0].scalePrototipos;
        this.scaleLoteTipo = res[0].scaleLotesTipo;
        this.scaleFormaPago = res[0].scaleFormasPago;
        this.jsonMap = res[1];

        //console.log("escala", this.scalePrototipos, this.scaleLoteTipo, this.scaleFormaPago);
        // el tipo que se mostrará primero es el de Ventas
        this.tipoMapa.tipo = TIPO_MAPA.EstadoVenta;


        //creamos los valores para la escala de estados
        this.valuesEstadosVenta = {};
        this.lotes.forEach(lote => {
          this.valuesEstadosVenta[lote.code] = lote.estado_venta;
        });

        //creamos los valores para la escala de prototipos
        this.valuesPrototipos = {};
        this.lotes.forEach(lote => {

          if (lote.prototipos && lote.prototipos.length > 0) {
            this.valuesPrototipos[lote.code] = lote.prototipos[0].nombre;
          } else {
            this.valuesPrototipos[lote.code] = "Ninguno";
          }

        });

        //creamos los valores para la escala de lote tipo
        this.valuesLoteTipo = {};
        this.lotes.forEach(lote => {
          this.valuesLoteTipo[lote.code] = lote.tipo;
        });

        //creamos los valores para la escala de forma pago
        this.valuesFormaPago = {};
        this.lotes.forEach(lote => {
          if (lote.forma_pago) {

            this.valuesFormaPago[lote.code] = lote.forma_pago;
          } else {
            this.valuesFormaPago[lote.code] = "Ninguna"
          }
        });


        if (this.jsonMap.mapa) {

          setTimeout(() => {
            this.crearMapa(this.valuesEstadosVenta, this.scalePrototipos, this.scaleFormaPago, this.scaleLoteTipo);
            this.loading.stop();
          }, 100);

        } else {
          this.loading.stop();
        }




      }, (error) => {

      });
  }

  cargarObra(id_obra) {

    //comparacion de tipo porque 0==""
    //console.log("cargar obra", id_obra);

    if (id_obra !== "") {
      this.router.navigate(["/escrituracion/mapas", { index: id_obra }]);
    } else {
      this.router.navigate(["/escrituracion/mapas", {}]);

    }

  }


  private getIndexObra(id_obra) {
    let op = this.obras.findIndex(obra => obra.id_obra == id_obra && obra.is_default == "1");
    if (op == -1) {
      op = this.obras.findIndex(obra => obra.id_obra == id_obra);
    }
    return op;
  }

  verClientes() {
    this.loteSrv.getDetallesLoteVentas(this.lote_selected.id_lote)
      .subscribe((res: any) => {

        let dialogRef = this.dialog.open(ClientesLoteEscrituracionDialogoComponent, {
          data: {
            lote: res.lote,
            clientes: res.clientes
          },
          width: "900px"
        });


      }, (error) => {
      });


  }

  ngOnDestroy() {
    if (this.map) {
      this.map.remove();
    }
  }


  toggleVerLeyenda(event) {
    //console.log("ver leyenda", event.checked);
    this.verLeyenda.toggle = event.checked;
    $(".jvectormap-legend-cnt.jvectormap-legend-cnt-v").toggleClass("d-none");
    //let items= $(".jvectormap-legend-cnt.jvectormap-legend-cnt-v");
    //console.log(items);


  }

  configMapa() {
    //console.log("configMapa");
    let dialogRef = this.dialog.open(MapasVentasConfigDialogoComponent, {
      data: {
        map: this.map,
        estadosVenta: this.valuesEstadosVenta,
        prototipos: this.valuesPrototipos,
        loteTipo: this.valuesLoteTipo,
        formaPago: this.valuesFormaPago,
        verLeyenda: this.verLeyenda,
        tipoMapa: this.tipoMapa

      },
      width: "400px"
    });

  }

  escalaPrototipos() {
    //console.log("asignacion de la escala de prototipos");
    // region 0 lotes
    // region 1 prototipos
    // region 2 texto
    this.map.series.regions[1].setValues(this.valuesPrototipos);
    this.tipoMapa.disabled = true;

  }

  escalaEstados() {
    //console.log("asignacion de la escala de estados");
    // region 0 lotes
    // region 1 prototipos
    // region 2 texto
    this.map.series.regions[0].setValues(this.valuesEstadosVenta);
    this.tipoMapa.disabled = false;

  }


  crearMapa(values, scalePrototipos, scaleFormaPago, scaleLoteTipo) {

    this.verLeyenda.toggle = true;


    //borramos el mapa si ya hemos creado alguno
    if (this.map) {
      //funcion de la API de jvectormap
      this.map.remove();
    }

    jQuery.fn.vectorMap('addMap', 'map', this.jsonMap.mapa);
    $("#map").vectorMap({
      map: 'map',
      backgroundColor: "transparent",
      zoomButtons: true,
      //regionsSelectable: true,
      //regionsSelectableOne: true,
      regionStyle: {
        initial: {
          fill: '#e4e4e4',
          "fill-opacity": 1,
          stroke: 'black',
          "stroke-width": 0.3,
          "stroke-opacity": 1
        }
      },

      focusOn: {
        scale: 1,
        x: 0.5,
        y: 0.5
      },

      markers: [],

      regionLabelStyle: {
        initial: {
          fill: 'black'
        },
        hover: {
          fill: 'red'
        }
      },

      series: {
        regions: [
          {
            values: values,
            scale: {
              'Libre': '#00a65a', //green
              'Apartado': '#f39c12', //amarillo     
              'Bloqueado': '#d81b60', //maroon 
              'Contrato': '#00c0ef', //aqua        
              'Escriturado': '#605ca8' //purple

            },
            legend: {
              vertical: true,
              title: 'Estado',
              labelRender: function (scale) {
                return scale;
              }
            }
          },
          {
            values: {},
            scale: scalePrototipos,
            legend: {
              vertical: true,
              title: 'Prototipos',
              labelRender: function (scale) {
                return scale;
              }
            }
          },
          {
            values: {},
            scale: scaleLoteTipo,
            legend: {
              vertical: true,
              title: 'Tipo Lote',
              labelRender: function (scale) {
                return scale;
              }
            }
          },
          {
            values: {},
            scale: scaleFormaPago,
            legend: {
              vertical: true,
              title: 'Forma Pago',
              labelRender: function (scale) {
                return scale;
              }
            }
          },
          {
            scale: {
              'Terreno': 'white',
              'Letras': 'black',
              "Info": "#17a2b8",//cyan
              "Verde": "#20c997",//teal
              'What': 'red'
            },
            attribute: 'fill',
            //las regiones que son texto
            values: this.jsonMap.texto
          }
        ]

      },

      onRegionTipShow: (e, tip, code) => {

        //console.log("regiontipshow", code);



        //buscamos el lote por id para acceder a sus propiedades
        let lote = this.lotes.find(lote => lote.code == code);
        if (lote !== undefined) {

          let tooltip = lote.manzana + " " + lote.nombre;

          tooltip += " <br> " + this.currecyPipe.transform(lote.valor_base);

          if (lote.metros_excedente != "0.00" && lote.precio_excedente != "0.00") {
            tooltip += " <br> Ex: " + this.currecyPipe.transform(lote.metros_excedente * lote.precio_excedente);
          }

          if (lote.fecha_entrega) {
            tooltip += " <br> Entrega: " + lote.fecha_entrega;
          }

          if (lote.prototipos) {
            for (let i = 0; i < lote.prototipos.length; i++) {
              tooltip += " <br> " + lote.prototipos[i].nombre;
            }
          }

          if (lote.tipo) {
            tooltip += " <br>" + lote.tipo;
          }

          if (lote.forma_pago != null) {
            tooltip += " <br> " + lote.forma_pago;
          }



          tip.html(tooltip);

        } else {

          // no encontramos el lote
          // evitamos que se muestre el tooltip
          e.preventDefault();
        }

      },

      onRegionClick: (e, code) => {

        this.lote_selected = this.lotes.find(lote => lote.code == code);
        //console.log("find on click", this.lote_selected);

      },


    });

    let items = $(".jvectormap-legend-cnt.jvectormap-legend-cnt-v .jvectormap-legend");
    //$(items[0]).removeClass("d-none");
    $(items[1]).addClass("d-none");
    $(items[2]).addClass("d-none");
    $(items[3]).addClass("d-none");

    this.map = $("#map").vectorMap('get', 'mapObject');


  }



}

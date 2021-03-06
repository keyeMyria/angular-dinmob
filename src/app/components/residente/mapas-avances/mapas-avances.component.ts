
import { forkJoin as observableForkJoin, of } from 'rxjs';

import { switchMap } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { MapasService } from "app/services/mapas.service";
import 'jvectormap';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { MatDialog, MatSnackBar } from '@angular/material';
import { PercentPipe } from '@angular/common';
import { ImagenesLotesDialogoComponent } from '../../ventas/imagenes-lotes-dialogo/imagenes-lotes-dialogo.component';
import { LotesService } from '../../../services/lotes.service';
import { AvancesLoteDialogoComponent } from '../avances-lote-dialogo/avances-lote-dialogo.component';
import { LoadingService } from 'app/services/loading.service';
import { MapasAvancesConfigDialogoComponent } from '../mapas-avances-config-dialogo/mapas-avances-config-dialogo.component';

declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-mapas-avances',
  templateUrl: './mapas-avances.component.html',
  styleUrls: ['./mapas-avances.component.scss'],
  providers: [PercentPipe]
})
export class MapasAvancesComponent implements OnInit {
  map: any;
  jsonMap: any = {};
  obras: any = [];
  obra_selected: any = "";
  lotes: any = [];
  lote_selected: any = null;
  //valuesLotes: any = {};
  valuesVentas: any = {};
  valuesDiscretosLotes: any = {};
  //variableContinua: boolean = true;

  scalePctAvance: any = {};
  scaleEstadoVenta: any = {};
  legendPctAvance: any = {};
  verLeyenda: any = { toggle: true };
  variableContinua: any = { toggle: false };


  constructor(
    private route: ActivatedRoute,
    private mapaSrv: MapasService,
    private router: Router,
    private percentPipe: PercentPipe,
    public dialog: MatDialog,
    private loteSrv: LotesService,
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
            this.mapaSrv.getAvancesLotesObra(obra.id_obra),
            this.mapaSrv.getMapaObra(obra.mapa)
          )


        } else if (params.has("obra")) {
          this.obra_selected = this.getIndexObra(params.get("obra"));
          obra = this.obras[this.obra_selected];

          //unimos la consulta de los valores y el mapa
          return observableForkJoin(
            this.mapaSrv.getAvancesLotesObra(obra.id_obra),
            this.mapaSrv.getMapaObra(obra.mapa)
          )

        } else {
          return of([[], {}]);
        }

      })).subscribe((res: any) => {

        this.loading.start();

        this.lotes = res[0].lotes;
        this.scalePctAvance = res[0].scalePctAvance;
        this.scaleEstadoVenta = res[0].scaleEstadoVenta;
        this.legendPctAvance = res[0].legendPctAvance;

        this.jsonMap = res[1];




        //creamos los valores para la escala de estados
        this.variableContinua.toggle = false;
        this.verLeyenda.toggle = true;
        //this.valuesLotes = {};
        this.valuesVentas = {};
        this.valuesDiscretosLotes = {};
        this.lotes.forEach(lote => {
          // comprobar luego con datos
          //this.valuesLotes[lote.code] = lote.valor ? lote.valor : 0;

          //escala ventas
          this.valuesVentas[lote.code] = lote.estado_venta;


          // escala personalizada
          this.valuesDiscretosLotes[lote.code] = lote.valor_discreto ? lote.valor_discreto : 1;
        });
        //console.log("values discretos", this.valuesDiscretosLotes);
        //console.log("values ventas", this.valuesVentas);





        if (this.jsonMap.mapa) {
          setTimeout(() => {
            this.crearMapa(this.valuesDiscretosLotes, this.scalePctAvance, this.legendPctAvance, this.scaleEstadoVenta);
            this.loading.stop();
          }, 100);
        } else {
          this.loading.stop();
        }

      }, (error) => {

      });
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
    let dialogRef = this.dialog.open(MapasAvancesConfigDialogoComponent, {
      data: {
        map: this.map,
        verLeyenda: this.verLeyenda,
        valuesDiscretosLotes: this.valuesDiscretosLotes,
        //valuesLotes: this.valuesLotes,
        valuesVentas: this.valuesVentas,
        variableContinua: this.variableContinua

      },
      width: "400px"
    });

  }


  crearMapa(values, scalePctAvance, legendPctAvance, scaleEstadoVenta) {



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
          /*  {
             values: {},
             scale: ['#C8EEFF', '#0071A4'],
             min: 0,
             max: 1,
             normalizeFunction: 'polynomial'
 
           }, */
          {
            values: {},
            scale: scaleEstadoVenta,
            legend: {
              vertical: true,
              title: 'Ventas',
              labelRender: function (scale) {
                return scale;
              }
            }
          },
          {
            values: values,
            scale: scalePctAvance,
            legend: {
              vertical: true,
              title: 'Avances',
              labelRender: function (scale) {
                return legendPctAvance[scale];
              }
            }
          },
          {
            scale: {
              'Terreno': 'white',
              'Letras': 'black',
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

          tooltip += "<br> " + lote.estado_venta;


          if (lote.prototipos) {
            for (let i = 0; i < lote.prototipos.length; i++) {
              tooltip += " <br> " + lote.prototipos[i].nombre;
            }
          }

          tooltip += " <br> Avance: " + (lote.ultimo_avance ? lote.ultimo_avance : "-");

          if (lote.fecha_entrega) {
            tooltip += " <br> Entrega: " + lote.fecha_entrega;
          }

          let num_partidas = lote.num_partidas ? lote.num_partidas : 0;

          tooltip += " <br> " + lote.num_partidas_fin + " de " + num_partidas + " partidas";

          tooltip += " <br> " + this.percentPipe.transform(lote.valor ? lote.valor : 0, "1.2-2");

          if (lote.responsable) {
            tooltip += "<br> " + lote.responsable;
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
    $(items[0]).addClass("d-none");

    this.map = $("#map").vectorMap('get', 'mapObject');


  }


  private getIndexObra(id_obra) {
    let op = this.obras.findIndex(obra => obra.id_obra == id_obra && obra.is_default == "1");
    if (op == -1) {
      op = this.obras.findIndex(obra => obra.id_obra == id_obra);
    }
    return op;
  }

  cargarObra(id_obra) {

    if (id_obra !== "") {
      this.router.navigate([".", { index: id_obra }]);
    } else {
      this.router.navigate([".", {}]);

    }

  }

  ngOnDestroy() {
    if (this.map) {
      this.map.remove();
    }
  }

  verImagenes() {


    this.loteSrv.getFotosAvances(this.lote_selected.id_lote)
      .subscribe(fotos => {

        //console.log("fotos", fotos);


        let dialogRef = this.dialog.open(ImagenesLotesDialogoComponent, {
          data: {
            fotos: fotos,
            lote: this.lote_selected
          },
          width: '700px',
          //maxHeight:"90vh",
        });

        dialogRef.afterClosed().subscribe(result => {



        });

      }, (error) => {

      });



  }


  verAvances(lote) {

    this.loteSrv.getAvances(lote.id_lote)
      .subscribe((res: any) => {

        let dialogRef = this.dialog.open(AvancesLoteDialogoComponent, {
          data: {
            lote: res.lote,
            acordeon: res.acordeon,
            num_partidas: res.num_partidas,
            num_partidas_finalizadas: res.num_partidas_finalizadas
          },
          width: '800px',
        });

        dialogRef.afterClosed().subscribe(result => {

        });

      }, (error) => {

      });



  }



}

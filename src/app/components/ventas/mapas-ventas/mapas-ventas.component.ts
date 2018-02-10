import { Component, OnInit, OnDestroy } from '@angular/core';
import { MapasService } from "app/services/mapas.service";
import 'jvectormap';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { ClientesLoteDialogoComponent } from 'app/components/ventas/clientes-lote-dialogo/clientes-lote-dialogo.component';
import { MatDialog, MatSnackBar } from '@angular/material';
import { of } from "rxjs/observable/of";
import { Observable } from 'rxjs/Observable';
import { CurrencyPipe } from '@angular/common';
import { LotesService } from 'app/services/lotes.service';


declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-mapas-ventas',
  templateUrl: './mapas-ventas.component.html',
  styleUrls: ['./mapas-ventas.component.scss'],
  providers: [CurrencyPipe]
})
export class MapasVentasComponent implements OnInit, OnDestroy {
  self = this;
  loading: boolean;
  verLeyenda: boolean = true;

  map: any;
  lote_selected: any = null;
  obra_selected: any = "";
  lotes: any = [];
  obras: any[] = [];
  jsonMap: any = {};

  constructor(
    private router: Router,
    private mapaSrv: MapasService,
    private loteSrv: LotesService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private currecyPipe: CurrencyPipe

  ) { }

  ngOnInit() {
    this.route.data
      .subscribe((data: { obras: any }) => {
        this.obras = data.obras;
      });



    this.route.paramMap
      .switchMap((params: ParamMap) => {
        if (params.has("obra")) {
          this.obra_selected = params.get("obra");

          let obra = this.getObra(this.obra_selected);
          this.loading = true;

          //unimos la consulta de los valores y el mapa
          return Observable.forkJoin(
            this.mapaSrv.getLotesObra(obra.id_obra),
            this.mapaSrv.getMapaObra(obra.mapa)
          )

        } else {
          return of([[], {}]);
        }

      }).subscribe(res => {

        this.lotes = res[0];
        this.jsonMap = res[1];

        let values = {};

        this.lotes.forEach(lote => {
          values[lote.code] = lote.estado_venta;
        });

        if (this.jsonMap.mapa) {
          this.crearMapa(values);
        }



        this.loading = false;

      }, (error) => {
        this.loading = false;
      });

  }

  cargarObra(id_obra) {

    //console.log("cargar obra", this.obras.find(obra => obra.id_obra == id_obra));


    if (id_obra) {
      this.router.navigate([".", { obra: id_obra }]);
    } else {
      this.router.navigate([".", {}]);

    }

  }

  private getObra(id_obra) {
    return this.obras.find(obra => obra.id_obra == id_obra);
  }

  verClientes() {

    this.loading = true;
    this.loteSrv.getDetallesLoteVentas(this.lote_selected.id_lote)
      .subscribe(res => {

        //console.log("res", res);
        this.loading = false;

        let dialogRef = this.dialog.open(ClientesLoteDialogoComponent, {
          data: {
            lote: res.lote,
            clientes: res.clientes
          },
          width: "800px"
        });


      }, (error) => {
        this.loading = false;
      });


  }

  ngOnDestroy() {
    if (this.map) {
      this.map.remove();
    }
  }


  toggleVerLeyenda(event) {
    //console.log("ver leyenda", event.checked);
    this.verLeyenda = event.checked;
    $(".jvectormap-legend-cnt.jvectormap-legend-cnt-v").toggleClass("d-none");
    //let items= $(".jvectormap-legend-cnt.jvectormap-legend-cnt-v");
    //console.log(items);


  }


  crearMapa(values) {

    this.verLeyenda = true;


    //borramos el mapa si ya hemos creado alguno
    if (this.map) {
      //funcion de la API de jvectormap
      this.map.remove();
    }

    jQuery.fn.vectorMap('addMap', 'map', this.jsonMap.mapa);
    $("#map").vectorMap({
      map: 'map',
      backgroundColor: "transparent",
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

          tooltip += " <br> " + this.currecyPipe.transform(lote.valor_base);

          if (lote.fecha_entrega) {
            tooltip += " <br> Entrega: " + lote.fecha_entrega;
          }

          if (lote.prototipos) {
            for (let i = 0; i < lote.prototipos.length; i++) {
              tooltip += " <br> " + lote.prototipos[i].nombre;
            }
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

    this.map = $("#map").vectorMap('get', 'mapObject');


  }


}

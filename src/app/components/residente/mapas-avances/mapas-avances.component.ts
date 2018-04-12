import { Component, OnInit } from '@angular/core';
import { MapasService } from "app/services/mapas.service";
import 'jvectormap';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { of } from "rxjs/observable/of";
import { PercentPipe } from '@angular/common';
import { ImagenesLotesDialogoComponent } from '../../ventas/imagenes-lotes-dialogo/imagenes-lotes-dialogo.component';
import { LotesService } from '../../../services/lotes.service';
import { AvancesLoteDialogoComponent } from '../avances-lote-dialogo/avances-lote-dialogo.component';

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
  valuesLotes: any = {};

  constructor(
    private route: ActivatedRoute,
    private mapaSrv: MapasService,
    private router: Router,
    private percentPipe: PercentPipe,
    public dialog: MatDialog,
    private loteSrv: LotesService
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

          //unimos la consulta de los valores y el mapa
          return Observable.forkJoin(
            this.mapaSrv.getAvancesLotesObra(obra.id_obra),
            this.mapaSrv.getMapaObra(obra.mapa)
          )

        } else {
          return of([[], {}]);
        }

      }).subscribe(res => {

        this.lotes = res[0].lotes;

        this.jsonMap = res[1];




        //creamos los valores para la escala de estados
        this.valuesLotes = {};
        this.lotes.forEach(lote => {
          //comprobar luego con datos
          this.valuesLotes[lote.code] = lote.valor ? lote.valor : 0;
        });



        if (this.jsonMap.mapa) {
          this.crearMapa(this.valuesLotes);
        }

      }, (error) => {

      });
  }



  crearMapa(values) {



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
            scale: ['#C8EEFF', '#0071A4'],
            min: 0,
            max: 1,
            normalizeFunction: 'polynomial'

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

          if (lote.prototipos) {
            for (let i = 0; i < lote.prototipos.length; i++) {
              tooltip += " <br> " + lote.prototipos[i].nombre;
            }
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

    this.map = $("#map").vectorMap('get', 'mapObject');


  }

  private getObra(id_obra) {
    return this.obras.find(obra => obra.id_obra == id_obra);
  }

  cargarObra(id_obra) {

    if (id_obra) {
      this.router.navigate([".", { obra: id_obra }]);
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
        });

        dialogRef.afterClosed().subscribe(result => {



        });

      }, (error) => {

      });



  }


  verAvances(lote) {

    this.loteSrv.getAvances(lote.id_lote)
      .subscribe(res => {

        let dialogRef = this.dialog.open(AvancesLoteDialogoComponent, {
          data: {
            lote: res.lote,
            acordeon: res.acordeon
          },
          width: '800px',
        });
    
        dialogRef.afterClosed().subscribe(result => {
    
        });

      }, (error) =>{

      });

    

  }


}

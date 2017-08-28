import { Component, OnInit, OnDestroy } from '@angular/core';
import { MapasService } from "app/services/mapas.service";
import 'jvectormap';
declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-mapas-ventas',
  templateUrl: './mapas-ventas.component.html',
  styleUrls: ['./mapas-ventas.component.scss']
})
export class MapasVentasComponent implements OnInit, OnDestroy {
  map: any;
  loteSelected: any;
  compras: any;
  compra_selected: any;
  obra_selected: any;
  lotes: any;
  map_values: any;

  constructor(private mapaSrv: MapasService) { }

  ngOnInit() {
  }

  ngOnDestroy() {
    if (this.map) {
      this.map.remove();
    }
  }

  getMapa() {
    let obra = { id_obra: 1, mapa: "tresMarias_codes.json" };

    this.mapaSrv.getMapaObra(obra.mapa)
      .subscribe(response => {


        jQuery.fn.vectorMap('addMap', 'map', response.mapa);
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
          markers: [

          ],
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
                values: [],//this.map_values,
                scale: {
                  'Libre': '#00a65a', //green
                  'Apartado': '#f39c12', //amarillo     '#ff851b', //orange
                  'Bloqueado': '#d81b60', //maroon 
                  'Contrato': '#00c0ef', //aqua         #0073b7',//blue
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
                  'Letras': 'black', // '#e4e4e4',
                  'What': 'red'
                },
                attribute: 'fill',
                //las regiones que son texto
                values: [],//response.data.texto
              }
            ]

          }


        });

        this.map = $("#map").vectorMap('get', 'mapObject');





      });

  }

  getMapaObra(obra) {
    console.log("getMapaObra", obra);


    //inicializamos los datos cada vez que se cambie de obra
    this.loteSelected = null;
    this.compra_selected = { pagos: [] };
    this.compras = [];


    if (obra.mapa) {

      this.mapaSrv.getLotesObra(obra.id_obra)
        .subscribe(response => {
          //console.log("response", response.data);
          this.lotes = response;

          /*   this.map_values = _.reduce(this.lotes, function (memo, item) {
              memo[item.code] = item.estado_venta;
              return memo;
            }, {}); */

          //console.log("values", this.map_values);
          /*
          this.mapaSrv.getMapaObra(obra.mapa).subscribe( (response)=> {
            //console.log(response);
            if (this.map) {
              this.map.remove();
            }
  
            jQuery.fn.vectorMap('addMap', 'map', response.data.mapa);
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
              markers: [
  
              ],
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
                    values: this.map_values,
                    scale: {
                      'Libre': '#00a65a', //green
                      'Apartado': '#f39c12', //amarillo     '#ff851b', //orange
                      'Bloqueado': '#d81b60', //maroon 
                      'Contrato': '#00c0ef', //aqua         #0073b7',//blue
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
                      'Letras': 'black', // '#e4e4e4',
                      'What': 'red'
                    },
                    attribute: 'fill',
                    //las regiones que son texto
                    values: response.data.texto
                  }
                ]
  
              },
              onRegionTipShow: function (e, tip, code) {
  
                //tip.html(el.html() + ' - ' + code);
                // code= M1L1-112
                // devuelve 112
                //var id = code.split('-')[1];
                //if (id) {
                //buscamos el lote por id para acceder a sus propiedades
                var lote = _.findWhere(this.lotes, { code: code });
                if (lote !== undefined) {
  
                  var tooltip = lote.nombre_manzana + ' ' + lote.nombre;
  
                  if (this.options.get_rol_usuario() !== 3) {
                    tooltip += ' <br> ' + numeral(lote.valor_base).format("$0,0.00");
                  }
  
                  if (lote.fecha_entrega) {
                    tooltip += ' <br> Entrega: ' + lote.fecha_entrega;
                  }
                  if (lote.prototipos) {
                    for (var i = 0; i < lote.prototipos.length; i++) {
                      tooltip += ' <br> ' + lote.prototipos[i].nombre;
                    }
                  }
  
  
  
                  tip.html(tooltip);
                } else {
                  //no encontramos el lote
                  e.preventDefault();
                }
  
              },
              onRegionClick: function (e, code) {
  
  
  
                //buscamos el lote por id para acceder a sus propiedades
                var lote = _.findWhere(this.lotes, { code: code });
                if (lote !== undefined) {
  
  
                  $scope.$apply(function () {
                    this.loteSelected = lote;
                  });
  
                } else {
                  //no encontramos el lote
                  $scope.$apply(function () {
                    this.loteSelected = null;
                  });
                }
  
              },
              onRegionSelected: function (e, code, isSelected, selectedRegions) {
  
  
                if (code.startsWith("M")) {
                  var id = code.split('-')[1];
                  if (id) {
                    //buscamos el lote por id para acceder a sus propiedades
                    var lote = _.findWhere(this.lotes, { id_lote: id });
                    if (lote !== undefined) {
  
  
                      $scope.$apply(function () {
                        this.loteSelected = lote;
                      });
  
                    } else {
                      //no encontramos el lote
                      //e.preventDefault();
                    }
                  }
                } else {
                  //e.preventDefault();
                }
  
              }
  
            });
  
  
            this.map = $("#map").vectorMap('get', 'mapObject');
            //this.map.container.click(this.clickmap);
  
  
          });
          */


        });

    } else {
      this.obra_selected = null;
      //$("#modalAlert").modal("show");
    }

  };

}

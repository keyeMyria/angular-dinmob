import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { of } from "rxjs";
import { colorSets } from '@swimlane/ngx-charts/release/utils/color-sets';
import { CurrencyPipe } from '@angular/common';
import { VendedorService } from '../../../services/vendedor.service';
@Component({
  selector: 'app-graficas-ventas',
  templateUrl: './graficas-ventas.component.html',
  styleUrls: ['./graficas-ventas.component.scss'],
  providers: [CurrencyPipe]
})
export class GraficasVentasComponent implements OnInit {

  temas: any = colorSets;

  view: any;
  // options
  yScale = 500;
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showDataLabel = true;
  showXAxisLabel = true;
  xAxisLabelYear = '';
  xAxisLabelTotales = '';
  showYAxisLabel = false;
  yAxisLabelYear = 'Ventas';
  yAxisLabelTotales = 'Ventas';
  name: string = "cool";
  colorSchemeYear = this.temas.find(s => s.name === this.name);
  /*   {
      domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
    }; */

  colorSchemeTotales = this.temas.find(s => s.name === "vivid");

  obras: any = [];
  obra_selected: string = "";
  totales: any = [];
  meses: any = [];
  years: any = [];
  year: any = [];
  equipos: any = [];


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private vendedorSrv: VendedorService,
    private currecyPipe: CurrencyPipe,
  ) { }

  ngOnInit() {

    this.route.data
      .subscribe((data: { obras: any }) => {
        this.obras = data.obras;

      });



    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        if (params.has("obra")) {
          this.obra_selected = params.get("obra");
          return this.vendedorSrv.getGraficasVendedores(params.get("obra"));
        } else {
          return of({});
        }
      })).subscribe((data: any) => {

       
        this.totales = data.totales;
        this.meses = data.meses;
        this.equipos = data.equipos;

        let keys = Object.keys(this.meses).sort();
        //console.log("claves", keys);

        let count = keys.length;
        if (count > 0) {
          let yearEquipo = keys[count - 1];
          let year_equipo = yearEquipo.split("-");
          let equipo = this.equipos.find(equipo => equipo.id_equipo == year_equipo[1]);

          this.year = data.meses[yearEquipo];
          this.xAxisLabelYear = year_equipo[0] + " " + equipo.nombre;
          this.xAxisLabelTotales = "Total: " + data.total;
        } else {
          this.year=[];
          this.xAxisLabelYear = "";
          this.xAxisLabelTotales = "";
        }

      }, (error) => {
      });

  }

  cargarObra(id_obra) {

    if (id_obra) {
      this.router.navigate(["/escrituracion/graficas-ventas", { obra: id_obra }]);
    } else {
      this.router.navigate(["/escrituracion/graficas-ventas", {}]);
    }

  }

  selectYearEquipo(event) {
    //console.log("select year", event);
    let equipo = this.equipos.find(equipo => equipo.nombre == event.name);
    let key = event.series + "-" + equipo.id_equipo;
    this.year = this.meses[key];
    this.xAxisLabelYear = event.series + " " + event.name;
  }

  onSelect(event) {
    //console.log("onSelect");    
  }
}

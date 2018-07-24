import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { of } from "rxjs";
import { VentasPagosService } from '../../../services/ventas-pagos.service';
import { colorSets } from '@swimlane/ngx-charts/release/utils/color-sets';
import { CurrencyPipe } from '@angular/common';

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
  name: string = "natural";
  colorSchemeYear = //this.temas.find(s => s.name === this.name);
    {
      domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
    };

  colorSchemeTotales = this.temas.find(s => s.name === "cool");

  obras: any = [];
  obra_selected: string = "";
  totales: any = [];
  meses: any = [];
  years: any = [];
  year: any = [];


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private pagoSrv: VentasPagosService,
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
          return this.pagoSrv.getGraficasVentas(params.get("obra"));
        } else {
          return of({});
        }
      })).subscribe((data: any) => {
        this.totales = data.totales;
        this.meses = data.meses;
        this.years = data.years

        let count = data.years.length;
        if (count > 0) {
          let year = data.years[count - 1];
          let totalYear = this.totales.find(total => total.name == year);

          this.year = data.meses[year];
          this.xAxisLabelYear = "(" + year + ") " + this.currecyPipe.transform(totalYear.value);
          this.xAxisLabelTotales = this.currecyPipe.transform(data.total);
        }

      }, (error) => {
      });

  }

  cargarObra(id_obra) {

    if (id_obra) {
      this.router.navigate([".", { obra: id_obra }]);
    } else {
      this.router.navigate([".", {}]);
    }

  }

  selectYear(event) {
    //console.log("select year",event);
    this.year = this.meses[event.name];
    this.xAxisLabelYear = "(" + event.name + ") " + this.currecyPipe.transform(event.value);
  }

  onSelect(event) {
    //console.log("onSelect");    
  }

}

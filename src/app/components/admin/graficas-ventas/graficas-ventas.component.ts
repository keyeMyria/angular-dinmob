import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { of } from "rxjs";
import { VentasPagosService } from '../../../services/ventas-pagos.service';

@Component({
  selector: 'app-graficas-ventas',
  templateUrl: './graficas-ventas.component.html',
  styleUrls: ['./graficas-ventas.component.scss']
})
export class GraficasVentasComponent implements OnInit {


  view: any;
  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showDataLabel = true;
  showXAxisLabel = true;
  xAxisLabel = '';
  showYAxisLabel = false;
  yAxisLabel = 'Ventas';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  obras: any = [];
  obra_selected: string = "";
  totales: any = [];
  meses: any = [];
  years: any = [];
  year: any = [];


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private pagoSrv: VentasPagosService
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

        if (data.years.length > 0) {
          this.year = data.meses[data.years[0]];
          this.xAxisLabel = data.years[0];
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
    console.log("select year",event);
    this.year = this.meses[event.name];
    this.xAxisLabel= event.name;
  }

}

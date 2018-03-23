import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { ReporteService } from 'app/services/reporte.service';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.scss']
})
export class ReportesComponent implements OnInit {

  obras: any[] = [];
  obra_selected: string = "";

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private reporteSrv: ReporteService
  ) { }

  ngOnInit() {
    this.route.data
      .subscribe((data: { obras: any[], especialidades: any }) => {
        this.obras = data.obras;
        this.obra_selected = this.route.snapshot.params["obra"];
      });
  }

  cargarObra(id_obra) {

    if (id_obra) {
      this.router.navigate([".", { obra: id_obra }]);
    } else {
      this.router.navigate([".", {}]);
    }

  }

  reporteVentas() {
    let url = this.reporteSrv.getUrlReporteVentas(this.obra_selected);
    let link = document.createElement("a");
    link.href = url;
    link.target = "_blank";
    link.click();
  }

  reportePagos() {
    let url = this.reporteSrv.getUrlReportePagos(this.obra_selected);
    let link = document.createElement("a");
    link.href = url;
    link.target = "_blank";
    link.click();
  }

}

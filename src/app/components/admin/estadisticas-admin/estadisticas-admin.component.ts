import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ObrasService } from 'app/services/obras.service';
import { of } from "rxjs/observable/of";
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-estadisticas-admin',
  templateUrl: './estadisticas-admin.component.html',
  styleUrls: ['./estadisticas-admin.component.scss']
})
export class EstadisticasAdminComponent implements OnInit {
  obras: any = [];
  estadisticas: any = {};
  obra_selected: string = "";

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private obraSrv: ObrasService,
    public snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    /*   this.obraSrv.getEstadisticas(id_obra)
        .subscribe(res => {
          this.estadisticas = res;
        }); */

    this.route.data
      .subscribe((data: { obras: any[] }) => {
        this.obras = data.obras;
      });

    this.route.paramMap
      .switchMap((params: ParamMap) => {
        if (params.has("obra")) {
          this.obra_selected = params.get("obra");
          return this.obraSrv.getEstadisticas(params.get("obra"));
        } else {
          return of([]);
        }
      }).subscribe(estadisticas => {
        this.estadisticas = estadisticas;
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

}

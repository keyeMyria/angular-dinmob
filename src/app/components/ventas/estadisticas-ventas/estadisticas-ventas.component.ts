import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ObrasService } from 'app/services/obras.service';
import { of } from "rxjs/observable/of";
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-estadisticas-ventas',
  templateUrl: './estadisticas-ventas.component.html',
  styleUrls: ['./estadisticas-ventas.component.scss']
})
export class EstadisticasVentasComponent implements OnInit {
  obras: any = [];
  estadisticas: any ={};
  obra_selected: string = "";

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private obraSrv: ObrasService,
    public snackBar: MatSnackBar,
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
          return this.obraSrv.getEstadisticasVentas(params.get("obra"));
        } else {
          return of({});
        }
      }).subscribe(res => {
        this.estadisticas = res;
      }, (error) => {
        this.snackBar.open("Ha ocurrido un error de conexión. Inténtelo más tarde", "", {
          duration: 3000,
          panelClass: ["bg-danger", "text-white"]
        });
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

import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { ObrasService } from "app/services/obras.service";
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { of } from "rxjs"

@Component({
  selector: 'app-historial-avances',
  templateUrl: './historial-avances.component.html',
  styleUrls: ['./historial-avances.component.scss']
})
export class HistorialAvancesComponent implements OnInit {

  obras: any = [];
  obra_selected: string = "";
  fechas: any = [];

  constructor(
    private obraSrv: ObrasService,
    private route: ActivatedRoute,
    private router: Router,
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
          return this.obraSrv.getUltimosAvances(params.get("obra"));
        } else {
          return of({});
        }
      })).subscribe(avances => {
        this.fechas = avances;
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

  verInsumos(fecha) {

  }



}

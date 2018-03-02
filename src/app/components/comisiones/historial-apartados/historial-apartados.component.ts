import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { VentasPagosService } from 'app/services/ventas-pagos.service';
import { of } from "rxjs/observable/of";

@Component({
  selector: 'app-historial-apartados',
  templateUrl: './historial-apartados.component.html',
  styleUrls: ['./historial-apartados.component.scss']
})
export class HistorialApartadosComponent implements OnInit {
  obras: any = [];
  obra_selected: string = "";
  apartados: any = [];
  vendedores: any = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private pagoSrv: VentasPagosService,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.route.data
      .subscribe((data: { obras: any[], vendedores: any[] }) => {
        this.obras = data.obras;
        this.vendedores = data.vendedores;
      });

    this.route.paramMap
      .switchMap((params: ParamMap) => {
        if (params.has("obra")) {
          this.obra_selected = params.get("obra");
          return this.pagoSrv.getApartadosObra(params.get("obra"));
        } else {
          return of([]);
        }
      }).subscribe(apartados => {
        this.apartados = apartados;
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

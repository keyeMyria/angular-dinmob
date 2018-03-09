import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { VentasPagosService } from 'app/services/ventas-pagos.service';
import { of } from "rxjs/observable/of";
import { VendedorService } from '../../../services/vendedor.service';
import { Observable } from 'rxjs/Observable';

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
    public snackBar: MatSnackBar,
    private vendedorSrv: VendedorService
  ) { }

  ngOnInit() {
    this.route.data
      .subscribe((data: { obras: any[], vendedores: any[] }) => {
        this.obras = data.obras;
      });

    this.route.paramMap
      .switchMap((params: ParamMap) => {
        if (params.has("obra")) {
          this.obra_selected = params.get("obra");
          return Observable.forkJoin(
            this.pagoSrv.getApartadosObra(params.get("obra")),
            this.vendedorSrv.getVendedoresObra(params.get("obra"))
          );
        } else {
          return of([[], []]);
        }
      }).subscribe(res => {
        this.apartados = res[0];
        this.vendedores = res[1];
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

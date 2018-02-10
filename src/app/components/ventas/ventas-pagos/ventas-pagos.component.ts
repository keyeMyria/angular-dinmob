import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { VentasPagosService } from 'app/services/ventas-pagos.service';
import { of } from "rxjs/observable/of";
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-ventas-pagos',
  templateUrl: './ventas-pagos.component.html',
  styleUrls: ['./ventas-pagos.component.scss']
})
export class VentasPagosComponent implements OnInit {
  obras: any = [];
  obra_selected: string = "";
  loading: boolean;
  pagos: any = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pagoSrv: VentasPagosService,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit() {

    this.route.data
      .subscribe((data: { obras: any }) => {
        this.obras = data.obras;
      });

    this.loading = true;
    this.route.paramMap
      .switchMap((params: ParamMap) => {
        if (params.has("obra")) {
          this.obra_selected = params.get("obra");
          return this.pagoSrv.getPagosObra(params.get("obra"));
        } else {
          return of({});
        }
      }).subscribe(pagos => {
        this.pagos = pagos;
        this.loading = false;
      }, (error) => {
        this.loading = false;
      });

  }

  setValidacionPago(pago) {

    let validado = 0;
    if (pago.validado == "0") {
      validado = 1;
    }

    this.loading = true;
    this.pagoSrv.setValidacion(pago.id_pago, validado)
      .subscribe(res => {
        this.loading = false;
        pago.validado = res.validado;
        this.snackBar.open("Pago Actualizado", "", {
          duration: 2000,
          panelClass: ["bg-success", "text-white"]
        });

      }, (error) => {
        this.loading = false;
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

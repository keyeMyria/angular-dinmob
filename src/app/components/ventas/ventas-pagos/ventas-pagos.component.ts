import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { VentasPagosService } from 'app/services/ventas-pagos.service';
import { of } from "rxjs/observable/of";

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
    private pagoSrv: VentasPagosService
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

  cargarObra(id_obra) {

    if (id_obra) {
      this.router.navigate([".", { obra: id_obra }]);
    } else {
      this.router.navigate([".", {}]);

    }

  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { InsumoService } from 'app/services/insumo.service';
import { of } from "rxjs/observable/of";

@Component({
  selector: 'app-nueva-entrada',
  templateUrl: './nueva-entrada.component.html',
  styleUrls: ['./nueva-entrada.component.scss']
})
export class NuevaEntradaComponent implements OnInit {
  obras: any = [];
  obra_selected: string = "";
  insumos: any[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private insumoSrv: InsumoService,
  ) { }

  ngOnInit() {
    this.route.data
      .subscribe((data: { obras: any[] }) => {
        this.obras = data.obras;
      });
    this.route.paramMap
      .switchMap((params: ParamMap) => {
        if (params.has("obra")) {
          this.obra_selected = params.get("obra");
          return this.insumoSrv.getMaterialesObra(params.get("obra"));
        } else {
          return of([]);
        }
      }).subscribe(insumos => {
        console.log("insumos", insumos);
        this.insumos = insumos;

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


import {switchMap} from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';

import { ObrasService } from "app/services/obras.service";
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
//import { Observable } from 'rxjs/Observable';
import { of } from "rxjs";
import { AuthService } from 'app/services/auth.service';


@Component({
  selector: 'app-desarrollos',
  templateUrl: './desarrollos.component.html',
  styleUrls: ['./desarrollos.component.scss'],

})
export class DesarrollosComponent implements OnInit {

  obras: any = [];
  obra: any = {};
  obra_selected: string = "";

  constructor(
    private obraSrv: ObrasService,
    private router: Router,
    private route: ActivatedRoute,
    private auth: AuthService,
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
          return this.obraSrv.getLotesEnVenta(params.get("obra"));
        } else {
          return of({});
        }
      })).subscribe(obra => {
        this.obra = obra;
      },(error)=>{
      });


  }

  ventasLote(lote) {
    this.router.navigate(["/ventas/lote", lote.id_lote]);
  }

  cargarObra(id_obra) {

    if (id_obra) {
      this.router.navigate([".", { obra: id_obra }]);
    } else {
      this.router.navigate([".", {}]);
    }

  }

}

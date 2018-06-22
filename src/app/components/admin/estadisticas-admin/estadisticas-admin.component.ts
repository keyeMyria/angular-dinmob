import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ObrasService } from 'app/services/obras.service';
import { of } from "rxjs";
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


    this.route.data
      //.subscribe((data: { obras: any[], estadisticas: any }) => {
        .subscribe((data:{ datos:{estadisticas:any, obras:any}})=>{
          //console.log("data", data.datos);
          
        //this.obras = data.obras;
        //this.estadisticas = data.estadisticas;
        this.obras= data.datos.obras;
        this.estadisticas= data.datos.estadisticas;
        this.obra_selected = this.route.snapshot.params["obra"] ? this.route.snapshot.params["obra"] : "";
      });



    /*   this.route.paramMap
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
        }); */

  }

  refresh() {
    this.obraSrv.getEstadisticas(this.obra_selected)
      .subscribe(estadisticas => {
        this.estadisticas = estadisticas;
      })
  }


  cargarObra(id_obra) {

    if (id_obra) {
      this.router.navigate([".", { obra: id_obra }]);
    } else {
      this.router.navigate([".", {}]);
    }

  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { VentasPagosService } from 'app/services/ventas-pagos.service';
import { of } from "rxjs/observable/of";
import { MatSnackBar } from '@angular/material';
import * as moment from 'moment';

@Component({
  selector: 'app-ventas-pagos',
  templateUrl: './ventas-pagos.component.html',
  styleUrls: ['./ventas-pagos.component.scss']
})
export class VentasPagosComponent implements OnInit {
  obras: any = [];
  tipos: any = [];
  obra_selected: string = "";
  pagos: any = [];
  pagosFiltrados: any = [];
  tipo_pago_selected: string = "";

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pagoSrv: VentasPagosService,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit() {

    this.route.data
      .subscribe((data: { obras: any, tipos: any }) => {
        this.obras = data.obras;
        this.tipos = data.tipos;
      });

    this.route.paramMap
      .switchMap((params: ParamMap) => {
        if (params.has("obra")) {
          this.obra_selected = params.get("obra");
          return this.pagoSrv.getPagosObra(params.get("obra"));
        } else {
          return of([]);
        }
      }).subscribe(pagos => {
        this.pagos = pagos;
        this.pagosFiltrados = this.pagos.slice();
      }, (error) => {
      });

  }

  setValidacionPago(pago) {

    let validado = 0;
    if (pago.validado == "0") {
      validado = 1;
    }

    this.pagoSrv.setValidacion(pago.id_pago, validado)
      .subscribe(res => {
        pago.validado = res.validado;
        this.snackBar.open("Pago Actualizado", "", {
          duration: 2000,
          panelClass: ["bg-success", "text-white"]
        });

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


  filtro(del, al, id_tipo_pago) {


    let fecha_ini = del.value == "" ? "" : moment(del.value, "ll", "es").format("YYYY-MM-DD");
    let fecha_fin = al.value == "" ? "" : moment(al.value, "ll", "es").format("YYYY-MM-DD");

    let filtro = false;

    //console.log("filtro", id_tipo_pago, fecha_ini, fecha_fin);

    if (fecha_ini != "") {

      this.pagosFiltrados = this.pagos.filter(item => item.fecha_pago >= fecha_ini);
      filtro = true;

    }

    if (fecha_fin != "") {



      if (filtro) {
        this.pagosFiltrados = this.pagosFiltrados.filter(item => item.fecha_pago <= fecha_fin);
      } else {
        this.pagosFiltrados = this.pagos.filter(item => item.fecha_pago <= fecha_fin);
      }

      filtro = true;

    }

    if (id_tipo_pago != "") {

      if (filtro) {
        this.pagosFiltrados = this.pagosFiltrados.filter(item => item.id_tipo_pago == id_tipo_pago);

      } else {
        this.pagosFiltrados = this.pagos.filter(item => item.id_tipo_pago == id_tipo_pago);
      }

    } else {
      //todos los tipos


      // this.tabla_filtrada && !filtro
      if (!filtro) {
        //console.log("todos, no filtro");

        this.pagosFiltrados = this.pagos.filter(item => item.id_tipo_pago);
      } else {
        //console.log("todos, filtro");
        //ya se ha aplicado algún filtro de fechas
        this.pagosFiltrados = this.pagosFiltrados.filter(item => item.id_tipo_pago);
      }

    }



  }

  sumaPagos() {
    let suma = 0;

    this.pagosFiltrados.forEach(pago => {
      suma += +pago.monto;
    });

    return suma;
  }

}

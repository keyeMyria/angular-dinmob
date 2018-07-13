
import {forkJoin as observableForkJoin,  of ,  Observable } from 'rxjs';

import {switchMap} from 'rxjs/operators';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { VentasPagosService } from 'app/services/ventas-pagos.service';
import { VendedorService } from '../../../services/vendedor.service';
import * as moment from 'moment';

@Component({
  selector: 'app-historial-apartados',
  templateUrl: './historial-apartados.component.html',
  styleUrls: ['./historial-apartados.component.scss']
})
export class HistorialApartadosComponent implements OnInit {

  //@ViewChild('del') del: ElementRef;
  //@ViewChild('al') al: ElementRef;

  obras: any = [];
  obra_selected: string = "";
  apartados: any = [];
  vendedores: any = [];
  apartadosFiltrados: any[] = [];

  vendedor_selected: string = "";
  //tabla_filtrada: boolean = false;

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

    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        if (params.has("obra")) {
          this.obra_selected = params.get("obra");
          return observableForkJoin(
            this.pagoSrv.getApartadosObra(params.get("obra")),
            this.vendedorSrv.getVendedoresObra(params.get("obra"))
          );
        } else {
          return of([[], []]);
        }
      })).subscribe(res => {
        this.apartados = res[0];
        this.apartadosFiltrados = this.apartados.slice();
        this.vendedores = res[1];

        //filtros a valor inicial
        this.vendedor_selected = "";
        //this.tabla_filtrada = false;
        //this.al.nativeElement.value = "";
        //this.del.nativeElement.value = "";

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

  filtro(del, al, id_vendedor) {


    let fecha_ini = del.value == "" ? "" : moment(del.value, "ll", "es").format("YYYY-MM-DD");
    let fecha_fin = al.value == "" ? "" : moment(al.value, "ll", "es").format("YYYY-MM-DD");

    let filtro = false;

    //console.log("filtro", id_vendedor, fecha_ini, fecha_fin);

    if (fecha_ini != "") {

      this.apartadosFiltrados = this.apartados.filter(item => item.fecha_pago >= fecha_ini);
      filtro = true;

    }

    if (fecha_fin != "") {



      if (filtro) {
        this.apartadosFiltrados = this.apartadosFiltrados.filter(item => item.fecha_pago <= fecha_fin);
      } else {
        this.apartadosFiltrados = this.apartados.filter(item => item.fecha_pago <= fecha_fin);
      }

      filtro = true;

    }

    if (id_vendedor != "") {

      if (filtro) {
        this.apartadosFiltrados = this.apartadosFiltrados.filter(item => item.id_vendedor == id_vendedor);

      } else {
        this.apartadosFiltrados = this.apartados.filter(item => item.id_vendedor == id_vendedor);
      }

    } else {
      //todos los vendedores


      // this.tabla_filtrada && !filtro
      if (!filtro) {
        //console.log("todos, no filtro");
        // si no se ha aplicado ningún filtro entonces devolvemos toda la lista
        this.apartadosFiltrados = this.apartados.slice();
      } else {
        //console.log("todos, filtro");
        //ya se ha aplicado algún filtro de fechas, no hacemos nada y se devuelve lo que ya está filtrado
        
      }

    }

   // this.tabla_filtrada = true;

  }

}

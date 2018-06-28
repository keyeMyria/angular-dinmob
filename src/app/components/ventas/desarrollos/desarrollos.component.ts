
import { switchMap } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
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
  numbermask = createNumberMask({
    allowDecimal: true,
    prefix: '',
    decimalLimit: 2
  });

  obras: any = [];
  obra: any = {};
  obra_selected: string = "";
  estados: any = [];
  manzanas: any = [];
  lotes_filtrados: any = [];

  constructor(
    private obraSrv: ObrasService,
    private router: Router,
    private route: ActivatedRoute,
    private auth: AuthService,
  ) { }



  ngOnInit() {
    this.route.data
      .subscribe((data: { obras: any, estados: any, manzanas: any }) => {
        this.obras = data.obras;
        data.estados.push({ descripcion: "Cancelado" });
        this.estados = data.estados;
        this.manzanas = data.manzanas;
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
        this.lotes_filtrados = this.obra.lotes.slice();
      }, (error) => {
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


  filtrar(precio, lote, estado, manzana) {

    let valor = +precio.replace(/,/g, "");

    //console.log("filtro", valor, lote, estado, manzana);

    if (estado != "" && manzana != "") {
      //filtro completo
      //console.log("uno");


      this.lotes_filtrados = this.obra.lotes.filter(l => {
        return +l.valor_base >= valor &&
          l.nombre.toLowerCase().includes(lote.toLowerCase()) &&
          l.id_estado_venta == estado &&
          l.id_manzana == manzana;
      });

    } else if (estado != "") {
      //console.log("dos");

      this.lotes_filtrados = this.obra.lotes.filter(l => {
        return +l.valor_base >= valor &&
          l.nombre.toLowerCase().includes(lote.toLowerCase()) &&
          l.id_estado_venta == estado;
      });

    } else if (manzana != "") {
      //console.log("tres");

      this.lotes_filtrados = this.obra.lotes.filter(l => {
        return +l.valor_base >= valor &&
          l.nombre.toLowerCase().includes(lote.toLowerCase()) &&
          l.id_manzana == manzana;
      });

    } else {
      //no tiene manzana ni estado
      //console.log("cuatro");


      this.lotes_filtrados = this.obra.lotes.filter(l => {
        return +l.valor_base >= valor &&
          l.nombre.toLowerCase().includes(lote.toLowerCase());
      });

    }

    /* this.lotes_filtrados = this.obra.lotes.filter(lote => {
      return lote.nombre.toLowerCase().includes(nombre.toLowerCase()) &&
        lote.lote.toLowerCase().includes(lote.toLowerCase()) &&
        lote.estado_lote.includes(estado) &&
        lote.manzana.includes(manzana);
    }); */

  }

}

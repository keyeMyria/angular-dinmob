
import {of as observableOf, forkJoin as observableForkJoin,  Observable } from 'rxjs';

import {switchMap} from 'rxjs/operators';
import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { MatSnackBar, MatDrawer, MatDialog, MatTabChangeEvent, MatTabGroup } from '@angular/material';
import { ObrasService } from 'app/services/obras.service';
import { PedidoService } from '../../../services/pedido.service';
import { AlertaDialogoComponent } from 'app/components/admin/alerta-dialogo/alerta-dialogo.component';

@Component({
  selector: 'app-editar-pedido',
  templateUrl: './editar-pedido.component.html',
  styleUrls: ['./editar-pedido.component.scss']
})
export class EditarPedidoComponent implements OnInit {
  @ViewChild(MatTabGroup) tabGroup: MatTabGroup;
  @ViewChild(MatDrawer) drawer: MatDrawer;

  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  obras: any = [];
  obra_selected: string = "";
  obra: any;
  lote_selected: any = {};
  lotes_pedido: any = [];
  lotePedido_selected: any = "";
  insumos: any = [];
  insumos_pedido: any = [];
  pedido: any = {};
  estados: any = [];

  constructor(
    private media: MediaMatcher,
    private changeDetectorRef: ChangeDetectorRef,
    private route: ActivatedRoute,
    private router: Router,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    private obraSrv: ObrasService,
    private pedidoSrv: PedidoService
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit() {

    this.route.data
      .subscribe((data: { obras: any[], estados: any }) => {
        this.obras = data.obras;
        this.estados = data.estados;
      });

    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        if (params.has("obra")) {
          this.obra_selected = params.get("obra");
          return observableForkJoin(
            this.obraSrv.getAcordeonManzanas(params.get("obra")),
            this.pedidoSrv.getPedidoEditable(params.get("id"))
          );
        } else {
          return observableOf([[], {}]);
        }
      })).subscribe((res: any) => {
        //console.log("obra", res);
        this.obra = res[0];

        this.lotes_pedido = res[1].lotes;
        this.pedido = res[1].pedido;
        this.lotePedido_selected = "";
      });



  }

  cargarObra(id_obra) {

    if (id_obra) {
      this.router.navigate([".", { obra: id_obra }]);
    } else {
      this.router.navigate([".", {}]);

    }
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener)

  }

  loteEstaEnPedido(id_lote) {
    let encontrado = this.lotes_pedido.find(lote => lote.id_lote == id_lote);
    if (encontrado === undefined) {
      //console.log("encontrado undefined");
      return false;
    } else {
      //console.log("encontrado", encontrado);
      return true;
    }

  };

  getLote(lote) {

    if (this.tabGroup.selectedIndex == 0) {

      if (this.mobileQuery.matches) {
        this.drawer.close();
      }

      if (!this.loteEstaEnPedido(lote.id_lote)) {
        this.pedidoSrv.getLote(lote.id_lote)
          .subscribe((response: any) => {
            lote.partidas = response.partidas;
            lote.insumos_extra = response.insumos_extra;
            this.lotes_pedido.push(lote);
            this.lotePedido_selected = this.lotes_pedido[this.lotes_pedido.length - 1];

          }, (error) => {

          });
      }
    } else {
      let dialogRef = this.dialog.open(AlertaDialogoComponent, {
        data: {
          title: "Corregir",
          content: "Cambie a la pestaña Lotes para añadir materiales.",
          icon: true
        },

      });
    }

  }

  countInsumosPedido(insumos) {
    let count = 0;

    for (let i = 0; i < insumos.length; i++) {
      if (insumos[i].requerido > 0) {
        count++;
      }
    }
    return count;

  }

  countInsumosPedidoPartida(partida) {
    let count = 0;

    for (let i = 0; i < partida.subpartidas.length; i++) {
      count += this.countInsumosPedido(partida.subpartidas[i].insumos);
    }
    return count;

  }

  delLotePedido() {
    let i = this.lotes_pedido.indexOf(this.lotePedido_selected);
    this.lotes_pedido.splice(i, 1);
    this.lotePedido_selected = "";
  }

  arrayUnique(origen, array) {

    for (var i = 0; i < array.length; i++) {

      for (var j = 0; j < origen.length; j++) {

        // si el insumo ya está entonces sumamos las cantidades
        if (origen[j].id_insumo === array[i].id_insumo) {
          origen[j].requerido = Number(origen[j].requerido) + Number(array[i].requerido);
          break;
        }

      }

      // si no encontramos el insumo entonces lo añadimos
      if (j === origen.length) {
        //console.log("nuevo insumo", array[i]);
        let newInsumo = {
          id_insumo_partida: array[i].id_insumo_partida,
          id_insumo: array[i].id_insumo,
          extra: array[i].extra,
          insumo: array[i].insumo,
          unidad: array[i].unidad,
          requerido: array[i].requerido
        };
        origen.push(newInsumo);
      }

    }


  }

  getInsumosAcumulados() {

    //console.log("getInsumosAcumulados");


    this.insumos = [];

    //buscamos los insumos de las partidas
    for (let i = 0; i < this.lotes_pedido.length; i++) {

      //insumos de las partidas
      for (let j = 0; j < this.lotes_pedido[i].partidas.length; j++) {

        let insumosPartida = this.lotes_pedido[i].partidas[j].insumos.filter(insumo => insumo.requerido > 0);
        this.arrayUnique(this.insumos, insumosPartida);

        //insumos de las subpartidas
        for (let k = 0; k < this.lotes_pedido[i].partidas[j].subpartidas.length; k++) {

          let insumosSubpartida = this.lotes_pedido[i].partidas[j].subpartidas[k].insumos.filter(insumo => insumo.requerido > 0);
          this.arrayUnique(this.insumos, insumosSubpartida);

        }

      }

      //buscamos los insumos extras  
      let insumosExtra = this.lotes_pedido[i].insumos_extra.filter(insumo => insumo.requerido > 0);
      this.arrayUnique(this.insumos, insumosExtra);

    }

  }

  getInsumosSinAcumular() {

    this.insumos_pedido = [];


    //buscamos los insumos de las partidas
    for (var i = 0; i < this.lotes_pedido.length; i++) {

      //insumos de las partidas
      for (var j = 0; j < this.lotes_pedido[i].partidas.length; j++) {

        //console.log("insumos partida");
        this.concatInsumosPedido(this.insumos_pedido, this.lotes_pedido[i].partidas[j].insumos, this.lotes_pedido[i].id_lote);

        //insumos de las subpartidas
        for (var k = 0; k < this.lotes_pedido[i].partidas[j].subpartidas.length; k++) {
          //console.log("insumos subpartida");
          this.concatInsumosPedido(this.insumos_pedido, this.lotes_pedido[i].partidas[j].subpartidas[k].insumos, this.lotes_pedido[i].id_lote);

        }
      }

      //buscamos los insumos extras
      //console.log("insumos extra");
      this.concatInsumosPedido(this.insumos_pedido, this.lotes_pedido[i].insumos_extra, this.lotes_pedido[i].id_lote);
    }

  }

  concatInsumosPedido(pedido, insumos, id_lote) {
    //console.log("concatInsumosPedido");
    for (var i = 0; i < insumos.length; i++) {


      if (insumos[i].requerido > 0) {

        /*    var id_insumo_partida = insumos[i].id_insumo_partida;
           if (insumos[i].extra === "1") {
             id_insumo_partida = null;
           } */


        let newInsumo = {
          id_lote: id_lote,
          id_insumo_partida: insumos[i].extra === "1" ? null : insumos[i].id_insumo_partida,
          id_insumo: insumos[i].id_insumo,
          unidad: insumos[i].unidad,
          cantidad: insumos[i].requerido,
          extra: insumos[i].extra
        };
        pedido.push(newInsumo);

      }

    }

  }

  updatePedido() {
    if (this.insumos_pedido.length > 0) {
      let pedido: any = { descripcion: this.pedido.descripcion, id_pedido_estado: this.pedido.id_pedido_estado };
      this.pedidoSrv.updatePedido(this.pedido.id_pedido, pedido, this.insumos_pedido)
        .subscribe(respuesta => {

          //console.log("respuesta", respuesta);
          this.snackBar.open("Pedido Actualizado", "", {
            duration: 2000,
            panelClass: ["bg-success", "text-white"]
          });


        }, (error) => {

          this.snackBar.open("Ha ocurrido un error de conexión. Inténtelo más tarde", "", {
            duration: 3000,
            panelClass: ["bg-danger", "text-white"]
          });
        });

    } else {
      let dialogRef = this.dialog.open(AlertaDialogoComponent, {
        data: {
          title: "Corregir",
          content: "El pedido que intenta actualizar no contiene ningún material.",
          icon: true
        },
        //width: '500px',
      });
    }
  }

  onTabChange(event: MatTabChangeEvent) {
    //console.log("tab change", event);

    //si seleccionamos la tab Pedido
    if (event.index == 1) {
      this.getInsumosAcumulados();
      this.getInsumosSinAcumular();
    }


  }


}

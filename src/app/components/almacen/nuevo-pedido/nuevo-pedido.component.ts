import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { ObrasService } from 'app/services/obras.service';
import { PedidoService } from '../../../services/pedido.service';

@Component({
  selector: 'app-nuevo-pedido',
  templateUrl: './nuevo-pedido.component.html',
  styleUrls: ['./nuevo-pedido.component.scss']
})
export class NuevoPedidoComponent implements OnInit {

  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  obras: any = [];
  obra_selected: string = "";
  obra: any;
  // partidas: any = [];
  lote_selected: any = {};
  lotes_pedido: any = [];
  lotePedido_selected: any = "";

  constructor(
    private media: MediaMatcher,
    private changeDetectorRef: ChangeDetectorRef,
    private route: ActivatedRoute,
    private router: Router,
    public snackBar: MatSnackBar,
    private obraSrv: ObrasService,
    private pedidoSrv: PedidoService
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit() {
    this.route.data
      .subscribe((data: { obras: any[] }) => {
        this.obras = data.obras;
      });

    this.route.paramMap
      .switchMap((params: ParamMap) => {
        if (params.has("obra")) {
          this.obra_selected = params.get("obra");
          return this.obraSrv.getAcordeonManzanas(params.get("obra"));
        } else {
          return Observable.of({ datos: {} });
        }
      }).subscribe(obra => {
        console.log("obra", obra);
        this.obra = obra;
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

    if (!this.loteEstaEnPedido(lote.id_lote)) {
      this.pedidoSrv.getLote(lote.id_lote)
        .subscribe((response: any) => {
          lote.partidas = response.partidas;
          lote.insumos_extras = response.insumos_extras;
          this.lotes_pedido.push(lote);
          this.lotePedido_selected = this.lotes_pedido[this.lotes_pedido.length - 1];
          console.log(response);

        }, (error) => {

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

  countInsumosPedidoPartida = function (partida) {
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

}

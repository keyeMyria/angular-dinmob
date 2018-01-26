import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LotesService } from 'app/services/lotes.service';
import { Lote } from 'app/model/lote';

@Component({
  selector: 'app-ventas-lote',
  templateUrl: './ventas-lote.component.html',
  styleUrls: ['./ventas-lote.component.scss']
})
export class VentasLoteComponent implements OnInit {

  lote: any = { lote: {}, obra: {}, clientes: [] };
  cliente_selected: any = { pagos: [] };
  estados: any[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private loteSrv: LotesService,
  ) { }

  ngOnInit() {


    this.route.data
      .subscribe((data: { estados: any[] }) => {
        //console.log("resusltado resolve ", data);
        this.estados = data.estados;
      });

    let id = this.route.snapshot.paramMap.get('id');

    this.loteSrv.getDetallesLoteVentas(id)
      .subscribe(lote => {
        console.log("Lote OK", lote);
        this.lote = lote;
      });
  }

  seleccionarCliente(event, cliente) {
    console.log("cliente", event.checked);
    if (event.checked) {
      this.cliente_selected = cliente;
    } else {
      this.cliente_selected = { pagos: [] };
    };
    //this.cliente_selected = cliente;
  }

  totalPagosRealizados(compra) {
    //console.log("pagos realizados");
    let total = 0;
    compra.pagos.forEach(pago => {
      if (pago.fecha_pago) {
        let monto = parseFloat(pago.monto);
        if (isNaN(monto)) {
          monto = 0;
        }
        total += monto;

      }
    });
    return Math.round(total * 100) / 100;
  }

  saldoPendiente(compra) {
    //console.log("saldo pendiente");

    let valor = parseFloat(compra.valor_operacion);
    if (isNaN(valor))
      valor = 0;

    let saldo = valor - this.totalPagosRealizados(compra);
    return saldo;
  }

  gotoCliente(cliente) {
    this.router.navigate(["/editar-cliente", cliente.id_cliente]);
  }


  onFechaChange() {

  }

}

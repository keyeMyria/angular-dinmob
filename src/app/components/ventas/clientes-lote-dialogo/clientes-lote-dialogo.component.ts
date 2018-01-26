import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Cliente } from 'app/model/cliente';

@Component({
  selector: 'app-clientes-lote-dialogo',
  templateUrl: './clientes-lote-dialogo.component.html',
  styleUrls: ['./clientes-lote-dialogo.component.scss']
})
export class ClientesLoteDialogoComponent implements OnInit {
  cliente: any;
  cliente_selected: any = { pagos: [] };

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ClientesLoteDialogoComponent>
  ) { }

  ngOnInit() {
    this.cliente = this.data.cliente;
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

}

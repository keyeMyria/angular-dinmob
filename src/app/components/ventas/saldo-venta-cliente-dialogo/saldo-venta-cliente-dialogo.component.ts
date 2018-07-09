import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-saldo-venta-cliente-dialogo',
  templateUrl: './saldo-venta-cliente-dialogo.component.html',
  styleUrls: ['./saldo-venta-cliente-dialogo.component.scss']
})
export class SaldoVentaClienteDialogoComponent implements OnInit {
  showEscrituracion: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<SaldoVentaClienteDialogoComponent>,
    private router: Router
  ) { }

  ngOnInit() {
  }



  totalPagosRealizados() {
    let total = 0;

    if (this.data.compra.pagos) {
      this.data.compra.pagos.forEach(pago => {

        if (pago.id_tipo_pago < 100) {
          total += +pago.monto;
        } else if (pago.id_tipo_pago == 101) {
          // restamos las devoluciones
          total = total - pago.monto;
        }

      });
    }
    return total;
  }


  totalPagosDevoluciones() {
    let total = 0;

    if (this.data.compra.pagos) {
      this.data.compra.pagos.forEach(pago => {

        if (pago.id_tipo_pago == 101) {
          // devoluciones
          total += +pago.monto;
        }

      });
    }
    return total;
  }

  saldoPendiente() {

    let pendiente = 0;

    if (this.data.compra.valor_operacion) {

      pendiente = +this.data.compra.valor_operacion - this.totalPagosRealizados();

    }
    return pendiente;

  }

}

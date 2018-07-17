import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { ReporteService } from 'app/services/reporte.service';
import { NuevoClienteDialogoComponent } from '../nuevo-cliente-dialogo/nuevo-cliente-dialogo.component';

@Component({
  selector: 'app-clientes-lote-dialogo',
  templateUrl: './clientes-lote-dialogo.component.html',
  styleUrls: ['./clientes-lote-dialogo.component.scss']
})
export class ClientesLoteDialogoComponent implements OnInit {

  cliente_selected: any = { pagos: [] };

  //selector de clientes
  selection = new SelectionModel<any>(false);

  showEscrituracion: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ClientesLoteDialogoComponent>,
    private router: Router,
    private reporteSrv: ReporteService,
    private dialog: MatDialog,  
  ) { }

  ngOnInit() {

  }
  selectCliente(cliente) {

    //this.selection.isEmpty();
    //this.selection.hasValue();

    this.selection.toggle(cliente);
    if (this.selection.selected.length > 0) {
      this.cliente_selected = this.selection.selected[0];

    } else {
      this.cliente_selected = {};
    }

  }

  totalPagosRealizados() {
    let total = 0;

    if (this.cliente_selected.pagos) {
      this.cliente_selected.pagos.forEach(pago => {

        //solo sumamos los pagos con id_tipo_pago < 100
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

    if (this.cliente_selected.pagos) {
      this.cliente_selected.pagos.forEach(pago => {

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

    if (this.cliente_selected.valor_operacion) {

      pendiente = +this.cliente_selected.valor_operacion - this.totalPagosRealizados();

    }
    return pendiente;

  }

  reporteCliente(cliente) {

    let url = this.reporteSrv.getUrlReporteCompra(cliente.id_cliente, cliente.id_lote, cliente.id_compra);
    let link = document.createElement("a");
    link.href = url;
    link.target = "_blank";
    link.click();

  }

  agregarCliente() {
    let dialogRef = this.dialog.open(NuevoClienteDialogoComponent, {
      data: {
        lote: this.data.lote
      },
      width: "500px"
    });

  }

  editarCliente(cliente) {
    let dialogRef = this.dialog.open(NuevoClienteDialogoComponent, {
      data: {
        lote: this.data.lote
      },
      width: "700px"
    });

  }


}

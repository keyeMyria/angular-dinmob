import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Cliente } from 'app/model/cliente';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-clientes-lote-dialogo',
  templateUrl: './clientes-lote-dialogo.component.html',
  styleUrls: ['./clientes-lote-dialogo.component.scss']
})
export class ClientesLoteDialogoComponent implements OnInit {
 
  cliente_selected: any = { pagos: [] };

  //selector de clientes
  selection = new SelectionModel<any>(false);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ClientesLoteDialogoComponent>
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
        total += +pago.monto;

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



}

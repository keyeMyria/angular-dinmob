import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-ver-pedido-dialogo',
  templateUrl: './ver-pedido-dialogo.component.html',
  styleUrls: ['./ver-pedido-dialogo.component.scss']
})
export class VerPedidoDialogoComponent implements OnInit {

  insumos_acumulados: any = [];
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<VerPedidoDialogoComponent>,

  ) { }

  ngOnInit() {
    this.acumularInsumos();
  }

  acumularInsumos() {
    this.data.insumos.forEach((insumo: any) => {
      let insum_acum = this.insumos_acumulados.find(insumo_acumulado => { insumo_acumulado.id_insumo == insumo.id_insumo });
      if (insum_acum) {
        insum_acum.cantidad += insumo.cantidad;
      } else {
        this.insumos_acumulados.push(insumo);
      }
    });
  }


}

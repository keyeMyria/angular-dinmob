import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormGroup, FormControl, FormArray, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-ver-pedido-dialogo',
  templateUrl: './ver-pedido-dialogo.component.html',
  styleUrls: ['./ver-pedido-dialogo.component.scss']
})
export class VerPedidoDialogoComponent implements OnInit {

  //insumos_acumulados: any = [];
  form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<VerPedidoDialogoComponent>,
    private fb: FormBuilder,

  ) {
    this.form = this.fb.group({
      fecha: [data.pedido.fecha],
      obra: [data.pedido.obra],
      usuario: [data.pedido.usuario],
      descripcion: [data.pedido.descripcion]
    });
  }

  ngOnInit() {
    //this.acumularInsumos();
  }

  /*   private clonar(objeto): any {
  
      let strObject = JSON.stringify(objeto);
      return JSON.parse(strObject);
  
    } */

  /*   acumularInsumos() {
  
      //ordenamos por id_insumo
      let ordenados = this.data.insumos.sort(function (a, b) {
        return a.id_insumo - b.id_insumo;
      });
  
      this.insumos_acumulados = [];
      let i = 0;
  
      //recorrido para ir sumando cantidades
      while (i < ordenados.length - 1) {
        let j = i + 1;
        let insumo = this.clonar(ordenados[i]);
        insumo.cantidad = Number(insumo.cantidad);
        this.insumos_acumulados.push(insumo);
        while (j < ordenados.length && ordenados[i].id_insumo == ordenados[j].id_insumo) {
          this.insumos_acumulados[this.insumos_acumulados.length - 1].cantidad += +ordenados[j].cantidad;
          j++;
        }
        i = j;
      }
  
      //añadimos el ultimo insumo del array
      if (i == ordenados.length - 1) {
        let insumo = this.clonar(ordenados[ordenados.length - 1]);
        insumo.cantidad = Number(insumo.cantidad);
        this.insumos_acumulados.push(insumo);
      }
   
  
    }
  */

}

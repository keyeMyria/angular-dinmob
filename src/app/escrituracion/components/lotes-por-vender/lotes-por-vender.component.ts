import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lotes-por-vender',
  templateUrl: './lotes-por-vender.component.html',
  styleUrls: ['./lotes-por-vender.component.scss']
})
export class LotesPorVenderComponent implements OnInit {
  lotes = [
    {
      id_cliente: "1",
      manzana: "Mazana 1",
      lote: "Lote 2",
      precio: "700000",
      id_estado: "1",
      fecha_estado: "2018-06-21",
      estado_venta: "Libre"
    },
    {
      id_cliente: "2",
      manzana: "Mazana 2",
      lote: "Lote 1",
      precio: "700000",
      id_estado: "1",
      fecha_estado: "2018-03-10",
      estado_venta: "Libre"
    },
    {
      id_cliente: "3",
      manzana: "Mazana 3",
      lote: "Lote 4",
      precio: "700000",
      id_estado: "0",
      fecha_estado: "2018-04-20",
      estado_venta: "Contrato"
    },
    {
      id_cliente: "4",
      manzana: "Mazana 4",
      lote: "Lote 5",
      precio: "700000",
      id_estado: "1",
      fecha_estado: "2018-03-01",
      estado_venta: "Libre"
    },
    {
      id_cliente: "5",
      manzana: "Mazana 5",
      lote: "Lote 6",
      precio: "700000",
      id_estado: "0",
      fecha_estado: "2018-06-21",
      estado_venta: "Contrato"
    }
  ]

  constructor() { }

  ngOnInit() {
  }

}

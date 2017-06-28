import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {

  manzanas = [
    {
      data: {
        nombre: "Manzana 1",
        id_manzana: "1234"
      },
      children: [
        {
          data: {
            nombre: "Lote 1",
            id: "1",
            code: "M1L1"
          }
        },
        {
          data: {
            nombre: "Lote 2",
            id: "2",
            code: "M1L2"
          }
        }
      ]
    },
    {
      data: {
        nombre: "Manzana 2",
        id_manzana: "1234"
      },
      children: [
        {
          data: {
            nombre: "Lote 1",
            id: "1",
            code: "M1L1"
          }
        },
        {
          data: {
            nombre: "Lote 2",
            id: "2",
            code: "M1L2"
          }
        }
      ]
    }

  ];
  constructor() { }

  ngOnInit() {
  }

}

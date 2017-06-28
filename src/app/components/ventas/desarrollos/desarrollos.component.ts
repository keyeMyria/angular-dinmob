import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-desarrollos',
  templateUrl: './desarrollos.component.html',
  styleUrls: ['./desarrollos.component.scss']
})
export class DesarrollosComponent implements OnInit {
  lotes: any[] = [];

  constructor() { }

  ngOnInit() {

    this.lotes = [
      { nombre: "Lote 1", manzana: "Manzana 1", precio: 1000000.00, estado: "Libre" },
      { nombre: "Lote 2", manzana: "Manzana 1", precio: 1000000.00, estado: "Libre" },
      { nombre: "Lote 3", manzana: "Manzana 1", precio: 1000000.00, estado: "Libre" },
      { nombre: "Lote 4", manzana: "Manzana 1", precio: 1000000.00, estado: "Libre" },
      { nombre: "Lote 5", manzana: "Manzana 1", precio: 1000000.00, estado: "Libre" },
      { nombre: "Lote 6", manzana: "Manzana 1", precio: 1000000.00, estado: "Libre" }
    ];
  }

}

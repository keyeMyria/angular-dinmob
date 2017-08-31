import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate,
  keyframes
} from "@angular/animations";
import { ObrasService } from "app/services/obras.service";

@Component({
  selector: 'app-desarrollos',
  templateUrl: './desarrollos.component.html',
  styleUrls: ['./desarrollos.component.scss'],

})
export class DesarrollosComponent implements OnInit {
  lotes: any[] = [];
  obras: any = [];
  obra: any = {
    datos: {}
  };
  obras_selected: any = {};
 
  constructor(private obraSrv: ObrasService,) { }



  ngOnInit() {

    this.obraSrv.loadFullObra(58)
    .subscribe(response => {
      this.obra = response;
      console.log("obra", this.obra);
    });

    this.obraSrv.getObrasUsuario(18)
    .subscribe(response => {
      this.obras = response;
    });
  

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

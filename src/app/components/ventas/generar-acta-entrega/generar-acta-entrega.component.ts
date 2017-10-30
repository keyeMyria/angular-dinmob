import { Component, OnInit } from '@angular/core';
import { ActaEntregaService } from 'app/services/acta-entrega.service';
import { ActaEntrega } from 'app/model/acta-entrega';

@Component({
  selector: 'app-generar-acta-entrega',
  templateUrl: './generar-acta-entrega.component.html',
  styleUrls: ['./generar-acta-entrega.component.scss']
})
export class GenerarActaEntregaComponent implements OnInit {

  equipamiento: string[] = [];
  areas: string[] = [];
  equipo: string;
  area: string;
  agregar: any;

  constructor() {
    this.agregar ="";
   }

  ngOnInit() {
  }

  addArea() {
    this.areas.unshift(this.area);
    this.area = "";
  }

  addEquipo() {
    this.equipamiento.unshift(this.equipo);
    this.equipo = "";
  }

  delEquipo(equipo) {
    let i = this.equipamiento.indexOf(equipo);
    this.equipamiento.splice(i, 1);
  }
  delArea(area) {
    let i = this.areas.indexOf(area);
    this.areas.splice(i, 1);
  }

}

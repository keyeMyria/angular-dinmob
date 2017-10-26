import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-crear-acta-entrega',
  templateUrl: './crear-acta-entrega.component.html',
  styleUrls: ['./crear-acta-entrega.component.scss']
})
export class CrearActaEntregaComponent implements OnInit {

  equipamiento: string[] = [];
  areas: string[] = [];
  equipo: string;
  area: string;


  constructor() { }

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

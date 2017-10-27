import { Component, OnInit, ViewChild } from '@angular/core';
import { ActaEntregaService } from 'app/services/acta-entrega.service';
import { ActaEntrega } from 'app/model/acta-entrega';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-crear-acta-entrega',
  templateUrl: './crear-acta-entrega.component.html',
  styleUrls: ['./crear-acta-entrega.component.scss']
})
export class CrearActaEntregaComponent implements OnInit {
  @ViewChild('formCreateActa') formCreateActa: NgForm;

  equipamiento: string[] = [];
  areas: string[] = [];
  equipo: string;
  area: string;
  acta: ActaEntrega = new ActaEntrega();


  constructor(
    private actaSrv: ActaEntregaService
  ) { }

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

  createActa() {
    console.log("createActa");

    this.actaSrv.createActa(this.acta, this.areas, this.equipamiento)
      .subscribe(res => {
        console.log("response", res);

        this.acta = new ActaEntrega();        
        this.formCreateActa.reset();
      });
  }

}

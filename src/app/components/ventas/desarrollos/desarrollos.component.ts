import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate,
  keyframes
} from "@angular/animations";

@Component({
  selector: 'app-desarrollos',
  templateUrl: './desarrollos.component.html',
  styleUrls: ['./desarrollos.component.scss'],
  animations: [
    trigger('miAnimacion', [

      state('small', style({
        transform: 'scale(1)',
      })),
      state('large', style({
        transform: 'scale(1.5)',
      })),

      transition('small <=> large', animate('300ms ease-in', keyframes([
        style({ opacity: 0, transform: 'translateY(-75%)', offset: 0 }),
        style({ opacity: 1, transform: 'translateY(35%)', offset: 0.5 }),
        style({ opacity: 1, transform: 'translateY(0)', offset: 1 }),
      ])

        /*  style({
            transform: 'translateY(40px)'
          })*/

      )),

    ]),
  ]
})
export class DesarrollosComponent implements OnInit {
  lotes: any[] = [];
  collapse: boolean = false;
  state:string="small";
  constructor() { }

  animar() {
    this.state = (this.state === "small" ? "large" : "small");
  }

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

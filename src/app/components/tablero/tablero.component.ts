import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-tablero',
  templateUrl: './tablero.component.html',
  styleUrls: ['./tablero.component.scss']
})
export class TableroComponent implements OnInit {

  

  constructor(private router: Router) { }

  ngOnInit() {
  }

  gotoClientes() {
    this.router.navigate(["/clientes"]);
  }

  gotoUsuarios() {
    this.router.navigate(["/usuarios"]);
  }

  gotoObras() {
    this.router.navigate(["/obras"]);
  }

  gotoPrototipo() {
    this.router.navigate(["/prototipos"]);
  }

  gotoDesarrollos() {
    this.router.navigate(["/desarrollos"]);
  }

    gotoEstructura() {
    this.router.navigate(["/estructura-obra"]);
  }

  gotoMapas() {
    this.router.navigate(["/mapas-ventas"]);
  }

  gotoMapasAvances() {
    this.router.navigate(["/mapas-avances"]);
  }

  gotoAvances() {
    this.router.navigate(["/avances"]);
  }


 

}

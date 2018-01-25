import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from 'app/services/auth.service';

@Component({
  selector: 'app-tablero',
  templateUrl: './tablero.component.html',
  styleUrls: ['./tablero.component.scss']
})
export class TableroComponent implements OnInit {

  usuario: any;
  obra_default: any;


  constructor(
    private router: Router,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.usuario = this.auth.getUsuario();

    if (this.usuario.id_obra_default) {
      this.obra_default = { obra: this.usuario.id_obra_default };
    } else {
      this.obra_default = {};

    }
  }

  gotoClientes() {
    this.router.navigate(["/clientes", this.obra_default]);
  }

  gotoUsuarios() {
    this.router.navigate(["/usuarios"]);
  }

  gotoObras() {
    this.router.navigate(["/obras"]);
  }

  gotoPrototipo() {
    this.router.navigate(["/prototipos", this.obra_default]);
  }

  gotoDesarrollos() {
    this.router.navigate(["/desarrollos", this.obra_default]);
  }

  gotoEstructura() {
    this.router.navigate(["/estructura-obra", this.obra_default]);
  }

  gotoAlertaClientes() {
    this.router.navigate(["alerta-clientes", this.obra_default]);
  }

  gotoClienteSinLote() {
    this.router.navigate(["/clientes-sin-lote", this.obra_default]);
  }


  gotoMapas() {
    this.router.navigate(["/mapas-ventas", this.obra_default]);
  }

  gotoMapasAvances() {
    this.router.navigate(["/mapas-avances", this.obra_default]);
  }

  gotoAvances() {
    this.router.navigate(["/avances", this.obra_default]);
  }




}

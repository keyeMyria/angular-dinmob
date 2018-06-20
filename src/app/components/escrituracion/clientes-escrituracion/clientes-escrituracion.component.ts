import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from "@angular/router";

@Component({
  selector: 'app-clientes-escrituracion',
  templateUrl: './clientes-escrituracion.component.html',
  styleUrls: ['./clientes-escrituracion.component.scss']
})
export class ClientesEscrituracionComponent implements OnInit {

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
  }

  editarCliente() {
    this.router.navigate(["escrituracion/editar"]);
  }

}

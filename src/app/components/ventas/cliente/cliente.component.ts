import { Component, OnInit } from '@angular/core';
import { ClientesService } from "app/services/clientes.service";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { Location } from "@angular/common";

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss']
})
export class ClienteComponent implements OnInit {
  cliente;

  constructor(
    private clientesService: ClientesService,
    private route: ActivatedRoute,
    private location: Location) { }

  ngOnInit() {
/*    this.route.paramMap
      .switchMap((params: ParamMap) => this.clientesService.getCliente(+params.get('id')))
      .subscribe(cliente => this.cliente = cliente);*/
  }

}

import { Component, OnInit } from '@angular/core';
import { Cliente } from "app/model/cliente";
import { ClientesService } from "app/services/clientes.service";

@Component({
  selector: 'app-nuevo-cliente',
  templateUrl: './nuevo-cliente.component.html',
  styleUrls: ['./nuevo-cliente.component.scss']
})
export class NuevoClienteComponent implements OnInit {

  cliente: Cliente;// = new Cliente();
  displayMode: string = 'default';
  multi: boolean = false;
  hideToggle: boolean = false;
  showPanel3 = true;

  constructor(public clienteSrv: ClientesService) {
    this.cliente = new Cliente();
    this.cliente.persona_moral = "0";
  }

  ngOnInit() {
  }

  createCliente() {
    this.clienteSrv.createCliente(this.cliente)
      .subscribe(res => console.log("Cliente Agregado", res));
      

  }
}

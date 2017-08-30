import { Component, OnInit } from '@angular/core';
import { Cliente } from "app/model/cliente";


@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.scss']
})
export class EditarClienteComponent implements OnInit {

  cliente: Cliente;

  constructor() { }

  ngOnInit() {
    this.cliente = new Cliente();
    this.cliente.persona_moral = "0";
    
  }

}

import { Component, OnInit } from '@angular/core';
import { Cliente } from "app/model/cliente";
import { ClientesService } from "app/services/clientes.service";
import createNumberMask from 'text-mask-addons/dist/createNumberMask';

@Component({
  selector: 'app-nuevo-cliente',
  templateUrl: './nuevo-cliente.component.html',
  styleUrls: ['./nuevo-cliente.component.scss']
})
export class NuevoClienteComponent implements OnInit {
  
  public maskRFC = [/[A-Z0-9]/i,/[A-Z0-9]/i,/[A-Z0-9]/i,/[A-Z0-9]/i,'-', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, '-',/[A-Z0-9]/i,/[A-Z0-9]/i,/[A-Z0-9]/i, ]
  public maskCURP = [/[A-Z1-9]/i, /[A-Z1-9]/i, /[A-Z1-9]/i, /[A-Z1-9]/i, '-', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, '-', /[A-Z]/i, '-', /[A-Z]/i, /[A-Z]/i, '-', /[A-Z1-9]/i, /[A-Z1-9]/i, /[A-Z1-9]/i, '-', /[A-Z1-9]/i, /[A-Z]/i]
  public maskCP = [/\d/, /\d/, /\d/, /\d/, /\d/]
  public maskPhone = ['(',/\d/,/\d/,/\d/,')',/\d/,/\d/,/\d/,'-',/\d/,/\d/,/\d/,/\d/]
  public maskRFCM = [/[A-Z0-9]/i,/[A-Z0-9]/i,/[A-Z0-9]/i,'-', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, '-',/[A-Z0-9]/i,/[A-Z0-9]/i,/[A-Z0-9]/i, ]

 /*  [/[A-Z]/i, /\d/, /[A-Z]/i, ' ', /\d/, /[A-Z]/i, /\d/] */
  
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

  onFechaChange(){
    
  }
}

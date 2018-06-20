import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-editar-cliente-escrituracion',
  templateUrl: './editar-cliente-escrituracion.component.html',
  styleUrls: ['./editar-cliente-escrituracion.component.scss']
})
export class EditarClienteEscrituracionComponent implements OnInit {
  public maskCURP = [/[A-Z0-9]/i, /[A-Z0-9]/i, /[A-Z0-9]/i, /[A-Z0-9]/i, '-', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, '-', /[A-Z]/i, '-', /[A-Z]/i, /[A-Z]/i, '-', /[A-Z0-9]/i, /[A-Z0-9]/i, /[A-Z0-9]/i, '-', /[A-Z0-9]/i, /[A-Z0-9]/i]
  public maskPhone = ['(', /\d/, /\d/, /\d/, ')', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]

  constructor() { }

  ngOnInit() {
  }

}

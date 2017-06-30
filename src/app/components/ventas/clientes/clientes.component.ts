import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes } from "@angular/animations";
import { MenuItem, TreeNode } from "primeng/components/common/api";
import { ClientesService } from "app/services/clientes.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss'],
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
export class ClientesComponent implements OnInit {

  lotes: Lote[] = [
    { id_lote: 1, nombre: "Lote 1", code: "M1L1" },
    { id_lote: 2, nombre: "Lote 2", code: "M1L2" },
    { id_lote: 3, nombre: "Lote 3", code: "M1L3" },
    { id_lote: 4, nombre: "Lote 4", code: "M1L4" },
    { id_lote: 5, nombre: "Lote 5", code: "M1L5" }
  ];

  manzanas = [
    {
      data: {
        nombre: "Manzana 1",
        id_manzana: "1234"
      },
      children: [
        {
          data: {
            nombre: "Lote 1",
            id: "1",
            code: "M1L1"
          }
        },
        {
          data: {
            nombre: "Lote 2",
            id: "2",
            code: "M1L2"
          }
        }
      ]
    },
    {
      data: {
        nombre: "Manzana 2",
        id_manzana: "1234"
      },
      children: [
        {
          data: {
            nombre: "Lote 1",
            id: "1",
            code: "M1L1"
          }
        },
        {
          data: {
            nombre: "Lote 2",
            id: "2",
            code: "M1L2"
          }
        }
      ]
    }

  ];

  loteSelected: Lote = null;

  state: string = "small";

  clientes: any[];

  constructor(
    private router: Router,
    private clientesService: ClientesService
  ) { }

  ngOnInit() {
    this.clientesService.getClientes()
      .subscribe(res => this.clientes = res);
  }



  acciones: MenuItem = [
    { label: 'View', icon: 'fa-search', command: (event) => this.alertLote(this.loteSelected) },
    { label: 'Delete', icon: 'fa-close', command: (event) => this.alertLote(this.loteSelected) }
  ];

  alertLote(lote) {
    alert(lote.nombre);
  }

  cbClick(event) {
    event.stopPropagation();
  }

  animar() {
    this.state = (this.state === "small" ? "large" : "small");
  }

  gotoCliente(cliente) {
    this.router.navigate(['/cliente', cliente.id_cliente]);
  }

}



export interface Lote {
  nombre: string;
  code: string;
  id_lote: number;
}
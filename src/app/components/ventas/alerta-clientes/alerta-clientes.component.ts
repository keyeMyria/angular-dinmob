import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-alerta-clientes',
  templateUrl: './alerta-clientes.component.html',
  styleUrls: ['./alerta-clientes.component.scss']
})
export class AlertaClientesComponent implements OnInit {
  clientes: any;
  cliente: any;
  obras: any = [];
  obra: any = {};
  obra_selected: string = "";


  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.route.data
      .subscribe((data: { obras: any[] }) => {
        //console.log("resusltado resolve ", data);
        this.obras = data.obras;
      });
  }

  editarCliente(cliente) {
    this.router.navigate(["/editar-cliente", cliente.id_cliente]);
  }





}

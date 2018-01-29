import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { ClientesService } from 'app/services/clientes.service';
import { of } from "rxjs/observable/of";


@Component({
  selector: 'app-alerta-clientes',
  templateUrl: './alerta-clientes.component.html',
  styleUrls: ['./alerta-clientes.component.scss']
})
export class AlertaClientesComponent implements OnInit {
  clientes: any[] = [];
  obras: any = [];

  obra_selected: string = "";


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private clienteSrv: ClientesService
  ) { }

  ngOnInit() {

    this.route.data
      .subscribe((data: { obras: any[] }) => {
        //console.log("resultado resolve ", data);
        this.obras = data.obras;
      });

      this.route.paramMap
      .switchMap((params: ParamMap) => {
        if (params.has("obra")) {
          this.obra_selected = params.get("obra");
          return this.clienteSrv.getAlertasObra(params.get("obra"));
        } else {
          return of([]);
        }

      }).subscribe(clientes => {
        this.clientes = clientes;
      });


  }

  editarCliente(cliente) {
    this.router.navigate(["/editar-cliente", cliente.id_cliente]);
  }

  
  cargarObra(id_obra) {

    if (id_obra) {
      this.router.navigate([".", { obra: id_obra }]);
    } else {
      this.router.navigate([".", {}]);

    }

  }





}

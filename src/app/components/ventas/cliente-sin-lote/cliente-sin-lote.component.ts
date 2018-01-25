import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cliente-sin-lote',
  templateUrl: './cliente-sin-lote.component.html',
  styleUrls: ['./cliente-sin-lote.component.scss']
})
export class ClienteSinLoteComponent implements OnInit {
  cliente: any;
  clientes: any;
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

  cargarObra(id_obra) {

    if (id_obra) {
      this.router.navigate([".", { obra: id_obra }]);
    } else {
      this.router.navigate([".", {}]);
    }

  }

  editarCliente(cliente) {
    this.router.navigate(["/editar-cliente", cliente.id_cliente]);
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientesService } from 'app/services/clientes.service';

@Component({
  selector: 'app-cliente-sin-lote',
  templateUrl: './cliente-sin-lote.component.html',
  styleUrls: ['./cliente-sin-lote.component.scss']
})
export class ClienteSinLoteComponent implements OnInit {
 
  clientes: any[]=[];
 

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private clienteSrv:ClientesService
  ) { }

  ngOnInit() {
   
      this.clienteSrv.getClientesSinLote()
      .subscribe(clientes=>{
        this.clientes=clientes;
      });
  }


  editarCliente(cliente) {
    this.router.navigate(["/editar-cliente", cliente.id_cliente]);
  }

}

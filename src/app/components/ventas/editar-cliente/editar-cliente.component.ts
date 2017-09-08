import { Component, OnInit } from '@angular/core';
import { Cliente } from "app/model/cliente";
import { MdDialog, MdSnackBar } from "@angular/material";
import { AgregarDocumentoDialogoComponent } from "app/components/ventas/agregar-documento-dialogo/agregar-documento-dialogo.component";
import { ActivatedRoute, Router, ParamMap } from "@angular/router";
import "rxjs/add/operator/switchMap";
import { ClientesService } from "app/services/clientes.service";

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.scss']
})
export class EditarClienteComponent implements OnInit {

  cliente: Cliente = new Cliente();
  selectedOption: string;

  constructor(
    private clienteSrv: ClientesService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MdDialog,
    public snackBar: MdSnackBar
  ) { }

  ngOnInit() {
    /* this.cliente = new Cliente();
    this.cliente.persona_moral = "0"; */
    this.route.paramMap
      .switchMap((params: ParamMap) =>
        this.clienteSrv.getCliente(params.get('id')))
      .subscribe(res => {
        this.cliente = res;
      });


  }

  agregarDocumento() {

    console.log();
    let dialogRef = this.dialog.open(AgregarDocumentoDialogoComponent, {
      data: {
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.selectedOption = result;
    });
  }

  updateCliente() {
    this.clienteSrv.updateCliente(this.cliente.id_cliente, this.cliente)
      .subscribe(res => {
        this.cliente = res;
        this.snackBar.open("Cliente Actualizado", "Cerrar", {
          duration: 2000
        });

      });

  }

}

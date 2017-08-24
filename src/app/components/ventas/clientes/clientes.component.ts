import { Component, OnInit } from '@angular/core';
import { MdDialog, MdSnackBar } from '@angular/material';
import { EditarClienteDialogoComponent } from "app/components/ventas/editar-cliente-dialogo/editar-cliente-dialogo.component";
import { Cliente } from "app/model/cliente";
import { ClientesService } from "app/services/clientes.service";
import { ConfirmarBorradoDialogoComponent } from "app/components/admin/confirmar-borrado-dialogo/confirmar-borrado-dialogo.component";

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss'],
})

export class ClientesComponent implements OnInit {
  loading: boolean;
  clientes: Cliente[];


  constructor(private clienteSrv: ClientesService, public dialog: MdDialog, public snackBar: MdSnackBar
  ) { }

  ngOnInit() {
    this.loading = true;
    this.clienteSrv.getClientes()
      .subscribe(res => {
        this.clientes = res;
        this.loading = false;
      });
    
  }

  editarCliente(cliente: Cliente) {
    
    
        let copia = Cliente.copiar(cliente);
    
        let dialogRef = this.dialog.open(EditarClienteDialogoComponent, {
          data: { cliente: copia }
        });
    
        dialogRef.afterClosed().subscribe(result => {
    
          if (result === true) {
            this.loading = true;
    
            this.clienteSrv.updateCliente(cliente.id_cliente, copia)
              .subscribe(res => {
    
                let i = this.clientes.indexOf(cliente);
                this.clientes[i] = res;
                this.loading = false;
                this.snackBar.open("Cliente Actualizado", "Cerrar", {
                  duration: 2000
                });
    
              });
    
    
          }
    
        });
      }
    
    
      delCliente(cliente: Cliente) {
    
        let newpassword: string;
    
        let dialogRef = this.dialog.open(ConfirmarBorradoDialogoComponent, {
          data: {
            title: "Eliminar cliente",
            content: `¿Desea eliminar el cliente: ${cliente.nombre}?`
          }
        });
    
        dialogRef.afterClosed().subscribe(result => {
    
          if (result === true) {
            this.loading = true;
    
            this.clienteSrv.delCliente(cliente.id_cliente)
              .subscribe(res => {
    
                if (res.count === 1) {
                  let i = this.clientes.indexOf(cliente);
                  this.clientes.splice(i, 1);
    
    
                  this.loading = false;
                  this.snackBar.open("Cliente Eliminado", "Cerrar", {
                    duration: 2000
                  });
    
                } else {
                  this.snackBar.open("Ha ocurrido un error", "Cerrar", {
                    duration: 2000
                  });
                }
    
              });
    
    
          }
    
        });
    
      }
    

}




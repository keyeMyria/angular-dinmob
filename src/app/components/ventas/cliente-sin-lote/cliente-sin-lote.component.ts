import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientesService } from 'app/services/clientes.service';
import { ConfirmarBorradoDialogoComponent } from 'app/components/admin/confirmar-borrado-dialogo/confirmar-borrado-dialogo.component';
import { MatSnackBar, MatDialog } from '@angular/material';

@Component({
  selector: 'app-cliente-sin-lote',
  templateUrl: './cliente-sin-lote.component.html',
  styleUrls: ['./cliente-sin-lote.component.scss']
})
export class ClienteSinLoteComponent implements OnInit {

  clientes: any[] = [];
  loading: boolean;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private clienteSrv: ClientesService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.loading = true;
    this.clienteSrv.getClientesSinLote()
      .subscribe(clientes => {
        this.clientes = clientes;
        this.loading = false;
      });
  }


  editarCliente(cliente) {
    this.router.navigate(["/editar-cliente", cliente.id_cliente]);
  }

  delCliente(cliente) {
    let dialogRef = this.dialog.open(ConfirmarBorradoDialogoComponent, {
      data: {
        title: "Eliminar Cliente",
        content: `¿Desea eliminar el cliente: ${cliente.nombre}?`
      },
      width: "500px"
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result === true) {
        this.loading = true;

        this.clienteSrv.delCliente(cliente.id_cliente)
          .subscribe(res => {

            this.loading = false;
            if (res.count === 1) {

              let i = this.clientes.indexOf(cliente);
              this.clientes.splice(i, 1);

              this.snackBar.open("Cliente Eliminada", "", {
                duration: 2000
              });

            } else {
              this.snackBar.open("Ha ocurrido un error", "", {
                duration: 2000
              });
            }

          }, (error) => {
            this.loading = false;
            this.snackBar.open("Ha ocurrido un error de conexión. Inténtelo más tarde", "", {
              duration: 2000
            });
          });


      }

    });
  }

}

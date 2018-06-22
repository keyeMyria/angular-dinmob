
import {switchMap} from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { EditarClienteComponent } from "app/components/ventas/editar-cliente/editar-cliente.component";
import { Cliente } from "app/model/cliente";
import { ClientesService } from "app/services/clientes.service";
import { ConfirmarBorradoDialogoComponent } from "app/components/admin/confirmar-borrado-dialogo/confirmar-borrado-dialogo.component";
import { ObrasService } from "app/services/obras.service";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { AuthService } from "app/services/auth.service";
import { Observable ,  of } from 'rxjs';
import { VerDatosFirmaDialogoComponent } from 'app/components/ventas/ver-datos-firma-dialogo/ver-datos-firma-dialogo.component';
import { VerCedulaFiscalDialogoComponent } from 'app/components/ventas/ver-cedula-fiscal-dialogo/ver-cedula-fiscal-dialogo.component';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss'],
})

export class ClientesComponent implements OnInit {
  //clientes$: Observable<Cliente[]>;
  clientes: any = [];
  obras: any = [];
  obra_selected: string = "";





  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private auth: AuthService,
    private obraSrv: ObrasService,
    private clienteSrv: ClientesService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.route.data
      .subscribe((data: { obras: any[] }) => {
        //console.log("resultado resolve ", data);
        this.obras = data.obras;
      });

    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        if (params.has("obra")) {
          this.obra_selected = params.get("obra");
          return this.clienteSrv.getClientesObra(params.get("obra"));
        } else {
          return of([]);
        }

      })).subscribe(clientes => {
        this.clientes = clientes;
      });






  }


  print() {
    //console.log("paramMap(obra)", this.route.snapshot.paramMap.get("obra"));
    console.log("observable", this.clientes);

  }

  editarCliente(cliente) {
    this.router.navigate(["/editar-cliente", cliente.id_cliente]);
  }

  agregarCliente() {
    this.router.navigate(["/nuevo-cliente"]);
  }


  cargarObra(id_obra) {

    if (id_obra) {
      this.router.navigate([".", { obra: id_obra }]);
    } else {
      this.router.navigate([".", {}]);

    }

  }

  verCelulaFiscal(cliente: Cliente) {
    console.log("cliente", cliente);

    let dialogRef = this.dialog.open(VerCedulaFiscalDialogoComponent, {
      data: {
        cliente: cliente,
      },
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {

    });

  }

  verDatosFirma(cliente) {
    console.log("cliente", cliente);
    let dialogRef = this.dialog.open(VerDatosFirmaDialogoComponent, {
      data: {
        cliente: cliente
      },
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {

    });

  }

  /*  editarCliente(cliente: Cliente) {
     
     
         let copia = Cliente.copiar(cliente);
     
         let dialogRef = this.dialog.open(EditarClienteDialogoComponent, {
           data: { cliente: copia }
         });
     
         dialogRef.afterClosed().subscribe(result => {
     
           if (result === true) {
     
             this.clienteSrv.updateCliente(cliente.id_cliente, copia)
               .subscribe(res => {
     
                 let i = this.clientes.indexOf(cliente);
                 this.clientes[i] = res;
                 this.snackBar.open("Cliente Actualizado", "Cerrar", {
                   duration: 2000
                 });
     
               });
     
     
           }
     
         });
       } */


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

        this.clienteSrv.delCliente(cliente.id_cliente)
          .subscribe((res: any) => {

            if (res.count === 1) {
              // let i = this.clientes.indexOf(cliente);
              //this.clientes.splice(i, 1);


              this.snackBar.open("Cliente Eliminado", "", {
                duration: 2000,
                panelClass: ["bg-success", "text-white"]
              });

            } else {
              this.snackBar.open("Ha ocurrido un error", "", {
                duration: 3000,
                panelClass: ["bg-danger", "text-white"]
              });
            }

          });


      }

    });

  }


}




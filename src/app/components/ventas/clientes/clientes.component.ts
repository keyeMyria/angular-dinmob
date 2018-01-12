import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { EditarClienteComponent } from "app/components/ventas/editar-cliente/editar-cliente.component";
import { Cliente } from "app/model/cliente";
import { ClientesService } from "app/services/clientes.service";
import { ConfirmarBorradoDialogoComponent } from "app/components/admin/confirmar-borrado-dialogo/confirmar-borrado-dialogo.component";
import { ObrasService } from "app/services/obras.service";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { AuthService } from "app/services/auth.service";
import { Usuario } from "app/model/usuario";
import { ClienteHelperService } from 'app/utils/cliente-helper.service';
import { Observable } from 'rxjs/Observable';
import { of } from "rxjs/observable/of";

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss'],
})

export class ClientesComponent implements OnInit {


  usuario: Usuario;
  loading: boolean;
  clientes$: Observable<Cliente[]>;
  obras: any = [];
  obra: any = {
    datos: {}
  };
  obra_selected: string = "";



  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private auth: AuthService,
    private obraSrv: ObrasService,
    private clienteHlp: ClienteHelperService,
    private clienteSrv: ClientesService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    console.log("paramMap(obra)", this.route.snapshot.paramMap.get("obra"));

    this.usuario = this.auth.getUsuario();

    //this.loading = true;
    this.clientes$ = this.route.paramMap
      .switchMap((params: ParamMap) => {
        if (params.has("obra")) {
          return this.clienteSrv.getClientesObra(params.get("obra"));
        } else {
          return of([]);
        }

      });

    /*  this.clienteSrv.getClientes(); */

    this.obraSrv.getObrasUsuario(this.usuario.id_usuario)
      .subscribe(response => {
        this.obras = response;
      });

  }


  print() {
    //console.log("paramMap(obra)", this.route.snapshot.paramMap.get("obra"));
    console.log("observable", this.clientes$);

  }

  editarCliente(cliente) {
    this.router.navigate(["/editar-cliente", cliente.id_cliente]);
  }

  agregarCliente(cliente) {
    this.router.navigate(["/nuevo-cliente"]);
  }


  cargarObra(id_obra) {

    if (id_obra) {
      this.router.navigate([".", { obra: id_obra }]);
    } else {
      this.router.navigate([".", {}]);

    }

  }

  /*  editarCliente(cliente: Cliente) {
     
     
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
        this.loading = true;

        this.clienteSrv.delCliente(cliente.id_cliente)
          .subscribe(res => {

            if (res.count === 1) {
              // let i = this.clientes.indexOf(cliente);
              //this.clientes.splice(i, 1);


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




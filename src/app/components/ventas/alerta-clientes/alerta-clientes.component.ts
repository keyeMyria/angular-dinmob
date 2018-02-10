import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { ClientesService } from 'app/services/clientes.service';
import { of } from "rxjs/observable/of";
import { ConfirmarDeshabilitarAlertaDialogoComponent } from 'app/components/ventas/confirmar-deshabilitar-alerta-dialogo/confirmar-deshabilitar-alerta-dialogo.component';
import { MatSnackBar, MatDialog } from '@angular/material';


@Component({
  selector: 'app-alerta-clientes',
  templateUrl: './alerta-clientes.component.html',
  styleUrls: ['./alerta-clientes.component.scss']
})
export class AlertaClientesComponent implements OnInit {
  clientes: any[] = [];
  obras: any = [];
  obra_selected: string = "";
  loading: boolean;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private clienteSrv: ClientesService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.loading = true;
    this.route.data
      .subscribe((data: { obras: any[] }) => {
        this.obras = data.obras;
      });


    this.clienteSrv.getAlertas()
      .subscribe(clientes => {
        this.clientes = clientes;
        this.loading = false;
      }, (error) => {
        this.loading = false;
      });

    /*     this.route.paramMap
          .switchMap((params: ParamMap) => {
            if (params.has("obra")) {
              this.obra_selected = params.get("obra");
    
              return this.clienteSrv.getAlertas();
            } else {
              return of([]);
            }
          }).subscribe(clientes => {
            this.clientes = clientes;
            this.loading = false;
          }); */


  }

  editarAlerta(cliente) {
    this.router.navigate(["/editar-cliente", cliente.id_cliente]);
  }

/* 
  cargarObra(id_obra) {

    if (id_obra) {
      this.router.navigate([".", { obra: id_obra }]);
    } else {
      this.router.navigate([".", {}]);

    }

  } */


  deshabilitarAlerta(cliente) {
    let dialogRef = this.dialog.open(ConfirmarDeshabilitarAlertaDialogoComponent, {
      data: {
        title: "Deshabilitar Alerta",
        content: `¿Desea deshabilitar la alerta del cliente: ${cliente.nombre}?`
      },
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result === true) {
        this.loading = true;
        this.clienteSrv.deshabilitarAlerta(cliente.id_cliente)
          .subscribe(res => {
            this.loading = false;
            let i = this.clientes.indexOf(cliente);
            this.clientes.splice(i, 1);
            this.snackBar.open("Alerta Deshabilitada", "", {
              duration: 2000,
              panelClass: ["bg-success", "text-white"]
            });
          }, (error) => {
            this.loading = false;
            this.snackBar.open("Ha ocurrido un error de conexión. Inténtelo más tarde", "", {
              duration: 3000,
              panelClass: ["bg-danger", "text-white"]
            });
          });


      }

    });

  }





}

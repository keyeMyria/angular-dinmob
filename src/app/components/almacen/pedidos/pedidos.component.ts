import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { PedidoService } from '../../../services/pedido.service';
import { of } from "rxjs/observable/of";
import { MatDialog, MatSnackBar } from '@angular/material';
import { VerPedidoDialogoComponent } from 'app/components/almacen/ver-pedido-dialogo/ver-pedido-dialogo.component';
import { ConfirmarBorradoDialogoComponent } from 'app/components/admin/confirmar-borrado-dialogo/confirmar-borrado-dialogo.component';


@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.scss']
})
export class PedidosComponent implements OnInit {
  obras: any = [];
  obra_selected: string = "";
  pedidos: any = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private pedidoSrv: PedidoService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
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
          return this.pedidoSrv.getPedidosObra(params.get("obra"));
        } else {
          return of([]);
        }

      }).subscribe(pedidos => {
        this.pedidos = pedidos;
      });
  }

  delPedido(pedido) {
    let dialogRef = this.dialog.open(ConfirmarBorradoDialogoComponent, {
      data: {
        title: "Eliminar pedido",
        content: `¿Desea eliminar el pedido creado por ${pedido.usuario} del ${pedido.fecha}?`
      },
      width: "500px"
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result === true) {


        this.pedidoSrv.delPedido(pedido.id_pedido)
          .subscribe((res: any) => {
            if (res.count == 1) {
              let i = this.pedidos.indexOf(pedido);
              this.pedidos.splice(i, 1);

              this.snackBar.open("Pedido Eliminado", "", {
                duration: 2000,
                panelClass: ["bg-success", "text-white"]
              });

            } else {
              this.snackBar.open("Ha ocurrido un error", "", {
                duration: 3000,
                panelClass: ["bg-danger", "text-white"]
              });
            }

          }, (error) => {
            this.snackBar.open("Ha ocurrido un error de conexión. Inténtelo más tarde", "", {
              duration: 3000,
              panelClass: ["bg-danger", "text-white"]
            });
          });
      }
    });

  }

  cargarObra(obra_selected) {
    this.pedidoSrv.getPedidosObra(obra_selected)
      .subscribe(pedidos => {
        this.pedidos = pedidos;
      });
  }

  verPedido(pedido) {

    this.pedidoSrv.getPedidoInsumos(pedido.id_pedido)
      .subscribe((res: any) => {
        let dialogRef = this.dialog.open(VerPedidoDialogoComponent, {
          data: {
            descripcion: res.descripcion,
            fecha: res.fecha,
            id_obra: res.id_obra,
            id_pedido: res.id_obra,
            id_usuario: res.id_usuario,
            insumos: res.insumos,
            obra: res.obra,
            usuario: res.usuario
          },
          width: '800px',
        });

        dialogRef.afterClosed().subscribe(result => {

        });
      }, (error) => {

      });

  }

  nuevoPedido() {
    //console.log("obra seleccionada", this.obra_selected);
    this.router.navigate(["/nuevo-pedido", { obra: this.obra_selected }]);

  }

}

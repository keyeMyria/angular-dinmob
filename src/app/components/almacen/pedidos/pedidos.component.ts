import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { PedidoService } from '../../../services/pedido.service';
import { of } from "rxjs/observable/of";
import { MatDialog, MatSnackBar } from '@angular/material';
import { VerPedidoDialogoComponent } from 'app/components/almacen/ver-pedido-dialogo/ver-pedido-dialogo.component';

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
    public dialog: MatDialog
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

  cargarObra(obra_selected){
    this.pedidoSrv.getPedidosObra(obra_selected)
      .subscribe(pedidos => {
        this.pedidos = pedidos;
      });
  }

  verPedido(pedido) {

    this.pedidoSrv.getPedidoInsumos(pedido.id_pedido)
      .subscribe((res:any) => {
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
      }, (error) =>{

      });

  }

}

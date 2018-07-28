import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { ObrasService } from 'app/services/obras.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { SaldoVentaClienteDialogoComponent } from 'app/components/ventas/saldo-venta-cliente-dialogo/saldo-venta-cliente-dialogo.component';
import { ClientesService } from '../../../services/clientes.service';

@Component({
  selector: 'app-devoluciones-cancelados',
  templateUrl: './devoluciones-cancelados.component.html',
  styleUrls: ['./devoluciones-cancelados.component.scss']
})
export class DevolucionesCanceladosComponent implements OnInit {
  obras: any = [];
  ventas: any = [];
  totales: any;
  obra_selected: string = "";

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private obraSrv: ObrasService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private clienteSrv: ClientesService
  ) { }

  ngOnInit() {

    this.route.data
      .subscribe((data: { obras: any, tipos: any }) => {
        this.obras = data.obras;

      });

    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        if (params.has("obra")) {
          this.obra_selected = params.get("obra");
          return this.obraSrv.getVentasCanceladasDevoluciones(params.get("obra"));
        } else {
          return of([]);
        }
      })).subscribe((res: any) => {
        this.ventas = res.ventas;
        this.totales = res.totales;

      }, (error) => {
      });
  }


  cargarObra(id_obra) {

    if (id_obra) {
      this.router.navigate([".", { obra: id_obra }]);
    } else {
      this.router.navigate([".", {}]);

    }

  }

  resumenVenta(id_compra) {
    this.clienteSrv.getCompra(id_compra)
      .subscribe(compra => {

        let dialogRef = this.dialog.open(SaldoVentaClienteDialogoComponent, {
          data: {
            compra: compra
          },
          width: "800px"
        });


      }, (error) => {
      });

  }

}

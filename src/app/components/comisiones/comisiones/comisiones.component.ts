import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { NuevoPagoComisionDialogoComponent } from '../nuevo-pago-comision-dialogo/nuevo-pago-comision-dialogo.component';
import { MatDialog, MatSnackBar } from '@angular/material';
import { EditarPagoComisionDialogoComponent } from '../editar-pago-comision-dialogo/editar-pago-comision-dialogo.component';
import { ConfirmarBorradoDialogoComponent } from "app/components/admin/confirmar-borrado-dialogo/confirmar-borrado-dialogo.component";
import { ComisionService } from '../../../services/comision.service';
import { of } from "rxjs/observable/of";


@Component({
  selector: 'app-comisiones',
  templateUrl: './comisiones.component.html',
  styleUrls: ['./comisiones.component.scss']
})
export class ComisionesComponent implements OnInit {
  obras: any = [];
  obra_selected: string = "";
  comisiones: any = [];
  vendedores: any = [];
  /*
   [
    {
      manzana: "1Mzn", lote: "Lote 1", valor_operacion: "1000", vendedor: "1000", gerente: "2000", expediente: "5000",
      pagos: [
        { monto: "1500", fecha: "12-feb-2018", destinatario: "Emilio" },
        { monto: "1500", fecha: "12-feb-2018", destinatario: "Emilio" },
        { monto: "1500", fecha: "12-feb-2018", destinatario: "Emilio" },
        { monto: "1500", fecha: "12-feb-2018", destinatario: "Emilio" }
      ]
    },
    {
      manzana: "1Mzn", lote: "Lote 1", valor_operacion: "1000", vendedor: "1000", gerente: "2000", expediente: "5000",
      pagos: [
        { monto: "1500", fecha: "12-feb-2018", destinatario: "Emilio" },
        { monto: "1500", fecha: "12-feb-2018", destinatario: "Emilio" },
        { monto: "1500", fecha: "12-feb-2018", destinatario: "Emilio" },
        { monto: "1500", fecha: "12-feb-2018", destinatario: "Emilio" }
      ]
    },
    {
      manzana: "1Mzn", lote: "Lote 1", valor_operacion: "1000", vendedor: "1000", gerente: "2000", expediente: "5000",
      pagos: [
        { monto: "1500", fecha: "12-feb-2018", destinatario: "Emilio" },
        { monto: "1500", fecha: "12-feb-2018", destinatario: "Emilio" },
        { monto: "1500", fecha: "12-feb-2018", destinatario: "Emilio" },
        { monto: "1500", fecha: "12-feb-2018", destinatario: "Emilio" }
      ]
    },
    {
      manzana: "1Mzn", lote: "Lote 1", valor_operacion: "1000", vendedor: "1000", gerente: "2000", expediente: "5000",
      pagos: [
        { monto: "1500", fecha: "12-feb-2018", destinatario: "Emilio" },
        { monto: "1500", fecha: "12-feb-2018", destinatario: "Emilio" },
        { monto: "1500", fecha: "12-feb-2018", destinatario: "Emilio" },
        { monto: "1500", fecha: "12-feb-2018", destinatario: "Emilio" }
      ]
    },
    { manzana: "1Mzn", lote: "Lote 1", valor_operacion: "1000", vendedor: "1000", gerente: "2000", expediente: "5000" }
  ];
  */



  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    public snackBar: MatSnackBar,
    private comisionSrv: ComisionService
  ) { }

  ngOnInit() {
    this.route.data
      .subscribe((data: { obras: any[], vendedores: any[] }) => {
        this.obras = data.obras;
        this.vendedores = data.vendedores;

      });

    this.route.paramMap
      .switchMap((params: ParamMap) => {
        if (params.has("obra")) {
          this.obra_selected = params.get("obra");
          return this.comisionSrv.getComisionesObra(params.get("obra"));
        } else {
          return of([]);
        }
      }).subscribe(comisiones => {
        this.comisiones = comisiones;
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

  verComisiones(comision) {
  }

  nuevoPago(comision) {

    let dialogRef = this.dialog.open(NuevoPagoComisionDialogoComponent, {
      data: {
        vendedores: this.vendedores,
        comision: comision
      },
      width: "500px"
    });
    dialogRef.afterClosed().subscribe(result => {

      if (result === true) {

        this.snackBar.open("Pago Agregado", "", {
          duration: 2000,
          panelClass: ["bg-success", "text-white"]
        });

      } else if (result && result.error) {

        this.snackBar.open(result.error, "", {
          duration: 3000,
          panelClass: ["bg-danger", "text-white"]
        });

      }
    });
  }

  editarPago(pago, comision) {
    let dialogRef = this.dialog.open(EditarPagoComisionDialogoComponent, {
      data: {
        comision: comision,
        pago: pago,
        vendedores: this.vendedores,
      },
      width: "500px"
    });
    dialogRef.afterClosed().subscribe(result => {

      if (result === true) {

        this.snackBar.open("Pago Actulizado", "", {
          duration: 2000,
          panelClass: ["bg-success", "text-white"]
        });

      } else if (result && result.error) {

        this.snackBar.open(result.error, "", {
          duration: 3000,
          panelClass: ["bg-danger", "text-white"]
        });

      }
    });
  }

  delPago(pago, comision) {

    let dialogRef = this.dialog.open(ConfirmarBorradoDialogoComponent, {
      data: {
        title: "Eliminar Pago",
        content: `¿Desea eliminar el pago del: ${pago.fecha} ?`
      },
      width: "500px"
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {

        this.comisionSrv.delPago(pago.id_pago)
          .subscribe((res: any) => {
            if (res.count == 1) {

              let i = comision.pagos.indexOf(pago);
              comision.pagos.splice(i, 1);


              this.snackBar.open("Pago Eliminado", "", {
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

}



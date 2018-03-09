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

  montoComision(comision, pago) {
    let tipoComision = 0;
    if (pago.destinatario == "Vendedor") {
      tipoComision = comision.comision_vendedor / 100;
    } else if (pago.destinatario == "Gerente") {
      tipoComision = comision.comision_gerente / 100;
    } else if (pago.destinatario == "Expediente") {
      tipoComision = comision.comision_expediente / 100;
    } else { }

    return (pago.porcentaje / 100) * comision.valor_operacion * tipoComision;

  }

  verComisiones(comision) {
  }

  nuevoPago(comision) {

    let dialogRef = this.dialog.open(NuevoPagoComisionDialogoComponent, {
      data: {
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
        pago: pago
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

  pagoComisionCompleto(comision, destinatario) {
    let completo = false;
    let total = 0;
    comision.pagos.forEach(pago => {
      //console.log("", pago);
      if (pago.destinatario == destinatario) {
        total += +pago.porcentaje;
      }
    });
    if (total >= 100) {
      completo = true;
    }
    //console.log("", destinatario, total, completo);
    return completo;
  }

}



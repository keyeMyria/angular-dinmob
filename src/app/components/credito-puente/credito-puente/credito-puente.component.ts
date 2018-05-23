import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { CargoAbonoCreditoDialogoComponent } from '../cargo-abono-credito-dialogo/cargo-abono-credito-dialogo.component';
import { ConfirmarBorradoDialogoComponent } from "app/components/admin/confirmar-borrado-dialogo/confirmar-borrado-dialogo.component";
import { EditarCargoAbonoCreditoDialogoComponent } from '../editar-cargo-abono-credito-dialogo/editar-cargo-abono-credito-dialogo.component';
import { ActivatedRoute, Router, ParamMap } from "@angular/router";
import { CreditoPuenteService } from '../../../services/credito-puente.service';
import { of } from "rxjs/observable/of";

@Component({
  selector: 'app-credito-puente',
  templateUrl: './credito-puente.component.html',
  styleUrls: ['./credito-puente.component.scss']
})
export class CreditoPuenteComponent implements OnInit {
  obras: any = [];
  obra_selected: string = "";
  movimientos: any = [];

  constructor(
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router,
    private creditoSrv: CreditoPuenteService
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
          return this.creditoSrv.getMovimientos(params.get("obra"));
        } else {
          return of([]);
        }
      }).subscribe(movimientos => {
        this.movimientos = movimientos;
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

  totalMinistraciones() {
    let total = 0;

    if (this.movimientos) {
      this.movimientos.forEach(mov => {

        if (mov.es_ministracion === "1") {
          total += +mov.monto;

        }

      });
    }
    return total;
  }

  totalLiberaciones() {
    let total = 0;

    if (this.movimientos) {
      this.movimientos.forEach(mov => {

        if (mov.es_ministracion === "0") {
          total += +mov.monto;

        }

      });
    }
    return total;
  }

  saldo() {
    let total = 0;

    if (this.movimientos) {
      this.movimientos.forEach(mov => {

        if (mov.es_ministracion === "1") {
          total += +mov.monto;

        } else {
          total -= +mov.monto
        }

      });
    }
    return total;
  }

  nuevoMovimiento() {

    let dialogRef = this.dialog.open(CargoAbonoCreditoDialogoComponent, {
      data: {
        id_obra: this.obra_selected,
        movimientos: this.movimientos
      },
      width: "500px"
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {

        this.snackBar.open("Movimiento Agregado", "", {
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

  editarMovimiento(mov) {

    let dialogRef = this.dialog.open(EditarCargoAbonoCreditoDialogoComponent, {
      data: {
        mov: mov,
        movimientos: this.movimientos
      },
      width: "500px"
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {

        this.snackBar.open("Movimiento Actulizado", "", {
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

  delMovimiento(mov) {

    let tipo;
    if (mov.es_ministracion == "1") {
      tipo = "Ministración";
    } else {
      tipo = "Liberación";
    }

    let dialogRef = this.dialog.open(ConfirmarBorradoDialogoComponent, {
      data: {
        title: "Eliminar Movimiento",
        content: `¿Desea eliminar la ${tipo} del ${mov.fecha}?`
      },
      width: "500px"
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {

        this.creditoSrv.delMovimiento(mov.id_movimiento)
          .subscribe((res: any) => {
            if (res.count === 1) {

              let i = this.movimientos.indexOf(mov);
              this.movimientos.splice(i, 1);


              this.snackBar.open("Movimiento Eliminado", "", {
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

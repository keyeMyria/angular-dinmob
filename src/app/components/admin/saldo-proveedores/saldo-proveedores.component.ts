import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { CargoAbonoProveedoresDialogoComponent } from '../cargo-abono-proveedores-dialogo/cargo-abono-proveedores-dialogo.component';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ConfirmarBorradoDialogoComponent } from 'app/components/admin/confirmar-borrado-dialogo/confirmar-borrado-dialogo.component';
import { EditarCargoAbonoProveedoresDialogoComponent } from '../editar-cargo-abono-proveedores-dialogo/editar-cargo-abono-proveedores-dialogo.component';
import { switchMap } from 'rxjs/operators';
import { of } from "rxjs";
import { ProveedorService } from '../../../services/proveedor.service';
@Component({
  selector: 'app-saldo-proveedores',
  templateUrl: './saldo-proveedores.component.html',
  styleUrls: ['./saldo-proveedores.component.scss']
})
export class SaldoProveedoresComponent implements OnInit {
  obras: any = [];
  obra_selected: string = "";
  movimientos: any = [];

  constructor(
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router,
    private proveedorSrv: ProveedorService
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
          return this.proveedorSrv.getMovimientos(params.get("obra"));
        } else {
          return of([]);
        }
      })).subscribe(movimientos => {
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


  totalCargos() {
    let suma = 0;
    this.movimientos.forEach(mov => {

      if (mov.es_cargo === "1") {
        suma += +mov.monto;
      }

    });
    return suma;
  }

  totalAbonos() {
    let total = 0;
    this.movimientos.forEach(mov => {

      if (mov.es_cargo === "0") {
        total += +mov.monto;
      }

    });
    return total;
  }

  totalSaldo() {
    let total = 0;

    if (this.movimientos) {
      this.movimientos.forEach(mov => {

        if (mov.es_cargo === "1") {
          total += +mov.monto;

        } else {
          total -= +mov.monto
        }

      });
    }
    return total;
  }


  nuevoMovimiento() {

    let dialogRef = this.dialog.open(CargoAbonoProveedoresDialogoComponent, {
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

    let dialogRef = this.dialog.open(EditarCargoAbonoProveedoresDialogoComponent, {
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
    if (mov.es_cargo == "1") {
      tipo = "Cargo";
    } else {
      tipo = "Abono";
    }

    let dialogRef = this.dialog.open(ConfirmarBorradoDialogoComponent, {
      data: {
        title: "Eliminar Movimiento",
        content: `¿Desea eliminar el ${tipo} del ${mov.fecha}?`
      },
      width: "500px"
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {

        this.proveedorSrv.delMovimiento(mov.id_movimiento)
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

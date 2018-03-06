import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { NuevoGastoDialogoComponent } from '../nuevo-gasto-dialogo/nuevo-gasto-dialogo.component';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ConfirmarBorradoDialogoComponent } from "app/components/admin/confirmar-borrado-dialogo/confirmar-borrado-dialogo.component";
import { EditarGastoDialogoComponent } from 'app/components/admin/editar-gasto-dialogo/editar-gasto-dialogo.component';
import { GastoService } from '../../../services/gasto.service';
import { of } from "rxjs/observable/of";

@Component({
  selector: 'app-gastos-sobras',
  templateUrl: './gastos-sobras.component.html',
  styleUrls: ['./gastos-sobras.component.scss']
})
export class GastosSobrasComponent implements OnInit {
  obras: any = [];
  obra_selected: string = "";
  gastos: any = [];
  tipos: any = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private gastoSrv: GastoService
  ) { }

  ngOnInit() {
    this.route.data
      .subscribe((data: { obras: any[], tipos: any }) => {
        this.obras = data.obras;
        this.tipos = data.tipos;
      });

    this.route.paramMap
      .switchMap((params: ParamMap) => {
        if (params.has("obra")) {
          this.obra_selected = params.get("obra");
          return this.gastoSrv.getGastosObra(params.get("obra"));
        } else {
          return of([]);
        }
      }).subscribe(gastos => {
        this.gastos = gastos;
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

  nuevoGasto() {
    let obra = this.obras.find(obra => obra.id_obra == this.obra_selected);
    console.log("obra seleccionada", this.obra_selected, obra);

    let dialogRef = this.dialog.open(NuevoGastoDialogoComponent, {
      width: '500px',
      data: {
        obra: obra,
        gastos: this.gastos,
        tipos: this.tipos
      },
    });
    dialogRef.afterClosed().subscribe(result => {

      if (result === true) {

        this.snackBar.open("Gasto Agregado", "", {
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

  editarGasto(gasto) {

    let dialogRef = this.dialog.open(EditarGastoDialogoComponent, {
      data: {
        gasto: gasto,
        gastos: this.gastos,
        tipos: this.tipos
      },
      width: '500px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {

        this.snackBar.open("Gasto Actulizado", "", {
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

  delGasto(gasto) {

    let dialogRef = this.dialog.open(ConfirmarBorradoDialogoComponent, {
      data: {
        title: "Eliminar Gasto",
        content: `¿Desea eliminar el gasto del: ${gasto.fecha} ?`
      },
      width: "500px"
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {

        this.gastoSrv.delGasto(gasto.id_gasto)
          .subscribe((res: any) => {
            if (res.count === 1) {

              let i = this.gastos.indexOf(gasto);
              this.gastos.splice(i, 1);


              this.snackBar.open("Gasto Eliminado", "", {
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

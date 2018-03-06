import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NuevoGastoDialogoComponent } from '../nuevo-gasto-dialogo/nuevo-gasto-dialogo.component';
import { MatDialog, MatSnackBar } from '@angular/material';
import { EditarGastosSobrasDialogoComponent } from '../../editar-gastos-sobras-dialogo/editar-gastos-sobras-dialogo.component';
import { ConfirmarBorradoDialogoComponent } from "app/components/admin/confirmar-borrado-dialogo/confirmar-borrado-dialogo.component";

@Component({
  selector: 'app-gastos-sobras',
  templateUrl: './gastos-sobras.component.html',
  styleUrls: ['./gastos-sobras.component.scss']
})
export class GastosSobrasComponent implements OnInit {
  obras: any = [];
  obra_selected: string = "";

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.route.data
      .subscribe((data: { obras: any[] }) => {
        this.obras = data.obras;
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
    let dialogRef = this.dialog.open(NuevoGastoDialogoComponent, {
      width: '500px',
      data: {
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

  editarGasto() {

    let dialogRef = this.dialog.open(EditarGastosSobrasDialogoComponent, {
      data: {
      },
      width: '500px'
    });
    dialogRef.afterClosed().subscribe(result => {

      if (result === true) {

      } else if (result && result.error) {
      }

    });
  }

  delGasto() {

    let dialogRef = this.dialog.open(ConfirmarBorradoDialogoComponent, {
      data: {
        title: "Eliminar Proveedor",
        content: `¿Desea eliminar el proveedor:?`
      },
      width: "500px"
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result === true) {
      }

    });

  }


}

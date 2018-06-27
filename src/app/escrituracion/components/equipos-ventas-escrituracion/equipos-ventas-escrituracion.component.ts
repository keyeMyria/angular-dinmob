import { Component, OnInit } from '@angular/core';
import { AgregarEquipoDialogoComponent } from '../agregar-equipo-dialogo/agregar-equipo-dialogo.component';
import { MatDialog, MatSnackBar, MatDrawer } from '@angular/material';
import { AgregarVendedorEquipoDialogoComponent } from '../agregar-vendedor-equipo-dialogo/agregar-vendedor-equipo-dialogo.component';
import { EditarEquipoDialogoComponent } from '../editar-equipo-dialogo/editar-equipo-dialogo.component';
import { ConfirmarBorradoDialogoComponent } from 'app/components/admin/confirmar-borrado-dialogo/confirmar-borrado-dialogo.component';

@Component({
  selector: 'app-equipos-ventas-escrituracion',
  templateUrl: './equipos-ventas-escrituracion.component.html',
  styleUrls: ['./equipos-ventas-escrituracion.component.scss']
})
export class EquiposVentasEscrituracionComponent implements OnInit {

  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
  }

  agregarEquipo() {
    let dialogRef = this.dialog.open(AgregarEquipoDialogoComponent, {
      data: {
      },
      width: '500px',

    });
    dialogRef.afterClosed().subscribe(result => {

      if (result === true) {

        this.snackBar.open("Equipo Agregado", "", {
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

  agregarVendedor() {
    let dialogRef = this.dialog.open(AgregarVendedorEquipoDialogoComponent, {
      data: {
      },
      width: '500px',

    });
    dialogRef.afterClosed().subscribe(result => {

      if (result === true) {

        this.snackBar.open("Equipo Agregado", "", {
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

  editarEquipo() {
    let dialogRef = this.dialog.open(EditarEquipoDialogoComponent, {
      data: {
      },
      width: '500px',

    });
    dialogRef.afterClosed().subscribe(result => {

      if (result === true) {

        this.snackBar.open("Equipo Actualizado", "", {
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

  delVendedor() {

    let dialogRef = this.dialog.open(ConfirmarBorradoDialogoComponent, {
      data: {
        title: "Eliminar Vendedor",
        content: `¿Desea eliminar el vendedor?`
      },
      width: "500px"
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
      }
    });

  }

  delEquipo() {

    let dialogRef = this.dialog.open(ConfirmarBorradoDialogoComponent, {
      data: {
        title: "Eliminar Equipo",
        content: `¿Desea eliminar el equipo?`
      },
      width: "500px"
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
      }
    });

  }

}

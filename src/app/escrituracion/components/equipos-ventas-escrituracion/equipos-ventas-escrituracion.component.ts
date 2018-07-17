import { Component, OnInit } from '@angular/core';
import { AgregarEquipoDialogoComponent } from '../agregar-equipo-dialogo/agregar-equipo-dialogo.component';
import { MatDialog, MatSnackBar, MatDrawer } from '@angular/material';
import { AgregarVendedorEquipoDialogoComponent } from '../agregar-vendedor-equipo-dialogo/agregar-vendedor-equipo-dialogo.component';
import { EditarEquipoDialogoComponent } from '../editar-equipo-dialogo/editar-equipo-dialogo.component';
import { ConfirmarBorradoDialogoComponent } from 'app/components/admin/confirmar-borrado-dialogo/confirmar-borrado-dialogo.component';
import { validateVerticalPosition } from '@angular/cdk/overlay';

@Component({
  selector: 'app-equipos-ventas-escrituracion',
  templateUrl: './equipos-ventas-escrituracion.component.html',
  styleUrls: ['./equipos-ventas-escrituracion.component.scss']
})
export class EquiposVentasEscrituracionComponent implements OnInit {

  equipos: any;

  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.equipos = [
      {
        nombre_equipo: "Equipo 1",
        length: "3",
        vendedores: [
          {
            vendedor: "Julio Cortázar"
          },
          {
            vendedor: "Rosario Castellano"
          },
          {
            vendedor: "Roberto Bolaños"
          }
        ]
      },
      {
        nombre_equipo: "Equipo 2",
        length: "2",
        vendedores: [
          {
            vendedor: "José Vasconcelos"
          },
          {
            vendedor: "José Borges"
          }
        ]
      },
      {
        nombre_equipo: "Equipo 3",
        length: "3",
        vendedores: [
          {
            vendedor: "Jorge Volpi"
          },
          {
            vendedor: "Gioconda Belli"
          },
          {
            vendedor: "Juan José Arreola"
          }
        ]
      },
      {
        nombre_equipo: "Equipo 4",
        length: "3",
        vendedores: [
          {
            vendedor: "Hector Herrera",
          },
          {
            vendedor: "Javier Rodriguez"
          },
          {
            vendedor: "Pedro Paramo"
          }
        ]
      }
    ]

  }

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

  editarEquipo(equipo) {
    let dialogRef = this.dialog.open(EditarEquipoDialogoComponent, {
      data: {
        equipos: this.equipos,
        equipo: equipo
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

  delVendedor(v) {

    let dialogRef = this.dialog.open(ConfirmarBorradoDialogoComponent, {
      data: {
        title: "Eliminar Vendedor",
        content: `¿Desea eliminar el vendedor: ${v.vendedor}?`
      },
      width: "500px"
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
      }
    });

  }

  delEquipo(equipo) {

    let dialogRef = this.dialog.open(ConfirmarBorradoDialogoComponent, {
      data: {
        title: "Eliminar Equipo",
        content: `¿Desea eliminar el ${equipo.nombre_equipo}?`
      },
      width: "500px"
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
      }
    });

  }

}

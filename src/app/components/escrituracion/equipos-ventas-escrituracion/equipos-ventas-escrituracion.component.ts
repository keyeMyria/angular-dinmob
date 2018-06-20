import { Component, OnInit } from '@angular/core';
import { AgregarEquipoDialogoComponent } from '../agregar-equipo-dialogo/agregar-equipo-dialogo.component';
import { MatDialog, MatSnackBar, MatDrawer } from '@angular/material';
import { AgregarVendedorEquipoDialogoComponent } from '../agregar-vendedor-equipo-dialogo/agregar-vendedor-equipo-dialogo.component';

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

 agregarEquipo(){
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

  agregarVendedor(){
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

}

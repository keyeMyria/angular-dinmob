import { Component, OnInit } from '@angular/core';
import { AgregarInstitutoCreditoDialogoComponent } from '../agregar-instituto-credito-dialogo/agregar-instituto-credito-dialogo.component';
import { MatDialog, MatSnackBar } from '@angular/material';
import { EditarInstitutoCreditoDialogoComponent } from '../editar-instituto-credito-dialogo/editar-instituto-credito-dialogo.component';
import { ConfirmarBorradoDialogoComponent } from "app/components/admin/confirmar-borrado-dialogo/confirmar-borrado-dialogo.component";

@Component({
  selector: 'app-instituciones-credito',
  templateUrl: './instituciones-credito.component.html',
  styleUrls: ['./instituciones-credito.component.scss']
})
export class InstitucionesCreditoComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit() {
  }

  agregarInstituto() {

    let dialogRef = this.dialog.open(AgregarInstitutoCreditoDialogoComponent, {
      data: {
      },
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {


      if (result === true) {

        this.snackBar.open("Instituto Creado", "", {
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

  editarInstitucion() {

    let dialogRef = this.dialog.open(EditarInstitutoCreditoDialogoComponent, {
      data: {
      },
      width: "500px"
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result === true) {

        this.snackBar.open("Instituto Actualizado", "", {
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

  delInstituto() {

    let dialogRef = this.dialog.open(ConfirmarBorradoDialogoComponent, {
      data: {
        title: "Eliminar Instituto",
        content: `¿Desea eliminar el instituto: ?`
      },
      width: "500px"
    });

    dialogRef.afterClosed().subscribe(result => {


    });
  }

}

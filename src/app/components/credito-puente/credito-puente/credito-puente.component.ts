import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { CargoAbonoCreditoDialogoComponent } from '../cargo-abono-credito-dialogo/cargo-abono-credito-dialogo.component';
import { ConfirmarBorradoDialogoComponent } from "app/components/admin/confirmar-borrado-dialogo/confirmar-borrado-dialogo.component";
import { EditarCargoAbonoCreditoDialogoComponent } from '../editar-cargo-abono-credito-dialogo/editar-cargo-abono-credito-dialogo.component';

@Component({
  selector: 'app-credito-puente',
  templateUrl: './credito-puente.component.html',
  styleUrls: ['./credito-puente.component.scss']
})
export class CreditoPuenteComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit() {
  }

  cargoCredito() {

    let dialogRef = this.dialog.open(CargoAbonoCreditoDialogoComponent, {
      data: {
      },
      width: "500px"
    });

    dialogRef.afterClosed().subscribe(result => {
    });

  }

  editarCredito() {

    let dialogRef = this.dialog.open(EditarCargoAbonoCreditoDialogoComponent, {
      data: {
      },
      width: "500px"
    });

    dialogRef.afterClosed().subscribe(result => {
    });

  }

  delCredito() {

    let dialogRef = this.dialog.open(ConfirmarBorradoDialogoComponent, {
      data: {
        title: "Eliminar Movimiento",
        content: `¿Desea eliminar el movimiento: (tipo-fecha)?`
      },
      width: "500px"
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result === true) {


      }

    });

  }

}

import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material'
import { EditarClienteEscrituracionDialogoComponent } from '../editar-cliente-escrituracion-dialogo/editar-cliente-escrituracion-dialogo.component';

@Component({
  selector: 'app-clientes-escrituracion',
  templateUrl: './clientes-escrituracion.component.html',
  styleUrls: ['./clientes-escrituracion.component.scss']
})
export class ClientesEscrituracionComponent implements OnInit {

  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
  }


  editarCliente(){
    let dialogRef = this.dialog.open(EditarClienteEscrituracionDialogoComponent, {
      data: {
      },
      width: '800px',

    });
    dialogRef.afterClosed().subscribe(result => {

      if (result === true) {

        this.snackBar.open("Cliente Actualizado", "", {
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

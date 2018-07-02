import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar, } from '@angular/material';
import { AsignarTareaDialogoComponent } from '../asignar-tarea-dialogo/asignar-tarea-dialogo.component';
import { EditarTareaDialogoComponent } from '../editar-tarea-dialogo/editar-tarea-dialogo.component';

@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.component.html',
  styleUrls: ['./tareas.component.scss']
})
export class TareasComponent implements OnInit {

  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
  }

  editarTarea($event) {
    $event.stopPropagation();
    let dialogRef = this.dialog.open(EditarTareaDialogoComponent, {
      data: {
      },
      width: '800px',

    });
    dialogRef.afterClosed().subscribe(result => {

      if (result === true) {

        this.snackBar.open("Tarea Actualizada", "", {
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

  asignarTarea() {
    let dialogRef = this.dialog.open(AsignarTareaDialogoComponent, {
      data: {
      },
      width: '800px',

    });
    dialogRef.afterClosed().subscribe(result => {

      if (result === true) {

        this.snackBar.open("Tarea Asignada", "", {
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

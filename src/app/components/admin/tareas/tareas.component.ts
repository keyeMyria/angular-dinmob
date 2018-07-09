import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar, } from '@angular/material';
import { AsignarTareaDialogoComponent } from '../asignar-tarea-dialogo/asignar-tarea-dialogo.component';
import { EditarTareaDialogoComponent } from '../editar-tarea-dialogo/editar-tarea-dialogo.component';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ConfirmarBorradoDialogoComponent } from "app/components/admin/confirmar-borrado-dialogo/confirmar-borrado-dialogo.component";
import { TareaService } from '../../../services/tarea.service';

@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.component.html',
  styleUrls: ['./tareas.component.scss']
})
export class TareasComponent implements OnInit {
  usuarios: any = [];
  tareas: any;

  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private tareaSrv: TareaService
  ) { }

  ngOnInit() {
    this.route.data
      .subscribe((data: { usuarios: any[] }) => {
        //console.log("resultado resolve ", data);
        this.usuarios = data.usuarios;
      });

/*     this.tareaSrv.getTareas()
      .subscribe(res => {
        this.tareas = res;
      }); */
  }

  editarTarea($event) {
    let tarea;
    $event.stopPropagation();
    let dialogRef = this.dialog.open(EditarTareaDialogoComponent, {
      data: {
        usuarios: this.usuarios,
        tarea: tarea
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
    let tarea;
    let dialogRef = this.dialog.open(AsignarTareaDialogoComponent, {
      data: {
        usuarios: this.usuarios,
        tarea: tarea
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

  delTarea() {
    let tarea;
    let dialogRef = this.dialog.open(ConfirmarBorradoDialogoComponent, {
      data: {
        title: "Eliminar Tarea",
        content: `¿Desea eliminar tarea?`
      },
      width: "500px"
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {

        this.tareaSrv.delTarea(tarea.id_tarea)
          .subscribe((res: any) => {
            if (res.count === 1) {

              let i = this.tareas.indexOf(tarea);
              this.tareas.splice(i, 1);


              this.snackBar.open("Vendedor Eliminado", "", {
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

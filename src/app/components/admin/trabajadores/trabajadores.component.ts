import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { MatDialog, MatSnackBar } from '@angular/material';
import { NuevoTrabajadorDialogoComponent } from 'app/components/admin/nuevo-trabajador-dialogo/nuevo-trabajador-dialogo.component';
import { EditarTrabajadorDialogoComponent } from 'app/components/admin/editar-trabajador-dialogo/editar-trabajador-dialogo.component';
import { ConfirmarBorradoDialogoComponent } from "app/components/admin/confirmar-borrado-dialogo/confirmar-borrado-dialogo.component";
import { TrabajadorService } from '../../../services/trabajador.service';
import { of } from "rxjs/observable/of";


@Component({
  selector: 'app-trabajadores',
  templateUrl: './trabajadores.component.html',
  styleUrls: ['./trabajadores.component.scss']
})
export class TrabajadoresComponent implements OnInit {
  obras: any = [];
  trabajadores: any = [];
  obra_selected: string = "";

  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private router: Router,
    public snackBar: MatSnackBar,
    private trabajadorSrv: TrabajadorService
  ) { }

  ngOnInit() {
    this.route.data
      .subscribe((data: { obras: any[] }) => {
        this.obras = data.obras;
      });

    this.route.paramMap
      .switchMap((params: ParamMap) => {
        if (params.has("obra")) {
          this.obra_selected = params.get("obra");
          return this.trabajadorSrv.getTrabajadoresObra(params.get("obra"));
        } else {
          return of([]);
        }
      }).subscribe(trabajadores => {
        this.trabajadores = trabajadores;
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


  nuevoTrabajador() {
    let dialogRef = this.dialog.open(NuevoTrabajadorDialogoComponent, {
      data: {
      },
      width: "600px"
    });
    dialogRef.afterClosed().subscribe(result => {

      if (result === true) {

        this.snackBar.open("Trabajador Agregado", "", {
          duration: 2000,
          panelClass: ["bg-success", "text-white"]
        });

      } else if (result.error) {

        this.snackBar.open(result.error, "", {
          duration: 3000,
          panelClass: ["bg-danger", "text-white"]
        });

      }
    });
  }

  editarTrabajador() {
    let dialogRef = this.dialog.open(EditarTrabajadorDialogoComponent, {
      data: {
      },
      width: "600px"
    });
    dialogRef.afterClosed().subscribe(result => {

      if (result === true) {

        this.snackBar.open("Trabajador Actulizado", "", {
          duration: 2000,
          panelClass: ["bg-success", "text-white"]
        });

      } else if (result.error) {

        this.snackBar.open(result.error, "", {
          duration: 3000,
          panelClass: ["bg-danger", "text-white"]
        });

      }
    });
  }

  asignarTrabajadores() {
    this.router.navigate(["/asignar-trabajadores"]);
  }

  delTrabajador() {

    let dialogRef = this.dialog.open(ConfirmarBorradoDialogoComponent, {
      data: {
        title: "Eliminar usuario",
        content: `¿Desea eliminar el trabajador?`
      },
      width: "500px"
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result === true) {


      }

    });

  }


}

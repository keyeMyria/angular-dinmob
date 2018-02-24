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
  obras: any[] = [];
  trabajadores: any = [];
  obra_selected: string = "";
  especialidades: any = [];

  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private router: Router,
    public snackBar: MatSnackBar,
    private trabajadorSrv: TrabajadorService
  ) { }

  ngOnInit() {
    this.route.data
      .subscribe((data: { obras: any[], especialidades: any }) => {
        this.obras = data.obras;
        this.especialidades = data.especialidades;
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

    let obra = this.obras.find(obra => obra.id_obra == this.obra_selected);
    console.log("obra seleccionada", this.obra_selected, obra);

    let dialogRef = this.dialog.open(NuevoTrabajadorDialogoComponent, {
      data: {
        obra: obra,
        especialidades: this.especialidades,
        trabajadores: this.trabajadores
      },
      width: "500px"
    });
    dialogRef.afterClosed().subscribe(result => {

      if (result === true) {

        this.snackBar.open("Trabajador Agregado", "", {
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

  editarTrabajador(trabajador) {
    let dialogRef = this.dialog.open(EditarTrabajadorDialogoComponent, {
      data: {
        trabajador: trabajador,
        especialidades: this.especialidades,
        trabajadores: this.trabajadores

      },
      width: "500px"
    });
    dialogRef.afterClosed().subscribe(result => {

      if (result === true) {

        this.snackBar.open("Trabajador Actulizado", "", {
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

  asignarTrabajadores() {
    this.router.navigate(["/asignar-trabajadores"]);
  }

  delTrabajador(trabajador) {

    let dialogRef = this.dialog.open(ConfirmarBorradoDialogoComponent, {
      data: {
        title: "Eliminar Trabajador",
        content: `¿Desea eliminar a ${trabajador.nombre} ?`
      },
      width: "500px"
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {

        this.trabajadorSrv.delTrabajador(trabajador.id_trabajador)
          .subscribe((res: any) => {
            if (res.count === 1) {

              let i = this.trabajadores.indexOf(trabajador);
              this.trabajadores.splice(i, 1);


              this.snackBar.open("Trabajador Eliminado", "", {
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

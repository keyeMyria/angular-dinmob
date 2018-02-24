import { Component, OnInit } from '@angular/core';
import { AgregarInstitutoCreditoDialogoComponent } from '../agregar-instituto-credito-dialogo/agregar-instituto-credito-dialogo.component';
import { MatDialog, MatSnackBar } from '@angular/material';
import { EditarInstitutoCreditoDialogoComponent } from '../editar-instituto-credito-dialogo/editar-instituto-credito-dialogo.component';
import { ConfirmarBorradoDialogoComponent } from "app/components/admin/confirmar-borrado-dialogo/confirmar-borrado-dialogo.component";
import { InstitucionCreditoService } from '../../../services/institucion-credito.service';

@Component({
  selector: 'app-instituciones-credito',
  templateUrl: './instituciones-credito.component.html',
  styleUrls: ['./instituciones-credito.component.scss']
})
export class InstitucionesCreditoComponent implements OnInit {
  instituciones: any = [];

  constructor(
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private institucionSrv: InstitucionCreditoService
  ) { }

  ngOnInit() {
    this.institucionSrv.getInstituciones()
      .subscribe(res => {
        this.instituciones = res;
      });
  }

  agregarInstituto() {

    let dialogRef = this.dialog.open(AgregarInstitutoCreditoDialogoComponent, {
      data: {
        instituciones: this.instituciones
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

  editarInstitucion(institucion) {

    let dialogRef = this.dialog.open(EditarInstitutoCreditoDialogoComponent, {
      data: {
        institucion: institucion
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

  delInstituto(institucion) {
    let dialogRef = this.dialog.open(ConfirmarBorradoDialogoComponent, {
      data: {
        title: "Eliminar Institución",
        content: `¿Desea eliminar la institución: ${institucion.nombre}?`
      },
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result === true) {

        this.institucionSrv.delInstitucion(institucion.id_institucion_credito)
          .subscribe(res => {

            let i = this.instituciones.indexOf(institucion);
            this.instituciones.splice(i, 1);
            this.snackBar.open("Prototipo Eliminado", "", {
              duration: 2000,
              panelClass: ["bg-success", "text-white"]
            });

          }, (error) => {
            this.snackBar.open("Ha ocurrido un error de conexión. Inténtelo más tarde", "", {
              duration: 3000,
              panelClass: ["bg-danger", "text-white"]
            });
          });

      }

    });
  }

  updateColorInstitucion(institucion, color) {
    console.log("updateColor", institucion, color);
    this.institucionSrv.updateInstitucion(institucion.id_institucion_credito, { color: color })
      .subscribe(insti => {
        let i = this.instituciones.indexOf(institucion);
        this.instituciones[i] = insti;
        this.snackBar.open("Color Actualizado", "", {
          duration: 2000,
          panelClass: ["bg-success", "text-white"]
        });
      }, (error) => {
        this.snackBar.open("Ha ocurrido un error de conexión. Inténtelo más tarde", "", {
          duration: 3000,
          panelClass: ["bg-danger", "text-white"]
        });
      });

  }

  /*   cpToggleChange(institucion, toggle) {
      console.log("cpToggleChange", toggle, institucion);
  
    } */

}

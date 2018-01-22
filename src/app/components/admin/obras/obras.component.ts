import { Component, OnInit } from '@angular/core';
import { ObrasService } from "app/services/obras.service";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { AgregarObraDialogoComponent } from "app/components/admin/agregar-obra-dialogo/agregar-obra-dialogo.component";
import { Obra } from "app/model/obra";
import { ConfirmarBorradoDialogoComponent } from "app/components/admin/confirmar-borrado-dialogo/confirmar-borrado-dialogo.component";
import { Router, ActivatedRoute } from "@angular/router";
import { EditarObraDialogoComponent } from 'app/components/admin/editar-obra-dialogo/editar-obra-dialogo.component';


@Component({
  selector: 'app-obras',
  templateUrl: './obras.component.html',
  styleUrls: ['./obras.component.scss']
})
export class ObrasComponent implements OnInit {
  loading: boolean;
  obras: any[] = [];
  residentes: any[] = [];
  almacenistas: any[] = [];
  control_almacen: any[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private obrasSrv: ObrasService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar) { }

  ngOnInit() {

    this.route.data
      .subscribe((data: { obras: any[], residentes: any[], almacenistas: any[], control_almacen: any[] }) => {

        //console.log("resusltado resolve ", data);

        this.residentes = data.residentes;
        this.almacenistas = data.almacenistas;
        this.control_almacen = data.control_almacen;

      });


    this.obrasSrv.getObrasConUsuarios()
      .subscribe(response => this.obras = response);
  }

  openDialogCreateObra(): void {
    let obra = new Obra();

    let dialogRef = this.dialog.open(AgregarObraDialogoComponent, {
      data: {
        obras: this.obras,
        residentes: this.residentes,
        control_almacen: this.control_almacen,
        almacenistas: this.almacenistas
      },
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {

      } else {
        //cancel or error
      }


      console.log('The dialog was closed');
    });
  }

  delObra(obra: Obra) {

    let newpassword: string;

    let dialogRef = this.dialog.open(ConfirmarBorradoDialogoComponent, {
      data: {
        title: "Eliminar Obra",
        content: `¿Desea eliminar la obra: ${obra.nombre}?`
      }
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result === true) {
        this.loading = true;

        this.obrasSrv.delObra(obra.id_obra)
          .subscribe(res => {

            if (res.count === 1) {

              let i = this.obras.indexOf(obra);
              this.obras.splice(i, 1);

              this.loading = false;
              this.snackBar.open("Obra Eliminada", "Cerrar", {
                duration: 2000
              });

            } else {
              this.snackBar.open("Ha ocurrido un error", "Cerrar", {
                duration: 2000
              });
            }

          });


      }

    });

  }

  gotoEstructuraObra(obra) {
    this.router.navigate(["/estructura-obra", { obra: obra.id_obra }]);
  }

  openDialogEditarObra(obra: any) {

    let dialogRef = this.dialog.open(EditarObraDialogoComponent, {
      data: {
        obra: obra,
        residentes: this.residentes,
        control_almacen: this.control_almacen,
        almacenistas: this.almacenistas
      },
      width: "500px"
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result === true) {
        this.loading = true;

        /*     this.obrasSrv.delObra(obra.id_obra)
              .subscribe(res => {
    
                if (res.count === 1) {
    
                  let i = this.obras.indexOf(obra);
                  this.obras.splice(i, 1);
    
                  this.loading = false;
                  this.snackBar.open("Obra Eliminada", "Cerrar", {
                    duration: 2000
                  });
    
                } else {
                  this.snackBar.open("Ha ocurrido un error", "Cerrar", {
                    duration: 2000
                  });
                }
    
              }); */


      }

    });
  }
}

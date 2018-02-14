import { Component, OnInit } from '@angular/core';
import { ObrasService } from "app/services/obras.service";
import { AgregarPrototipoDialogoComponent } from "app/components/admin/agregar-prototipo-dialogo/agregar-prototipo-dialogo.component";
import { MatDialog, MatSnackBar } from "@angular/material";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";

import { PrototiposService } from 'app/services/prototipos.service';
import { Prototipo } from "app/model/prototipo";
import { AuthService } from 'app/services/auth.service';
import { EditarNombrePrototipoDialogoComponent } from 'app/components/admin/editar-nombre-prototipo-dialogo/editar-nombre-prototipo-dialogo.component';


//import 'rxjs/add/observable/of';
import { of } from 'rxjs/observable/of';
import { ConfirmarBorradoDialogoComponent } from 'app/components/admin/confirmar-borrado-dialogo/confirmar-borrado-dialogo.component';



@Component({
  selector: 'app-prototipos',
  templateUrl: './prototipos.component.html',
  styleUrls: ['./prototipos.component.scss']
})
export class PrototiposComponent implements OnInit {
  obras: any = [];
  obra: any = {
    datos: {}
  };
  obra_selected: string = "";
  prototipos: Prototipo[];

  constructor(
    public snackBar: MatSnackBar,
    public prototipoSrv: PrototiposService,
    private obraSrv: ObrasService,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService
  ) { }

  ngOnInit() {


    this.route.data
      .subscribe((data: { obras: any }) => {
        this.obras = data.obras;
      });


    this.route.paramMap
      .switchMap((params: ParamMap) => {
        if (params.has("obra")) {
          this.obra_selected = params.get("obra");
          return this.prototipoSrv.getPrototiposObra(params.get("obra"));
        } else {
          return of([]);
        }
      }).subscribe(prototipos => {


        this.prototipos = prototipos;


      }, (error) => {
        this.snackBar.open("Ha ocurrido un error de conexión. Inténtelo más tarde", "", {
          duration: 3000,
          panelClass: ["bg-danger", "text-white"]
        });
      });
  }

  cargarObra(id_obra) {

    if (id_obra) {
      this.router.navigate([".", { obra: id_obra }]);
    } else {
      this.router.navigate([".", {}]);
    }

  }

  agregarPrototipo() {

    let obra = this.obras.find(obra => obra.id_obra == this.obra_selected);

    let dialogRef = this.dialog.open(AgregarPrototipoDialogoComponent, {
      data: {
        obra: obra,
        prototipos: this.prototipos
      },
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result === true) {

        this.snackBar.open("Prototipo Creado", "", {
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

  editarPrototipo(prototipo) {
    this.router.navigate(["/editar-prototipo", prototipo.id_prototipo]);
  }

  cambiarNombre(prototipo) {
    //console.log("prototipo", prototipo);
    let dialogRef = this.dialog.open(EditarNombrePrototipoDialogoComponent, {
      data: {
        prototipo: prototipo,
      },
      width: "500px"
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {

        this.snackBar.open("Prototipo Actualizado", "", {
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

  delPrototipo(prototipo) {
    let dialogRef = this.dialog.open(ConfirmarBorradoDialogoComponent, {
      data: {
        title: "Eliminar Prototipo",
        content: `¿Desea eliminar el prototipo: ${prototipo.nombre}?`
      },
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result === true) {

        this.prototipoSrv.delPrototipo(prototipo.id_prototipo)
          .subscribe(res => {

            let i = this.prototipos.indexOf(prototipo);
            this.prototipos.splice(i, 1);
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



}

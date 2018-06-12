import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { EditarNombrePrototipoDialogoComponent } from 'app/components/admin/editar-nombre-prototipo-dialogo/editar-nombre-prototipo-dialogo.component';
import { MatDialog, MatSnackBar } from '@angular/material';
import { AgregarPartidaDialogoComponent } from 'app/components/admin/agregar-partida-dialogo/agregar-partida-dialogo.component';
import { EditarPartidaDialogoComponent } from 'app/components/admin/editar-partida-dialogo/editar-partida-dialogo.component';
import { AgregarSubpartidaDialogoComponent } from 'app/components/admin/agregar-subpartida-dialogo/agregar-subpartida-dialogo.component';
import { EditarSubpartidaDialogoComponent } from 'app/components/admin/editar-subpartida-dialogo/editar-subpartida-dialogo.component';
import { AgregarInsumoDialogoComponent } from 'app/components/admin/agregar-insumo-dialogo/agregar-insumo-dialogo.component';
import { EditarInsumoDialogoComponent } from 'app/components/admin/editar-insumo-dialogo/editar-insumo-dialogo.component';
import { PrototiposService } from "app/services/prototipos.service";
import { ActivatedRoute, Router, ParamMap } from "@angular/router";
import { ConfirmarBorradoDialogoComponent } from 'app/components/admin/confirmar-borrado-dialogo/confirmar-borrado-dialogo.component';

@Component({
  selector: 'app-editar-prototipo',
  templateUrl: './editar-prototipo.component.html',
  styleUrls: ['./editar-prototipo.component.scss'],
  //changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditarPrototipoComponent implements OnInit {
  selectedOption: string;
  prototipo: any;
  partidas: any;
  subpartida: any;
  insumo: any;
  insumos: any[];

  trackByIdPartida = (index, item) => item.id_partida;
  trackByIdInsumoPartida = (index, item) => item.id_insumo_partida;



  constructor(
    private prototipoSrv: PrototiposService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.route.paramMap
      .switchMap((params: ParamMap) =>
        this.prototipoSrv.getAcordeonPartidas(params.get('id')))
      .subscribe(res => {
        this.prototipo = res.prototipo;
        this.partidas = res.partidas;

        //this.changeDetectorRef.markForCheck();



      }, (error) => {
        this.snackBar.open("Ha ocurrido un error de conexión. Inténtelo más tarde", "", {
          duration: 3000
        });
      });


  }


  agregarPartida() {

    let dialogRef = this.dialog.open(AgregarPartidaDialogoComponent, {
      data: {
        prototipo: this.prototipo,
        partidas: this.partidas
      },
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {

        this.snackBar.open("Partida Agregada", "", {
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

  agregarSubpartida(partida) {

    let dialogRef = this.dialog.open(AgregarSubpartidaDialogoComponent, {
      data: {
        partida: partida,
        prototipo: this.prototipo
      },
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {

        this.snackBar.open("Subpartida Agregada", "", {
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

  agregarInsumo(partida) {

    let dialogRef = this.dialog.open(AgregarInsumoDialogoComponent, {
      data: {
        partida: partida
      },
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {

        this.snackBar.open("Insumo Agregado", "", {
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

  editarNombre(prototipo) {


    let dialogRef = this.dialog.open(EditarNombrePrototipoDialogoComponent, {
      data: {
        prototipo: prototipo
      },
      width: '500px',
    });
    dialogRef.afterClosed().subscribe(result => {

      if (result === true) {

        this.snackBar.open("Nombre Actualizado", "", {
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

  editarPartida(partida) {

    let dialogRef = this.dialog.open(EditarPartidaDialogoComponent, {
      data: {
        partida: partida
      },
      width: '500px',

    });
    dialogRef.afterClosed().subscribe(result => {

      if (result === true) {

        this.snackBar.open("Partida Actualizada", "", {
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

  editarSubpartida(subpartida) {

    let dialogRef = this.dialog.open(EditarSubpartidaDialogoComponent, {
      data: {
        subpartida: subpartida
      },
      width: '500px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {

        this.snackBar.open("Subpartida actualizada", "", {
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

  editarInsumo(insumo) {


    let dialogRef = this.dialog.open(EditarInsumoDialogoComponent, {
      data: {
        insumo: insumo
      },
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {

        this.snackBar.open("Insumo Actualizado", "", {
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

  delPartida(partida) {


    let dialogRef = this.dialog.open(ConfirmarBorradoDialogoComponent, {
      data: {
        title: "Eliminar Partida",
        content: `¿Desea eliminar la partida: ${partida.nombre}?`
      },
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result === true) {

        this.prototipoSrv.delPartida(partida.id_partida)
          .subscribe((res: any) => {

            if (res.count == 1) {

              let i = this.partidas.indexOf(partida);
              this.partidas.splice(i, 1);


              this.snackBar.open("Partida Eliminada", "", {
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

  delSubpartida(subpartida, partida) {

    //console.log("subpartida", subpartida);
    //console.log("partida", partida);



    let dialogRef = this.dialog.open(ConfirmarBorradoDialogoComponent, {
      data: {
        title: "Eliminar Subpartida",
        content: `¿Desea eliminar la Subpartida: ${subpartida.nombre}?`
      },
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {

        this.prototipoSrv.delPartida(subpartida.id_partida)
          .subscribe((res: any) => {
            if (res.count == 1) {

              let i = partida.subpartidas.indexOf(subpartida);
              partida.subpartidas.splice(i, 1);

              this.snackBar.open("Subpartida Eliminada", "", {
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

  delInsumo(insumo, partida) {
    let dialogRef = this.dialog.open(ConfirmarBorradoDialogoComponent, {
      data: {
        title: "Eliminar Insumo",
        content: `¿Desea eliminar el insumo: ${insumo.insumo}?`
      },
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.prototipoSrv.delInsumoPartida(insumo.id_insumo_partida)
          .subscribe((res: any) => {
            if (res.count == 1) {

              let i = partida.insumos.indexOf(insumo);
              partida.insumos.splice(i, 1);


              this.snackBar.open("Insumo Eliminado", "", {
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

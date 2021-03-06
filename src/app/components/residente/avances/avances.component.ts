
import { of as observableOf, Observable } from 'rxjs';

import { switchMap } from 'rxjs/operators';
import { Component, OnInit, ViewChild, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { LotesService } from 'app/services/lotes.service';
import { ComentarioAvancesDialogoComponent } from 'app/components/residente/comentario-avances-dialogo/comentario-avances-dialogo.component';
import { MatDialog, MatDrawer, MatSnackBar } from '@angular/material';
import { ObrasService } from 'app/services/obras.service';
import { AuthService } from 'app/services/auth.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MediaMatcher } from '@angular/cdk/layout';
import { FotoPartidaDialogoComponent } from 'app/components/residente/foto-partida-dialogo/foto-partida-dialogo.component';
import { SelectionModel } from '@angular/cdk/collections';
import { Rol } from "../../../constantes/roles";


@Component({
  selector: 'app-avances',
  templateUrl: './avances.component.html',
  styleUrls: ['./avances.component.scss'],
  //changeDetection: ChangeDetectionStrategy.OnPush
})
export class AvancesComponent implements OnInit {
  num_partidas_finalizadas: any;
  num_partidas: any;
  @ViewChild(MatDrawer) drawer: MatDrawer;

  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;


  lote: any;
  acordeon: any;
  obra: any = { manzanas: [], obra: {} };
  obra_selected: string = "";
  obras: any = [];
  Rol = Rol;
  usuario: any;

  selection: SelectionModel<any>;
  trackByIdPartida = (index, item) => item.id_partida;



  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private media: MediaMatcher,
    private router: Router,
    private route: ActivatedRoute,
    private obraSrv: ObrasService,
    private loteSrv: LotesService,
    public dialog: MatDialog,
    private authSrv: AuthService,
    public snackBar: MatSnackBar
  ) {

    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

  }

  ngOnInit() {
    //console.log("onInit");

    this.usuario = this.authSrv.usuario;

    this.route.data
      .subscribe((data: { obras: any[], usuario: any }) => {
        //console.log("resultado resolve ", data);
        this.obras = data.obras;
        //this.usuario = data.usuario;
      });

    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        if (params.has("obra")) {
          this.obra_selected = params.get("obra");
          return this.obraSrv.getAcordeonManzanas(params.get("obra"));
        } else {
          return observableOf({ datos: {} });
        }
      })).subscribe(obra => {
        //console.log("obra", obra);
        this.obra = obra;
        //this.changeDetectorRef.markForCheck();
        //this.changeDetectorRef.detectChanges();
      });


  }


  cargarObra(id_obra: string) {

    if (id_obra) {
      this.router.navigate([".", { obra: id_obra }]);
    } else {
      this.router.navigate([".", {}]);
    }

  }

  addAvance() {
    //console.log("selection", this.selection.selected);

    let ids = [];

    this.selection.selected.forEach(partida => {
      ids.push(partida.id_partida);
    });

    this.loteSrv.addAvancePartida(ids, this.lote.id_lote)
      .subscribe((res: any) => {
        //console.log("response", res);


        this.num_partidas_finalizadas = res.num_partidas_finalizadas;

        let update = new Set();
        this.selection.selected.forEach(partida => {

          //si la partida en la seleccion fue devuelta 
          if (res.avances[partida.id_partida]) {
            partida.fecha_fin = res.avances[partida.id_partida];
            partida.fecha_liberacion = null;

            if (partida.partida) {
              //añadimos el id de la partida padre
              //porque no podemos pasar la referencia
              update.add(partida.partida);
            }
          }

        });

        update.forEach(id_partida => {
          let i = this.acordeon.findIndex(partida => partida.id_partida == id_partida);
          this.updateSubpartidasFinalizadas(this.acordeon[i]);
        });


        this.selection.clear();

        //this.changeDetectorRef.detectChanges();

        this.snackBar.open("Avance Agregado", "", {
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

  addLiberacion() {
    //console.log("selection", this.selection.selected);

    let ids = [];

    this.selection.selected.forEach(partida => {
      ids.push(partida.id_partida);
    });

    this.loteSrv.addLiberacionPartida(ids, this.lote.id_lote)
      .subscribe((partidas: any) => {
        //console.log("partidas", partidas);

        this.selection.selected.forEach(partida => {

          if (partidas[partida.id_partida]) {
            partida.fecha_liberacion = partidas[partida.id_partida];
          }

        });

        this.selection.clear();

        this.snackBar.open("Liberación Agregada", "", {
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

  delAvance() {
    //console.log("selection", this.selection.selected);

    let ids = [];

    this.selection.selected.forEach(partida => {
      ids.push(partida.id_partida);
    });

    this.loteSrv.delAvancePartida(ids, this.lote.id_lote)
      .subscribe((res: any) => {
        //console.log("partidas", res);
        this.num_partidas_finalizadas = res.num_partidas_finalizadas;

        let update = new Set();
        this.selection.selected.forEach(partida => {

          if (res.avances[partida.id_partida]) {
            partida.fecha_fin = null;
            partida.fecha_liberacion = null;

            if (partida.partida) {
              //añadimos el id de la partida padre
              //porque no podemos pasar la referencia
              update.add(partida.partida);
            }

          }

        });

        update.forEach(id_partida => {
          let i = this.acordeon.findIndex(partida => partida.id_partida == id_partida);
          this.updateSubpartidasFinalizadas(this.acordeon[i]);
        });


        this.selection.clear();

        this.snackBar.open("Avance Eliminado", "", {
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

  delLiberacion() {
    //console.log("selection", this.selection.selected);

    let ids = [];

    this.selection.selected.forEach(partida => {
      ids.push(partida.id_partida);
    });

    this.loteSrv.delLiberacionPartida(ids, this.lote.id_lote)
      .subscribe((res: any) => {
        //console.log("partidas", res.count);

        this.selection.selected.forEach(partida => {

          if (res.avances[partida.id_partida]) {
            partida.fecha_liberacion = null;
          }

        });

        this.selection.clear();

        this.snackBar.open("Liberación Eliminada", "", {
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

  comentarioAvances() {
    let dialogRef = this.dialog.open(ComentarioAvancesDialogoComponent, {
      width: '500px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  /*   numSubpartidasFinalizadas(partida) {
      //console.log("partidaFinalizada", partida.id_partida);
      var count = 0;
  
      //tiene subpartidas
      if (partida.subpartidas.length) {
  
        for (var i = 0; i < partida.subpartidas.length; i++) {
  
          if (partida.subpartidas[i].fecha_fin !== null) {
            count++;
          }
        }
  
      } else {
        count = partida.fecha_fin !== null ? 1 : 0;
      }
  
      return count;
  
    } */


  updateSubpartidasFinalizadas(partida) {
    //console.log("updatePartida", partida.id_partida);
    var count = 0;
    for (var i = 0; i < partida.subpartidas.length; i++) {

      if (partida.subpartidas[i].fecha_fin !== null) {
        count++;
      }
    }
    partida.num_subpartidas_finalizadas = count;

  }

  /*   partidaFinalizada(partida) {
      // console.log("partidaFinalizada", partida.id_partida);
      var finalizada = true;
  
      //tiene subpartidas
      if (partida.subpartidas.length) {
  
        for (var i = 0; i < partida.subpartidas.length; i++) {
          //si encontramos alguna sin finalizar devolvemos false
          if (partida.subpartidas[i].fecha_fin === null) {
            return false;
          }
        }
  
      } else {
        finalizada = partida.fecha_fin !== null;
      }
  
      return finalizada;
  
    } */

  getAvancesLote(lote) {
    //console.log("getAvancesLote", lote);

    if (this.mobileQuery.matches) {
      this.drawer.close();
    }

    this.loteSrv.getAvances(lote.id_lote)
      .subscribe((response: any) => {
        this.lote = response.lote;
        this.acordeon = response.acordeon;
        this.num_partidas = +response.num_partidas;
        this.num_partidas_finalizadas = +response.num_partidas_finalizadas;
        this.selection = new SelectionModel<any>(true, []);

        //this.changeDetectorRef.markForCheck();

      });


  }

  addFoto(partida) {


    //dentro del dialogo se incrementa el numero de fotos
    let dialogRef = this.dialog.open(FotoPartidaDialogoComponent, {
      width: '500px',
      data: {
        id_lote: this.lote.id_lote,
        id_partida: partida.id_partida,
        partida: partida
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {

        this.snackBar.open("Foto Agregada", "", {
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

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);

  }

}

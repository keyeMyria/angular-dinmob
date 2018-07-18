
import { of as observableOf, Observable } from 'rxjs';

import { switchMap } from 'rxjs/operators';
import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
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
  selector: 'app-arranque',
  templateUrl: './arranque.component.html',
  styleUrls: ['./arranque.component.scss']
})
export class ArranqueComponent implements OnInit {
  num_partidas_finalizadas: any;
  num_partidas: any;
  @ViewChild(MatDrawer) drawer: MatDrawer;

  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;


  lote: any;
  acordeon: any;
  obra: any;
  obra_selected: string = "";
  obras: any = [];
  Rol = Rol;
  usuario: any;

  trackByIndex = (index, item) => item.id_partida;

  selection: SelectionModel<any>;



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

    this.usuario = this.authSrv.usuario;

    this.route.data
      .subscribe((data: { obras: any[] }) => {
        //console.log("resusltado resolve ", data);
        this.obras = data.obras;
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
      });


  }

  cargarObra(id_obra: string) {

    if (id_obra) {
      this.router.navigate([".", { obra: id_obra }]);
    } else {
      this.router.navigate([".", {}]);
    }

  }

  addArranque() {
    //console.log("selection", this.selection.selected);

    let ids = [];

    this.selection.selected.forEach(partida => {
      ids.push(partida.id_partida);
    });

    this.loteSrv.addAvancePartida(ids, this.lote.id_lote)
      .subscribe(partidas => {
        console.log("partidas", partidas);

        this.selection.selected.forEach(partida => {

          if (partidas[partida.id_partida]) {
            partida.fecha_fin = partidas[partida.id_partida];
          }

        });

        this.selection.clear();

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


  delArranque() {
    //console.log("selection", this.selection.selected);

    let ids = [];

    this.selection.selected.forEach(partida => {
      ids.push(partida.id_partida);
    });

    this.loteSrv.delAvancePartida(ids, this.lote.id_lote)
      .subscribe((res: any) => {
        //console.log("partidas", res.count);

        this.selection.selected.forEach(partida => {

          partida.fecha_fin = null;
          partida.fecha_liberacion = null;

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


  /*   numSubpartidasFinalizadas(partida) {
      console.log("numSubpartidasFinalizadas" + partida.id_partida);
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

  /*   partidaFinalizada(partida) {
      console.log("partidaFinalizada" + partida.id_partida);
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

  getArranqueLote(lote) {
    //console.log("getArranqueLote", lote);
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
      });

  /*   if (this.mobileQuery.matches) {
      this.drawer.close();
    } */


  }



  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);

  }

}
















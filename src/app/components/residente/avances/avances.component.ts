import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { LotesService } from 'app/services/lotes.service';
import { ComentarioAvancesDialogoComponent } from 'app/components/residente/comentario-avances-dialogo/comentario-avances-dialogo.component';
import { MatDialog, MatDrawer, MatSnackBar } from '@angular/material';
import { ObrasService } from 'app/services/obras.service';
import { AuthService } from 'app/services/auth.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { MediaMatcher } from '@angular/cdk/layout';
import { FotoPartidaDialogoComponent } from 'app/components/residente/foto-partida-dialogo/foto-partida-dialogo.component';


@Component({
  selector: 'app-avances',
  templateUrl: './avances.component.html',
  styleUrls: ['./avances.component.scss']
})
export class AvancesComponent implements OnInit {
  @ViewChild(MatDrawer) drawer: MatDrawer;

  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;


  lote: any;
  obra: any;
  obra_selected: string = "";
  obras: any = [];



  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private media: MediaMatcher,
    private router: Router,
    private route: ActivatedRoute,
    private obraSrv: ObrasService,
    private loteSrv: LotesService,
    public dialog: MatDialog,
    private auth: AuthService,
    public snackBar: MatSnackBar
  ) {

    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

  }

  ngOnInit() {
    this.route.data
      .subscribe((data: { obras: any[] }) => {
        //console.log("resusltado resolve ", data);
        this.obras = data.obras;
      });
    this.route.paramMap
      .switchMap((params: ParamMap) => {
        if (params.has("obra")) {
          this.obra_selected = params.get("obra");
          return this.obraSrv.getAcordeonManzanas(params.get("obra"));
        } else {
          return Observable.of({ datos: {} });
        }
      }).subscribe(obra => {
        console.log("obra", obra);
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

  comentarioAvances():
    void {
    let dialogRef = this.dialog.open(ComentarioAvancesDialogoComponent, {
      width: '500px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  numSubpartidasFinalizadas(partida) {
    //console.log("partidaFinalizada" + partida.id_partida);
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

  }

  partidaFinalizada(partida) {
    //console.log("partidaFinalizada" + partida.id_partida);
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

  }

  getAvancesLote(lote) {
    console.log("getAvancesLote", lote);

    this.loteSrv.getAvances(lote.id_lote)
      .subscribe(response => {
        this.lote = response;
      });

    if (this.mobileQuery.matches) {
      this.drawer.close();
    }


  }

  addFoto() {
    let dialogRef = this.dialog.open(FotoPartidaDialogoComponent, {
      width: '500px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {

        this.snackBar.open("Foto Agregada", "", {
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

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener)

  }

}

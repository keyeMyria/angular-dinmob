import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { LotesService } from 'app/services/lotes.service';
import { ComentarioAvancesDialogoComponent } from 'app/components/residente/comentario-avances-dialogo/comentario-avances-dialogo.component';
import { MatDialog, MatDrawer } from '@angular/material';
import { ObrasService } from 'app/services/obras.service';
import { Usuario } from 'app/model/usuario';
import { AuthService } from 'app/services/auth.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { MediaMatcher } from '@angular/cdk/layout';


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
  usuario: Usuario;



  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private media: MediaMatcher,
    private router: Router,
    private route: ActivatedRoute,
    private obraSrv: ObrasService,
    private loteSrv: LotesService,
    public dialog: MatDialog,
    private auth: AuthService,
  ) {

    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

  }

  ngOnInit() {

    this.usuario = this.auth.getUsuario();


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
        this.obra = obra
      });


    this.obraSrv.getObrasUsuario(this.usuario.id_usuario)
      .subscribe(response => {
        this.obras = response;
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

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener)

  }

}

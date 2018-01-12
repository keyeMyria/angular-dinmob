import { Component, OnInit, ViewChild } from '@angular/core';
import { LotesService } from 'app/services/lotes.service';
import { ComentarioAvancesDialogoComponent } from 'app/components/residente/comentario-avances-dialogo/comentario-avances-dialogo.component';
import { MatDialog, MatDrawer } from '@angular/material';
import { ObrasService } from 'app/services/obras.service';
import { Usuario } from 'app/model/usuario';
import { AuthService } from 'app/services/auth.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'app-avances',
  templateUrl: './avances.component.html',
  styleUrls: ['./avances.component.scss']
})
export class AvancesComponent implements OnInit {
  @ViewChild(MatDrawer) drawer: MatDrawer;

  lote: any;
  obra: any;
  obras_selected: any = {};
  obras: any = [];
  usuario: Usuario;



  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private obraSrv: ObrasService,
    private loteSrv: LotesService,
    public dialog: MatDialog,
    private auth: AuthService,
  ) { }

  ngOnInit() {

    this.usuario = this.auth.getUsuario();


    /*     this.obraSrv.loadFullObra(58)
          .subscribe(response => {
            this.obra = response;
            console.log("obra", this.obra);
          }); */

    this.route.paramMap
      .switchMap((params: ParamMap) => {
        if (params.has("obra")) {
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
    this.drawer.toggle();
    this.loteSrv.getAvances(lote.id_lote)
      .subscribe(response => {
        this.lote = response;
      });


  }

}

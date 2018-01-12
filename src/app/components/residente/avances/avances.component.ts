import { Component, OnInit, ViewChild } from '@angular/core';
import { LotesService } from 'app/services/lotes.service';
import { ComentarioAvancesDialogoComponent } from 'app/components/residente/comentario-avances-dialogo/comentario-avances-dialogo.component';
import { MatDialog, MatDrawer } from '@angular/material';
import { ObrasService } from 'app/services/obras.service';


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




  constructor(
    private obraSrv: ObrasService,
    private loteSrv: LotesService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.obraSrv.loadFullObra(58)
      .subscribe(response => {
        this.obra = response;
        console.log("obra", this.obra);
      });

    this.obraSrv.getObrasUsuario(18)
      .subscribe(response => {
        this.obras = response;
      });

    this.loteSrv.getAvances(153)
      .subscribe(response => {
        this.lote = response;
      });
    this.obraSrv.getAcordeonManzanas(53)
      .subscribe(response => {
        this.obra = response;
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


  }

}

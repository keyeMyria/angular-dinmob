import { Component, OnInit } from '@angular/core';
import { LotesService } from 'app/services/lotes.service';
import { ComentarioAvancesDialogoComponent } from 'app/components/residente/comentario-avances-dialogo/comentario-avances-dialogo.component';
import { MdDialog } from '@angular/material';

@Component({
  selector: 'app-avances',
  templateUrl: './avances.component.html',
  styleUrls: ['./avances.component.scss']
})
export class AvancesComponent implements OnInit {

  lote: any;



  constructor(
    private loteSrv: LotesService,
    public dialog: MdDialog
  ) { }

  ngOnInit() {
    this.loteSrv.getAvances(153)
      .subscribe(response => {
        this.lote = response;
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

}

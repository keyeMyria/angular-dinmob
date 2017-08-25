import { Component, OnInit } from '@angular/core';
import { ObrasService } from "app/services/obras.service";

@Component({
  selector: 'app-estructura-obra',
  templateUrl: './estructura-obra.component.html',
  styleUrls: ['./estructura-obra.component.scss']
})
export class EstructuraObraComponent implements OnInit {

  obras: any = [];
  obra: any = {};
  obras_selected: any = {};

  constructor(private obraSrv: ObrasService) { }

  ngOnInit() {
    this.obraSrv.loadFullObra(58)
      .subscribe(response => {
        this.obra = response;
      });

    this.obraSrv.getObrasUsuario(18)
      .subscribe(response => {
        this.obras = response;
      });
  }

  toggleSelectionLote(manzana, lote) {
    lote.selected = !lote.selected;

  /*   var allSelected = _.find(manzana.lotes, function (lote) {
      return !_.has(lote, 'selected') || lote.selected === false;
    });

    if (_.isUndefined(allSelected)) {
      manzana.selected = true;
    } else {
      manzana.selected = false;
    } */



  };

}

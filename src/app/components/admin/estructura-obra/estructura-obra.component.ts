import { Component, OnInit } from '@angular/core';
import { ObrasService } from "app/services/obras.service";

@Component({
  selector: 'app-estructura-obra',
  templateUrl: './estructura-obra.component.html',
  styleUrls: ['./estructura-obra.component.scss']
})
export class EstructuraObraComponent implements OnInit {

  obras: any = [];
  obra: any = {
    datos: {}
  };
  obras_selected: any = {};
  residente: any = {};
  addManzanaOptions: any = {
    by: ""
  };
  nuevaManzana: any = {
    nombre: ""
  };

  addLoteOptions: any = {
    by: ""
  };

  nuevoLote: any = {
    nombre:""
  };

  op: any = {
    prototipo:""
  };

  manzanaSelected: any ={
    nombre:""
  };



  constructor(private obraSrv: ObrasService) { }



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



  }

  residentesRepetidos() {
    return true;
  }

  controlAlmacenRepetidos() {
    return true;
  }

  num_lotes_selected() {
    return 0;
  }


}

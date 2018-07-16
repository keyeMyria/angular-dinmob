import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

declare var $: any;

@Component({
  selector: 'app-mapas-avances-config-dialogo',
  templateUrl: './mapas-avances-config-dialogo.component.html',
  styleUrls: ['./mapas-avances-config-dialogo.component.scss']
})
export class MapasAvancesConfigDialogoComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<MapasAvancesConfigDialogoComponent>
  ) { }

  ngOnInit() {
  }

  toggleVerLeyenda(event) {
    this.data.verLeyenda.toggle = event.checked;
    $(".jvectormap-legend-cnt.jvectormap-legend-cnt-v").toggleClass("d-none");

  }

  escalaDiscreta() {
    this.data.map.series.regions[1].setValues(this.data.valuesDiscretosLotes);
    this.data.variableContinua.toggle = false;
    let items = $(".jvectormap-legend-cnt.jvectormap-legend-cnt-v .jvectormap-legend");
    $(items[0]).addClass("d-none");
    $(items[1]).removeClass("d-none");

  }

  /*  escalaContinua() {
     this.data.map.series.regions[0].setValues(this.data.valuesLotes); 
     this.data.variableContinua.toggle = true;
   } */

  escalaVentas() {
    this.data.map.series.regions[0].setValues(this.data.valuesVentas);
    this.data.variableContinua.toggle = true;
    let items = $(".jvectormap-legend-cnt.jvectormap-legend-cnt-v .jvectormap-legend");
    $(items[0]).removeClass("d-none");
    $(items[1]).addClass("d-none");
  }



}

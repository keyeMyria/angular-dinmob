import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-mapas-ventas-config-dialogo',
  templateUrl: './mapas-ventas-config-dialogo.component.html',
  styleUrls: ['./mapas-ventas-config-dialogo.component.scss']
})
export class MapasVentasConfigDialogoComponent implements OnInit {
  //verLeyenda: boolean;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<MapasVentasConfigDialogoComponent>
  ) {

  }

  ngOnInit() {
  }

  toggleVerLeyenda(event) {
    //console.log("ver leyenda", event.checked);
    this.data.verLeyenda.toggle = event.checked;
    $(".jvectormap-legend-cnt.jvectormap-legend-cnt-v").toggleClass("d-none");
    //let items= $(".jvectormap-legend-cnt.jvectormap-legend-cnt-v");
    //console.log(items);


  }

  escalaPrototipos() {
    //console.log("asignacion de la escala de prototipos");
    // region 0 lotes
    // region 1 prototipos
    // region 2 texto
    this.data.map.series.regions[1].setValues(this.data.prototipos);
    this.data.verPrototipos.disabled = true;

  }

  escalaEstados() {
    //console.log("asignacion de la escala de estados");
    // region 0 lotes
    // region 1 prototipos
    // region 2 texto
    this.data.map.series.regions[0].setValues(this.data.lotes);
    this.data.verPrototipos.disabled = false;
  }

}

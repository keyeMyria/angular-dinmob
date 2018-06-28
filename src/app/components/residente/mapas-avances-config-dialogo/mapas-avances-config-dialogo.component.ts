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
    //console.log("ver leyenda", event.checked);
    this.data.verLeyenda.toggle = event.checked;
    $(".jvectormap-legend-cnt.jvectormap-legend-cnt-v").toggleClass("d-none");
    //let items= $(".jvectormap-legend-cnt.jvectormap-legend-cnt-v");
    //console.log(items);


  }



}

import { Component, OnInit, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material';

@Component({
  selector: 'app-opciones-mapa-ventas-bottom-sheet',
  templateUrl: './opciones-mapa-ventas-bottom-sheet.component.html',
  styleUrls: ['./opciones-mapa-ventas-bottom-sheet.component.scss']
})
export class OpcionesMapaVentasBottomSheetComponent implements OnInit {

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private bootomSheetRef: MatBottomSheetRef<OpcionesMapaVentasBottomSheetComponent>
  ) { }

  ngOnInit() {
  }

  cerrar(opcion:number){
    this.bootomSheetRef.dismiss(opcion);
  }

}

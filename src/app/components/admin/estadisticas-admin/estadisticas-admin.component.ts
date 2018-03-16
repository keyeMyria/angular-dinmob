import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-estadisticas-admin',
  templateUrl: './estadisticas-admin.component.html',
  styleUrls: ['./estadisticas-admin.component.scss']
})
export class EstadisticasAdminComponent implements OnInit {
  obras: any = [];
  estadisticas: any ={};
  obra_selected: string = "";
  constructor() { }

  ngOnInit() {
  }

}

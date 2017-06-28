import { Component } from '@angular/core';
import { MenuItem, TreeNode } from "primeng/components/common/api";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})



export class AppComponent {
  title = 'app';
  lotes: Lote[] = [
    { id_lote: 1, nombre: "Lote 1", code: "M1L1" },
    { id_lote: 2, nombre: "Lote 2", code: "M1L2" },
    { id_lote: 3, nombre: "Lote 3", code: "M1L3" },
    { id_lote: 4, nombre: "Lote 4", code: "M1L4" },
    { id_lote: 5, nombre: "Lote 5", code: "M1L5" }
  ];

 

  loteSelected: Lote = null;

  acciones: MenuItem = [
    { label: 'View', icon: 'fa-search', command: (event) => this.alertLote(this.loteSelected) },
    { label: 'Delete', icon: 'fa-close', command: (event) => this.alertLote(this.loteSelected) }
  ];

  alertLote(lote) {
    alert(lote.nombre);
  }

  cbClick(event){
    event.stopPropagation();
  }

}

export interface Lote {
  nombre: string;
  code: string;
  id_lote: number;
}

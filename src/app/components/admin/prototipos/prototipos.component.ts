import { Component, OnInit } from '@angular/core';
import { ObrasService } from "app/services/obras.service";

@Component({
  selector: 'app-prototipos',
  templateUrl: './prototipos.component.html',
  styleUrls: ['./prototipos.component.scss']
})
export class PrototiposComponent implements OnInit {
  obras: any = [];
  obra: any = {
    datos: {}
  };
  obras_selected: any = {};

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

}

import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate,
  keyframes
} from "@angular/animations";
import { ObrasService } from "app/services/obras.service";

@Component({
  selector: 'app-desarrollos',
  templateUrl: './desarrollos.component.html',
  styleUrls: ['./desarrollos.component.scss'],

})
export class DesarrollosComponent implements OnInit {
 
  obras: any = [];
  obra: any = {
    datos: {}
  };
  obra_selected: any = {};
 
  constructor(
    private obraSrv: ObrasService
  ) { }



  ngOnInit() {

    this.obraSrv.getLotes(58)
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

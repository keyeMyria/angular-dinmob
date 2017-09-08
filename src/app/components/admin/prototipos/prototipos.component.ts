import { Component, OnInit } from '@angular/core';
import { ObrasService } from "app/services/obras.service";
import { AgregarPrototipoDialogoComponent } from "app/components/admin/agregar-prototipo-dialogo/agregar-prototipo-dialogo.component";
import { MdDialog } from "@angular/material";
import { Router } from "@angular/router";
import { CambiarNombrePrototipoDialogoComponent } from "app/components/admin/cambiar-nombre-prototipo-dialogo/cambiar-nombre-prototipo-dialogo.component";

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

  constructor(private obraSrv: ObrasService, public dialog: MdDialog, private router: Router) { }

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

  agregarPrototipo() {
    let dialogRef = this.dialog.open(AgregarPrototipoDialogoComponent, {
      data: {},
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
      }
      console.log('The dialog was closed');
    });
  }

  editarPrototipo() {
    this.router.navigate(["/editar-prototipo"]);
  }

  cambiarNombre() {
    let dialogRef = this.dialog.open(CambiarNombrePrototipoDialogoComponent, {
      data: {},
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
      }
      console.log('The dialog was closed');
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { ObrasService } from "app/services/obras.service";
import { AgregarPrototipoDialogoComponent } from "app/components/admin/agregar-prototipo-dialogo/agregar-prototipo-dialogo.component";
import { MatDialog, MatSnackBar } from "@angular/material";
import { Router } from "@angular/router";
import { CambiarNombrePrototipoDialogoComponent } from "app/components/admin/cambiar-nombre-prototipo-dialogo/cambiar-nombre-prototipo-dialogo.component";
import { PrototiposService } from 'app/services/prototipos.service';
import { Prototipo } from "app/model/prototipo";


@Component({
  selector: 'app-prototipos',
  templateUrl: './prototipos.component.html',
  styleUrls: ['./prototipos.component.scss']
})
export class PrototiposComponent implements OnInit {
  loading: boolean;
  obras: any = [];
  obra: any = {
    datos: {}
  };
  obras_selected: any = {};
  prototipos: Prototipo[];

  constructor(
    public snackBar: MatSnackBar,
    public prototipoSrv: PrototiposService,
    private obraSrv: ObrasService,
    public dialog: MatDialog,
    private router: Router
  ) { }

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

    this.loading = true;
    this.prototipoSrv.getPrototipos()
      .subscribe(res => {
        this.prototipos = res;
        this.loading = false;

      });


  }

  cargarObra(id_obra) {

    if (id_obra) {
      this.prototipoSrv.getPrototiposObra(id_obra)
        .subscribe(res => {
          this.prototipos = res;
        });
    }

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

  editarPrototipo(prototipo) {
    this.router.navigate(["/editar-prototipo", prototipo.id_prototipo]);
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

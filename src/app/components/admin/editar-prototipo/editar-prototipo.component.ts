import { Component, OnInit } from '@angular/core';
import { EditarNombrePrototipoDialogoComponent } from 'app/components/admin/editar-nombre-prototipo-dialogo/editar-nombre-prototipo-dialogo.component';
import { MatDialog, MatSnackBar } from '@angular/material';
import { AgregarPartidaDialogoComponent } from 'app/components/admin/agregar-partida-dialogo/agregar-partida-dialogo.component';
import { EditarPartidaDialogoComponent } from 'app/components/admin/editar-partida-dialogo/editar-partida-dialogo.component';
import { AgregarSubpartidaDialogoComponent } from 'app/components/admin/agregar-subpartida-dialogo/agregar-subpartida-dialogo.component';
import { EditarSubpartidaDialogoComponent } from 'app/components/admin/editar-subpartida-dialogo/editar-subpartida-dialogo.component';
import { AgregarInsumoDialogoComponent } from 'app/components/admin/agregar-insumo-dialogo/agregar-insumo-dialogo.component';
import { EditarInsumoDialogoComponent } from 'app/components/admin/editar-insumo-dialogo/editar-insumo-dialogo.component';
import { PrototiposService } from "app/services/prototipos.service";
import { ActivatedRoute, Router, ParamMap } from "@angular/router";
import { Prototipo } from "app/model/prototipo";
import { Partida } from "app/model/partida";
import { Insumo } from "app/model/insumo";
import { ConfirmarBorradoDialogoComponent } from 'app/components/admin/confirmar-borrado-dialogo/confirmar-borrado-dialogo.component';

@Component({
  selector: 'app-editar-prototipo',
  templateUrl: './editar-prototipo.component.html',
  styleUrls: ['./editar-prototipo.component.scss']
})
export class EditarPrototipoComponent implements OnInit {
  loading: boolean = false;
  selectedOption: string;
  prototipo: any;
  subpartida: any;
  insumo: any;
  insumos: any[];



  constructor(
    private prototipoSrv: PrototiposService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.loading = true;
    this.route.paramMap
      .switchMap((params: ParamMap) =>
        this.prototipoSrv.getPrototipo(params.get('id')))
      .subscribe(res => {
        this.prototipo = res;
        this.loading = false;
      });


  }

  editarNombre(prototipo) {


    let dialogRef = this.dialog.open(EditarNombrePrototipoDialogoComponent, {
      data: {
        prototipo: prototipo
      },
      width: '500px',
    });
    dialogRef.afterClosed().subscribe(result => {

    });
  }

  agregarPartida() {

    let dialogRef = this.dialog.open(AgregarPartidaDialogoComponent, {
      data: {
        prototipo: this.prototipo
      },
      width: '500px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        if (result === true) {
          this.snackBar.open("Partida Agregada", "Cerrar", {
            duration: 2000
          });
        }
      }
    });
  }

  editarPartida(partida) {

    let dialogRef = this.dialog.open(EditarPartidaDialogoComponent, {
      data: {
        partida: partida
      },
      width: '500px',

    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.snackBar.open("Partida Actualizada", "Cerrar", {
          duration: 2000
        });
      }
    });
  }

  agregarSubpartida() {

    let dialogRef = this.dialog.open(AgregarSubpartidaDialogoComponent, {
      data: {
        subpartida: this.subpartida
      },
      width: '500px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        if (result === true) {
          this.snackBar.open("Subpartida Agregada", "Cerrar", {
            duration: 2000
          });
        }
      }
    });
  }

  editarSubpartida(subpartida) {

    let dialogRef = this.dialog.open(EditarSubpartidaDialogoComponent, {
      data: {
        subpartida: subpartida
      },
      width: '500px',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.selectedOption = result;
    });
  }

  agregarInsumo() {

    let dialogRef = this.dialog.open(AgregarInsumoDialogoComponent, {
      data: {
        insumos: this.insumos,
        insumo: this.insumo
      },
      width: '500px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        if (result === true) {
          this.snackBar.open("Insumo Agregado", "Cerrar", {
            duration: 2000
          });
        }
      }

    });
  }

  editarInsumo(insumo) {


    let dialogRef = this.dialog.open(EditarInsumoDialogoComponent, {
      data: {
        insumo: insumo
      },
      width: '500px',
    });
    dialogRef.afterClosed().subscribe(result => {

    });
  }

  delPartida(partida) {


    let dialogRef = this.dialog.open(ConfirmarBorradoDialogoComponent, {
      data: {
        title: "Eliminar Partida",
        content: `¿Desea eliminar la partida: ${partida.nombre}?`
      },
      width: '500px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
      }

    });

  }

  delSubpartida(subpartida) {


    let dialogRef = this.dialog.open(ConfirmarBorradoDialogoComponent, {
      data: {
        title: "Eliminar Subpartida",
        content: `¿Desea eliminar la Subpartida: ${subpartida.nombre}?`
      },
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
      }
    });
  }

  delInsumo(insumo) {
    let dialogRef = this.dialog.open(ConfirmarBorradoDialogoComponent, {
      data: {
        title: "Eliminar Insumo",
        content: `¿Desea eliminar el Insumo: ${insumo.insumo}?`
      },
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
      }
    });

  }




}

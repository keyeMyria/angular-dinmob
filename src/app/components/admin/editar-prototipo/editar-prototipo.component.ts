import { Component, OnInit } from '@angular/core';
import { EditarNombrePrototipoDialogoComponent } from 'app/components/admin/editar-nombre-prototipo-dialogo/editar-nombre-prototipo-dialogo.component';
import { MdDialog } from '@angular/material';
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

@Component({
  selector: 'app-editar-prototipo',
  templateUrl: './editar-prototipo.component.html',
  styleUrls: ['./editar-prototipo.component.scss']
})
export class EditarPrototipoComponent implements OnInit {
  selectedOption: string;

  prototipo: any;



  constructor(
    private prototipoSrv: PrototiposService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MdDialog
  ) { }

  ngOnInit() {

    this.route.paramMap
      .switchMap((params: ParamMap) =>
        this.prototipoSrv.getPrototipo(params.get('id')))
      .subscribe(res => {
        this.prototipo = res;
      });


  }

  editarNombre(prototipo: Prototipo) {

    let copia = Prototipo.copiar(this.prototipo.info);

    let dialogRef = this.dialog.open(EditarNombrePrototipoDialogoComponent, {
      data: { prototipo: copia },
      width: '500px',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.selectedOption = result;
    });
  }

  agregarPartida(prototipo: Prototipo) {

    let copia = Prototipo.copiar(this.prototipo.info);

    let dialogRef = this.dialog.open(AgregarPartidaDialogoComponent, {
      data: {
        prototipo: copia
      },
      width: '500px',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.selectedOption = result;
    });
  }

  editarPartida(partida) {

    let copia = Partida.copiar(partida);

    let dialogRef = this.dialog.open(EditarPartidaDialogoComponent, {
      data: { partida: copia },
      width: '500px',

    });
    dialogRef.afterClosed().subscribe(result => {
      this.selectedOption = result;
    });
  }

  agregarSubpartida() {

    console.log();
    let dialogRef = this.dialog.open(AgregarSubpartidaDialogoComponent, {
      data: {
      },
      width: '500px',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.selectedOption = result;
    });
  }

  editarSubpartida(subpartida) {

    let copia = Partida.copiar(subpartida);
    
    let dialogRef = this.dialog.open(EditarSubpartidaDialogoComponent, {
      data: {
        subpartida:copia
      },
      width: '500px',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.selectedOption = result;
    });
  }

  agregarInsumo() {

    console.log();
    let dialogRef = this.dialog.open(AgregarInsumoDialogoComponent, {
      data: {
      },
      width: '500px',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.selectedOption = result;
    });
  }

  editarInsumo(insumo) {

    let copia = Insumo.copiar(insumo)

    let dialogRef = this.dialog.open(EditarInsumoDialogoComponent, {
      data: {
        insumo:copia
      },
      width: '500px',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.selectedOption = result;
    });
  }




}

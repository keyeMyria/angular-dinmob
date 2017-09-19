import { Component, OnInit } from '@angular/core';
import { EditarNombrePrototipoDialogoComponent } from 'app/components/admin/editar-nombre-prototipo-dialogo/editar-nombre-prototipo-dialogo.component';
import { MdDialog } from '@angular/material';
import { AgregarPartidaDialogoComponent } from 'app/components/admin/agregar-partida-dialogo/agregar-partida-dialogo.component';
import { EditarPartidaDialogoComponent } from 'app/components/admin/editar-partida-dialogo/editar-partida-dialogo.component';
import { AgregarSubpartidaDialogoComponent } from 'app/components/admin/agregar-subpartida-dialogo/agregar-subpartida-dialogo.component';
import { EditarSubpartidaDialogoComponent } from 'app/components/admin/editar-subpartida-dialogo/editar-subpartida-dialogo.component';
import { AgregarInsumoDialogoComponent } from 'app/components/admin/agregar-insumo-dialogo/agregar-insumo-dialogo.component';
import { EditarInsumoDialogoComponent } from 'app/components/admin/editar-insumo-dialogo/editar-insumo-dialogo.component';

@Component({
  selector: 'app-editar-prototipo',
  templateUrl: './editar-prototipo.component.html',
  styleUrls: ['./editar-prototipo.component.scss']
})
export class EditarPrototipoComponent implements OnInit {
  selectedOption: string;


  constructor(public dialog: MdDialog) { }

  ngOnInit() {
  }

  editarNombre() {

    console.log();
    let dialogRef = this.dialog.open(EditarNombrePrototipoDialogoComponent, {
      data: {
      },
      width: '500px',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.selectedOption = result;
    });
  }

  agregarPartida() {

    console.log();
    let dialogRef = this.dialog.open(AgregarPartidaDialogoComponent, {
      data: {
      },
      width: '500px',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.selectedOption = result;
    });
  }

  editarPartida() {

    console.log();
    let dialogRef = this.dialog.open(EditarPartidaDialogoComponent, {
      data: {

      },
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

  editarSubpartida() {

    console.log();
    let dialogRef = this.dialog.open(EditarSubpartidaDialogoComponent, {
      data: {
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

  editarInsumo() {

    console.log();
    let dialogRef = this.dialog.open(EditarInsumoDialogoComponent, {
      data: {
      },
      width: '500px',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.selectedOption = result;
    });
  }




}

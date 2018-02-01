import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EditarDocumentoDialogoComponent } from 'app/components/ventas/editar-documento-dialogo/editar-documento-dialogo.component';
import { EditarMaterialDialogoComponent } from 'app/components/almacen/editar-material-dialogo/editar-material-dialogo.component';
import { MatDialog } from '@angular/material';
import { NuevoMaterialDialogoComponent } from 'app/components/almacen/nuevo-material-dialogo/nuevo-material-dialogo.component';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.scss']
})
export class InventarioComponent implements OnInit {
  loading: boolean;
  obras: any = [];

  constructor(
    private route: ActivatedRoute,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.route.data
      .subscribe((data: { obras: any[] }) => {
        //console.log("resultado resolve ", data);
        this.obras = data.obras;
      });
    //this.loading = true;
  }

  editarMaterial() {
    let dialogRef = this.dialog.open(EditarMaterialDialogoComponent, {
      data: {
      },
      width: '500px'
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  nuevoMaterial() {
    let dialogRef = this.dialog.open(NuevoMaterialDialogoComponent, {
      data: {
      },
      width: '500px'
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }

}

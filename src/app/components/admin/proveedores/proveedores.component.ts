import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { NuevoProveedorDialogoComponent } from '../nuevo-proveedor-dialogo/nuevo-proveedor-dialogo.component';
import { EditarProveedorDialogoComponent } from '../editar-proveedor-dialogo/editar-proveedor-dialogo.component';
import { ConfirmarBorradoDialogoComponent } from "app/components/admin/confirmar-borrado-dialogo/confirmar-borrado-dialogo.component";


@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.scss']
})
export class ProveedoresComponent implements OnInit {


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {

  }


  nuevoProveedor() {

    let dialogRef = this.dialog.open(NuevoProveedorDialogoComponent, {
      data: {
      },
      width: '800px'
    });
    dialogRef.afterClosed().subscribe(result => {

      if (result === true) {

      } else if (result && result.error) {
      }

    });
  }

  editarProveedor() {

    let dialogRef = this.dialog.open(EditarProveedorDialogoComponent, {
      data: {
      },
      width: '500px'
    });
    dialogRef.afterClosed().subscribe(result => {

      if (result === true) {

      } else if (result && result.error) {
      }

    });
  }

  delProveedor() {

    let dialogRef = this.dialog.open(ConfirmarBorradoDialogoComponent, {
      data: {
        title: "Eliminar Proveedor",
        content: `¿Desea eliminar el proveedor:?`
      },
      width: "500px"
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result === true) {
      }

    });

  }






}

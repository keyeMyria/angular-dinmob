import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { EditarDocumentoDialogoComponent } from 'app/components/ventas/editar-documento-dialogo/editar-documento-dialogo.component';
import { EditarMaterialDialogoComponent } from 'app/components/almacen/editar-material-dialogo/editar-material-dialogo.component';
import { MatDialog } from '@angular/material';
import { NuevoMaterialDialogoComponent } from 'app/components/almacen/nuevo-material-dialogo/nuevo-material-dialogo.component';
import { InsumoService } from 'app/services/insumo.service';
import { of } from "rxjs/observable/of";
import { ConfirmarBorradoDialogoComponent } from 'app/components/admin/confirmar-borrado-dialogo/confirmar-borrado-dialogo.component';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.scss']
})
export class InventarioComponent implements OnInit {
  loading: boolean;
  obras: any[] = [];
  obra_selected: string = "";
  materiales: any[] = [];


  constructor(
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private insumoSrv: InsumoService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.route.data
      .subscribe((data: { obras: any[] }) => {
        //console.log("resultado resolve ", data);
        this.obras = data.obras;
      });
    this.loading = true;
    this.route.paramMap
      .switchMap((params: ParamMap) => {
        if (params.has("obra")) {
          this.obra_selected = params.get("obra");
          return this.insumoSrv.getMaterialesObra(params.get("obra"));
        } else {
          return of([]);
        }
      }).subscribe(materiales => {
        //console.log("prototipos", prototipos);
        this.materiales = materiales;
        this.loading = false;

      });

  }

  editarMaterial(material) {
    let dialogRef = this.dialog.open(EditarMaterialDialogoComponent, {
      data: {
        material: material
      },
      width: '500px'
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  delInventario(material) {
    let dialogRef = this.dialog.open(ConfirmarBorradoDialogoComponent, {
      data: {
        title: "Eliminar Insumo",
        content: `¿Desea eliminar el Insumo: ${material.insumo}?`
      },
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
      }
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


  cargarObra(id_obra) {

    if (id_obra) {
      this.router.navigate([".", { obra: id_obra }]);
    } else {
      this.router.navigate([".", {}]);

    }

  }

}

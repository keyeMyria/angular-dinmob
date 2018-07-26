
import { switchMap } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { EditarDocumentoDialogoComponent } from 'app/components/ventas/editar-documento-dialogo/editar-documento-dialogo.component';
import { EditarMaterialDialogoComponent } from 'app/components/almacen/editar-material-dialogo/editar-material-dialogo.component';
import { MatDialog, MatSnackBar, Sort } from '@angular/material';
import { NuevoMaterialDialogoComponent } from 'app/components/almacen/nuevo-material-dialogo/nuevo-material-dialogo.component';
import { InsumoService } from 'app/services/insumo.service';
import { of } from "rxjs";
import { ConfirmarBorradoDialogoComponent } from 'app/components/admin/confirmar-borrado-dialogo/confirmar-borrado-dialogo.component';
import { Rol } from "../../../constantes/roles";
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.scss']
})
export class InventarioComponent implements OnInit {
  obras: any[] = [];
  obra_selected: string = "";
  materiales: any = [];
  materiales_filtrados: any = [];
  Rol = Rol;
  usuario: any;


  constructor(
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private insumoSrv: InsumoService,
    private router: Router,
    public snackBar: MatSnackBar,
    private authSrv: AuthService
  ) { }

  ngOnInit() {

    this.usuario = this.authSrv.usuario;

    this.route.data
      .subscribe((data: { obras: any[], usuario: any }) => {
        //console.log("resultado resolve ", data);
        this.obras = data.obras;
        //this.usuario = data.usuario;
      });

    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        if (params.has("obra")) {
          this.obra_selected = params.get("obra");
          return this.insumoSrv.getMaterialesObra(params.get("obra"));
        } else {
          return of([]);
        }
      })).subscribe(materiales => {
        //console.log("prototipos", prototipos);
        this.materiales = materiales;
        this.materiales_filtrados = this.materiales.slice();
      });

  }

  editarMaterial(material) {
    let dialogRef = this.dialog.open(EditarMaterialDialogoComponent, {
      data: {
        material: material,
        materiales: this.materiales,
        materiales_filtrados: this.materiales_filtrados
      },
      width: '500px'
    });
    dialogRef.afterClosed().subscribe(result => {

      if (result === true) {

        this.snackBar.open("Inventario Actualizado", "", {
          duration: 2000,
          panelClass: ["bg-success", "text-white"]
        });

      } else if (result && result.error) {

        this.snackBar.open(result.error, "", {
          duration: 3000,
          panelClass: ["bg-danger", "text-white"]
        });

      }

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

        this.insumoSrv.delInsumo(material.id_insumo)
          .subscribe((res: any) => {

            if (res.count === 1) {

              let i = this.materiales.indexOf(material);
              this.materiales.splice(i, 1);

              let j = this.materiales_filtrados.indexOf(material);
              this.materiales_filtrados.splice(j, 1);


              this.snackBar.open("Material Eliminado", "", {
                duration: 2000,
                panelClass: ["bg-success", "text-white"]
              });

            } else {
              this.snackBar.open("Ha ocurrido un error", "", {
                duration: 3000,
                panelClass: ["bg-danger", "text-white"]
              });
            }

          }, (error) => {

            this.snackBar.open("Ha ocurrido un error de conexión. Inténtelo más tarde", "", {
              duration: 3000,
              panelClass: ["bg-danger", "text-white"]
            });

          });
      }
    });

  }

  nuevoMaterial() {
    let dialogRef = this.dialog.open(NuevoMaterialDialogoComponent, {
      data: {
        materiales: this.materiales,
        materiales_filtrados: this.materiales_filtrados,
        obra: this.obra_selected
      },
      width: '500px'
    });
    dialogRef.afterClosed().subscribe(result => {

      if (result === true) {

        this.ordenar({ active: null, direction: "" });

        this.snackBar.open("Inventario Actualizado", "", {
          duration: 2000,
          panelClass: ["bg-success", "text-white"]
        });

      } else if (result && result.error) {

        this.snackBar.open(result.error, "", {
          duration: 3000,
          panelClass: ["bg-danger", "text-white"]
        });

      }
    });
  }


  cargarObra(id_obra) {

    if (id_obra) {
      this.router.navigate([".", { obra: id_obra }]);
    } else {
      this.router.navigate([".", {}]);

    }

  }

  filtrar(event) {

    this.materiales_filtrados = this.materiales.filter(material => {
      return material.insumo.toLowerCase().includes(event.srcElement.value.toLowerCase());
    });

  }

  ordenar(sort: Sort) {
    const data = this.materiales.slice();
    if (!sort.active || sort.direction == '') {
      this.materiales_filtrados = data;
      return;
    }

    this.materiales_filtrados = data.sort((a, b) => {
      let isAsc = sort.direction == 'asc';
      switch (sort.active) {
        case 'codigo': return compare(a.codigo, b.codigo, isAsc);
        case 'insumo': return compare(a.insumo, b.insumo, isAsc);
        default: return 0;
      }
    });
  }

}

function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

import { switchMap } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { MatDialog, MatSnackBar, Sort } from '@angular/material';
import { InsumoService } from 'app/services/insumo.service';
import { of } from "rxjs";
import { Rol } from "../../../constantes/roles";
import { AuthService } from '../../../services/auth.service';
import { EditarInsumoCatalogoDialogoComponent } from '../editar-insumo-catalogo-dialogo/editar-insumo-catalogo-dialogo.component';
import { NuevoInsumoCatalogoDialogoComponent } from '../nuevo-insumo-catalogo-dialogo/nuevo-insumo-catalogo-dialogo.component';

@Component({
  selector: 'app-catalogo-insumo',
  templateUrl: './catalogo-insumo.component.html',
  styleUrls: ['./catalogo-insumo.component.scss']
})
export class CatalogoInsumoComponent implements OnInit {
  obras: any[] = [];
  familias: any[] = [];
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
      .subscribe((data: { obras: any[], usuario: any, familias: any[] }) => {
        //console.log("resultado resolve ", data);
        this.obras = data.obras;
        this.familias = data.familias
        //this.usuario = data.usuario;
      });

    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        if (params.has("obra")) {
          this.obra_selected = params.get("obra");
          return this.insumoSrv.getInsumosObra(params.get("obra"));
        } else {
          return of([]);
        }
      })).subscribe(materiales => {
        //console.log("prototipos", prototipos);
        this.materiales = materiales;
        this.materiales_filtrados = this.materiales.slice();
      });
  }

  nuevoInsumo() {
    let dialogRef = this.dialog.open(NuevoInsumoCatalogoDialogoComponent, {
      data: {
        materiales: this.materiales,
        materiales_filtrados: this.materiales_filtrados,
        obra: this.obra_selected,
        familias: this.familias
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

  editarInsumo(material) {
    let dialogRef = this.dialog.open(EditarInsumoCatalogoDialogoComponent, {
      data: {
        material: material,
        materiales: this.materiales,
        materiales_filtrados: this.materiales_filtrados,
        familias: this.familias
      },
      width: '500px'
    });
    dialogRef.afterClosed().subscribe(result => {

      if (result === true) {

        this.snackBar.open("Insumo Actualizado", "", {
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

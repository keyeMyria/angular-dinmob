
import { forkJoin as observableForkJoin, of, Observable } from 'rxjs';

import { switchMap } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { EditarEntradaDialogoComponent } from 'app/components/almacen/editar-entrada-dialogo/editar-entrada-dialogo.component';
import { MatDialog, MatSnackBar, PageEvent } from '@angular/material';
import { EntradasService } from 'app/services/entradas.service';
import { ConfirmarBorradoDialogoComponent } from 'app/components/admin/confirmar-borrado-dialogo/confirmar-borrado-dialogo.component';
import { VerEntradaDialogoComponent } from '../ver-entrada-dialogo/ver-entrada-dialogo.component';
import { Rol } from "../../../constantes/roles";
import { AuthService } from '../../../services/auth.service';
import { ReporteService } from '../../../services/reporte.service';
import * as FileSaver from "file-saver";

@Component({
  selector: 'app-entradas',
  templateUrl: './entradas.component.html',
  styleUrls: ['./entradas.component.scss']
})
export class EntradasComponent implements OnInit {
  obras: any = [];
  obra_selected: string = "";
  entradas: any = [];
  Rol = Rol;
  usuario: any;

  // MatPaginator Inputs
  length: number; // = 100;
  pageSize = 10;
  pageSizeOptions = [5, 10, 25, 100];

  // MatPaginator Output
  //pageEvent: PageEvent;


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private entradaSrv: EntradasService,
    public snackBar: MatSnackBar,
    private entradasSrv: EntradasService,
    private authSrv: AuthService,
    private reporteSrv: ReporteService
  ) { }

  ngOnInit() {

    this.usuario = this.authSrv.usuario

    this.route.data
      .subscribe((data: { obras: any[], usuario: any }) => {
        this.obras = data.obras;
        //this.usuario = data.usuario
      });

    /*     this.route.paramMap
          .switchMap((params: ParamMap) => {
            if (params.has("obra")) {
              this.obra_selected = params.get("obra");
              return this.entradaSrv.getEntradasObra(params.get("obra"));
            } else {
              return of([]);
            }
          }).subscribe(entradas => {
            this.entradas = entradas;
    
          }); */

    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        if (params.has("obra")) {
          this.obra_selected = params.get("obra");
          return observableForkJoin(
            this.entradaSrv.getCountEntradasObra(params.get("obra")),
            this.entradaSrv.getPageEntradasObra(params.get("obra"), this.pageSize, 0)
          );
        } else {
          return of([0, []]);
        }
      })).subscribe((res: any) => {
        this.length = res[0].count;
        this.entradas = res[1];

      });
  }

  nuevaEntrada() {
    //console.log("obra seleccionada", this.obra_selected);
    this.router.navigate(["/nueva-entrada", { obra: this.obra_selected }]);
  }

  editarEntrada(entrada) {
    this.router.navigate(["/editar-entrada", entrada.id_entrada]);
  }

  verEntrada(entrada) {

    this.entradasSrv.getEntrada(entrada.id_entrada)
      .subscribe((res: any) => {
        //console.log("salida OK", res);
        let dialogRef = this.dialog.open(VerEntradaDialogoComponent, {
          data: {
            datos: res.datos,
            insumos: res.insumos
          },
          width: '800px'
        });
        dialogRef.afterClosed().subscribe(result => {

          if (result === true) {

          } else if (result && result.error) {
          }

        });
      });


  }

  delEntrada(entrada) {
    let dialogRef = this.dialog.open(ConfirmarBorradoDialogoComponent, {
      data: {
        title: "Eliminar Entrada",
        content: `¿Desea eliminar la entrada: ${entrada.folio}?`
      },
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {

        this.entradaSrv.delEntrada(entrada.id_entrada)
          .subscribe((res: any) => {
            if (res.count == 1) {


              let i = this.entradas.indexOf(entrada);
              this.entradas.splice(i, 1);

              this.snackBar.open("Entrada Eliminada", "", {
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


  cargarObra(id_obra) {

    if (id_obra) {
      this.router.navigate([".", { obra: id_obra }]);
    } else {
      this.router.navigate([".", {}]);

    }

  }

  onPageChange(event: PageEvent) {
    console.log("pageChange", event);

    this.entradaSrv.getPageEntradasObra(this.obra_selected, event.pageSize, event.pageIndex)
      .subscribe(entradas => {
        this.entradas = entradas;

      });

  }

  getReporteEntrada(entrada) {
    this.reporteSrv.getReporteEntradaAlmacen(entrada.id_entrada)
      .subscribe(data => this.downloadFile(data, `ReporteEntrda_${entrada.fecha}`));


  }

  downloadFile(data, filename) {
    let contentType = "application/pdf";
    let blob = new Blob([data], { type: contentType });
    FileSaver.saveAs(blob, filename);
  }




}

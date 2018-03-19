import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { EditarEntradaDialogoComponent } from 'app/components/almacen/editar-entrada-dialogo/editar-entrada-dialogo.component';
import { MatDialog, MatSnackBar, PageEvent } from '@angular/material';
import { EntradasService } from 'app/services/entradas.service';
import { of } from "rxjs/observable/of";
import { ConfirmarBorradoDialogoComponent } from 'app/components/admin/confirmar-borrado-dialogo/confirmar-borrado-dialogo.component';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-entradas',
  templateUrl: './entradas.component.html',
  styleUrls: ['./entradas.component.scss']
})
export class EntradasComponent implements OnInit {
  obras: any = [];
  obra_selected: string = "";
  entradas: any[] = [];

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
    public snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.route.data
      .subscribe((data: { obras: any[] }) => {
        this.obras = data.obras;
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

    this.route.paramMap
      .switchMap((params: ParamMap) => {
        if (params.has("obra")) {
          this.obra_selected = params.get("obra");
          return Observable.forkJoin(
            this.entradaSrv.getCountEntradasObra(params.get("obra")),
            this.entradaSrv.getPageEntradasObra(params.get("obra"), this.pageSize, 0)
          );
        } else {
          return of([0, []]);
        }
      }).subscribe(res => {
        this.length = res[0].count;
        this.entradas = res[1];

      });
  }

  nuevaEntrada() {
    this.router.navigate(["/nueva-entrada"]);
  }

  editarEntrada(entrada) {
    this.router.navigate(["/editar-entrada", entrada.id_entrada]);
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
        this.snackBar.open("Entrada Eliminada", "", {
          duration: 2000,
          panelClass: ["bg-success", "text-white"]
        });

      } else if (result && result.error) {
        this.snackBar.open("La operación no ha podido ser completada. Inténtelo más tarde", "", {
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

  onPageChange(event: PageEvent) {
    console.log("pageChange", event);

    this.entradaSrv.getPageEntradasObra(this.obra_selected, event.pageSize, event.pageIndex)
      .subscribe(entradas => {
        this.entradas = entradas;

      });

  }



}

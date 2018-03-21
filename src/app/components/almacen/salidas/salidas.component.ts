import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { VerSalidaDialogoComponent } from 'app/components/almacen/ver-salida-dialogo/ver-salida-dialogo.component';
import { MatDialog, MatSnackBar, PageEvent } from '@angular/material';
import { SalidasService } from 'app/services/salidas.service';
import { of } from "rxjs/observable/of";
import { ConfirmarBorradoDialogoComponent } from 'app/components/admin/confirmar-borrado-dialogo/confirmar-borrado-dialogo.component';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-salidas',
  templateUrl: './salidas.component.html',
  styleUrls: ['./salidas.component.scss']
})
export class SalidasComponent implements OnInit {
  obras: any = [];
  obra_selected: string = "";
  salidas: any[] = [];

  // MatPaginator Inputs
  length: number; // = 100;
  pageSize = 10;
  pageSizeOptions = [5, 10, 25, 100];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private salidaSrv: SalidasService,
    public snackBar: MatSnackBar,
    private salidasSrv: SalidasService,
  ) { }

  ngOnInit() {

    this.route.data
      .subscribe((data: { obras: any[] }) => {
        this.obras = data.obras;
      });

   /*  this.route.paramMap
      .switchMap((params: ParamMap) => {
        if (params.has("obra")) {
          this.obra_selected = params.get("obra");
          return this.salidaSrv.getSalidasObra(params.get("obra"));
        } else {
          return of([]);
        }
      }).subscribe(salidas => {
        this.salidas = salidas;

      }); */
      this.route.paramMap
      .switchMap((params: ParamMap) => {
        if (params.has("obra")) {
          this.obra_selected = params.get("obra");
          return Observable.forkJoin(
            this.salidaSrv.getCountSalidasObra(params.get("obra")),
            this.salidaSrv.getPageSalidasObra(params.get("obra"), this.pageSize, 0)
          );
        } else {
          return of([0, []]);
        }
      }).subscribe(res => {
        this.length = res[0].count;
        this.salidas = res[1];

      });

  }

  nuevaSalida() {
    this.router.navigate(["/nueva-salida", { obra: this.obra_selected }]);
  }

  verSalida(salida) {

    this.salidasSrv.getSalida(salida.id_salida)
      .subscribe(res => {
        //console.log("salida OK", res);
        let dialogRef = this.dialog.open(VerSalidaDialogoComponent, {
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

  delSalida(salida) {
    let dialogRef = this.dialog.open(ConfirmarBorradoDialogoComponent, {
      data: {
        title: "Eliminar Salida",
        content: `¿Desea eliminar la salida del: ${salida.fecha}?`
      },
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result === true) {

        this.snackBar.open("Obra Creada", "", {
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

    this.salidaSrv.getPageSalidasObra(this.obra_selected, event.pageSize, event.pageIndex)
      .subscribe(salidas => {
        this.salidas = salidas;

      });

  }

}

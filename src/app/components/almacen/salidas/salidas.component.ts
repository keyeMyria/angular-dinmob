import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { VerSalidaDialogoComponent } from 'app/components/almacen/ver-salida-dialogo/ver-salida-dialogo.component';
import { MatDialog, MatSnackBar, PageEvent } from '@angular/material';
import { SalidasService } from 'app/services/salidas.service';
import { of } from "rxjs/observable/of";
import { ConfirmarBorradoDialogoComponent } from 'app/components/admin/confirmar-borrado-dialogo/confirmar-borrado-dialogo.component';
import { Observable } from 'rxjs/Observable';
import { Rol } from "../../../constantes/roles";
import { AuthService } from '../../../services/auth.service';
import { ReporteService } from '../../../services/reporte.service';
import * as FileSaver from "file-saver";

@Component({
  selector: 'app-salidas',
  templateUrl: './salidas.component.html',
  styleUrls: ['./salidas.component.scss']
})
export class SalidasComponent implements OnInit {
  obras: any = [];
  obra_selected: string = "";
  salidas: any[] = [];
  filtro_selected: string = "T";
  salidas_filtradas: any[] = [];
  Rol = Rol;
  usuario: any;

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
    private authSrv: AuthService,
    private reporteSrv: ReporteService
  ) { }

  ngOnInit() {

    this.usuario = this.authSrv.usuario;

    this.route.data
      .subscribe((data: { obras: any[], usuario: any }) => {
        this.obras = data.obras;
        //this.usuario = data.usuario;
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
            this.salidaSrv.getCountSalidasObra(params.get("obra"), this.filtro_selected),
            this.salidaSrv.getPageSalidasObra(params.get("obra"), this.pageSize, 0, this.filtro_selected)
          );
        } else {
          return of([0, []]);
        }
      }).subscribe(res => {
        this.length = res[0].count;
        this.salidas = res[1];
        this.salidas_filtradas = this.salidas.slice();

      });

  }

  setValidacion(salida) {

    let aceptada = 0;
    if (salida.aceptada == "0") {
      aceptada = 1;
    }

    this.salidaSrv.updateValidacion(salida.id_salida, aceptada)
      .subscribe(aceptada => {
        salida.aceptada = aceptada;
        this.snackBar.open("Salida Actualizada", "", {
          duration: 2000,
          panelClass: ["bg-success", "text-white"]
        });

      }, (error) => {
        this.snackBar.open("Ha ocurrido un error de conexión. Inténtelo más tarde", "", {
          duration: 3000,
          panelClass: ["bg-danger", "text-white"]
        });
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

    this.salidaSrv.getPageSalidasObra(this.obra_selected, event.pageSize, event.pageIndex, this.filtro_selected)
      .subscribe(salidas => {
        this.salidas = salidas;
        this.salidas_filtradas = this.salidas.slice();
      });

  }

  filtro($event) {
    console.log("change", $event.value);

    return Observable.forkJoin(
      this.salidaSrv.getCountSalidasObra(this.obra_selected, this.filtro_selected),
      this.salidaSrv.getPageSalidasObra(this.obra_selected, this.pageSize, 0, this.filtro_selected)
    ).subscribe(res => {
      this.length = res[0].count;
      this.salidas = res[1];
      this.salidas_filtradas = this.salidas.slice();
    });

    /* if ($event.value != "T") {
      this.salidas_filtradas = this.salidas.filter(salida => salida.id_tipo_salida == $event.value);
    } else {
      this.salidas_filtradas = this.salidas.slice();
    } */
  }

  getReporteSalida(salida) {
    this.reporteSrv.getReporteSalidaAlmacen(salida.id_salida)
      .subscribe(data => this.downloadFile(data, `ReporteSalida_${salida.num_vale}`));
     

  }

  downloadFile(data, filename) {
    let contentType = "application/pdf";
    let blob = new Blob([data], { type: contentType });
    FileSaver.saveAs(blob, filename);
  }

}

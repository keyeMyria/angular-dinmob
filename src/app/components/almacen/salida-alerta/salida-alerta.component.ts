import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AceptarSalidaAlertaDialogoComponent } from '../aceptar-salida-alerta-dialogo/aceptar-salida-alerta-dialogo.component';
import { MatDialog, PageEvent, MatSnackBar } from '@angular/material';
import { ConfirmarBorradoDialogoComponent } from 'app/components/admin/confirmar-borrado-dialogo/confirmar-borrado-dialogo.component';
import { Rol } from "../../../constantes/roles";
import { AuthService } from '../../../services/auth.service';
import { SalidasService } from 'app/services/salidas.service';
import { switchMap } from 'rxjs/operators';
import { forkJoin as observableForkJoin, of, Observable } from 'rxjs';
import { VerSalidaDialogoComponent } from '../ver-salida-dialogo/ver-salida-dialogo.component';
import { ReporteService } from 'app/services/reporte.service';
import * as FileSaver from "file-saver";

@Component({
  selector: 'app-salida-alerta',
  templateUrl: './salida-alerta.component.html',
  styleUrls: ['./salida-alerta.component.scss']
})
export class SalidaAlertaComponent implements OnInit {
  obras: any = [];
  obra_selected: string = "";
  salidas: any = [];
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
    public snackBar: MatSnackBar,
    private salidaSrv: SalidasService,
    private authSrv: AuthService,
    private reporteSrv: ReporteService
  ) { }

  ngOnInit() {


    this.usuario = this.authSrv.usuario;

    this.route.data
      .subscribe((data: { obras: any[], usuario: any }) => {
        this.obras = data.obras;
      });

    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        if (params.has("obra")) {
          this.obra_selected = params.get("obra");
          return observableForkJoin(
            this.salidaSrv.getCountSalidasAlertaObra(params.get("obra")),
            this.salidaSrv.getPageSalidasAlertaObra(params.get("obra"), this.pageSize, 0)
          );
        } else {
          return of([0, []]);
        }
      })).subscribe((res: any) => {
        this.length = res[0].count;
        this.salidas = res[1];

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
    //console.log("pageChange", event);

    this.salidaSrv.getPageSalidasAlertaObra(this.obra_selected, event.pageSize, event.pageIndex)
      .subscribe(salidas => {
        this.salidas = salidas;
      });

  }

  setValidacion(salida) {
    let aceptada = 0;
    let motivo=null;
    if (salida.aceptada == "0") {
      aceptada = 1;

      let dialogRef = this.dialog.open(AceptarSalidaAlertaDialogoComponent, {
        data: {
          salida: salida
        },
        width: '500px'
      });


      dialogRef.afterClosed().subscribe(motivo => {

        if (motivo) {

          this.salidaSrv.updateValidacion(salida.id_salida, aceptada, motivo)
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
      });

    } else {

      this.salidaSrv.updateValidacion(salida.id_salida, aceptada, motivo)
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

    });

  }

  verSalida(salida) {

    this.salidaSrv.getSalida(salida.id_salida)
      .subscribe((res: any) => {
        //console.log("salida OK", res);
        let dialogRef = this.dialog.open(VerSalidaDialogoComponent, {
          data: {
            datos: res.datos,
            insumos: res.insumos
          },
          width: '800px'
        });

      });


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

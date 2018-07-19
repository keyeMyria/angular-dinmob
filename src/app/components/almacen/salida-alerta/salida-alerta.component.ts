import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AceptarSalidaAlertaDialogoComponent } from '../aceptar-salida-alerta-dialogo/aceptar-salida-alerta-dialogo.component';
import { MatDialog, PageEvent } from '@angular/material';
import { ConfirmarBorradoDialogoComponent } from 'app/components/admin/confirmar-borrado-dialogo/confirmar-borrado-dialogo.component';
import { Rol } from "../../../constantes/roles";
import { AuthService } from '../../../services/auth.service';
import { SalidasService } from 'app/services/salidas.service';
import { switchMap } from 'rxjs/operators';
import { forkJoin as observableForkJoin, of, Observable } from 'rxjs';

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
    private salidaSrv: SalidasService,
    private authSrv: AuthService,
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

  setValidacionAceptada(salida) {
    let dialogRef = this.dialog.open(AceptarSalidaAlertaDialogoComponent, {
      data: {
        salida: salida
      },
      width: '500px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
      }
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

    });

  }

}

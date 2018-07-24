import { of as observableOf, Observable } from 'rxjs';
import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { AgregarComentarioPosventaDialogoComponent } from '../agregar-comentario-posventa-dialogo/agregar-comentario-posventa-dialogo.component';
import { MatDialog, MatSnackBar, MatDrawer } from '../../../../../node_modules/@angular/material';
import { EditarComentarioPosventaDialogoComponent } from '../editar-comentario-posventa-dialogo/editar-comentario-posventa-dialogo.component';
import { ConfirmarBorradoDialogoComponent } from '../../../components/admin/confirmar-borrado-dialogo/confirmar-borrado-dialogo.component';
import { Router, ActivatedRoute, ParamMap } from '../../../../../node_modules/@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import { LotesService } from 'app/services/lotes.service';
import { MediaMatcher } from '@angular/cdk/layout';
import { switchMap } from 'rxjs/operators';
import { ObrasService } from 'app/services/obras.service';
import { AuthService } from 'app/services/auth.service';
import { AgregarFotoLotePosventaDialogoComponent } from '../agregar-foto-lote-posventa-dialogo/agregar-foto-lote-posventa-dialogo.component';

@Component({
  selector: 'app-comentarios-posventas',
  templateUrl: './comentarios-posventas.component.html',
  styleUrls: ['./comentarios-posventas.component.scss']
})
export class ComentariosPosventasComponent implements OnInit {
  num_partidas_finalizadas: any;
  num_partidas: any;
  @ViewChild(MatDrawer) drawer: MatDrawer;

  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  selection: SelectionModel<any>;
  trackByIdPartida = (index, item) => item.id_partida;

  obra: any = { manzanas: [], obra: {} };
  obra_selected: string = "";
  obras: any = [];
  lote: any;
  acordeon: any;
  usuario: any;

  vendedor =
    {
      nombre: "Pedro Paramo"
    }


  comentarios = [
    {
      comentario: "Entregar cotizaciones de la obra Tres Marias con el Ing. Pedro Almodovar y llamarme cuando este se entreguen para darte las siguientes cotizaciones",
      fecha: "24 jul. 2018"
    },
    {
      comentario: "Entregar cotizaciones de la obra Tres Marias",
      fecha: "24 jul. 2018"
    },
    {
      comentario: "Entregar cotizaciones de la obra Tres Marias con el Ing. Pedro Almodovar y llamarme cuando este se entregue para darte las siguientes cotizaciones. Subir al sistema los prototipos de la nueva obra y agregar los nuevos créditos. Relizar los pagos pendientes. Todo se tiene que realizar el dia de hoy o hasta mañana hasta las 12 de dia.",
      fecha: "25 jul. 2018"
    }
  ]

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private loteSrv: LotesService,
    private media: MediaMatcher,
    private obraSrv: ObrasService,
    private authSrv: AuthService,
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

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
          return this.obraSrv.getAcordeonManzanas(params.get("obra"));
        } else {
          return observableOf({ datos: {} });
        }
      })).subscribe(obra => {
        this.obra = obra;
      });
  }

  cargarObra(id_obra: string) {

    if (id_obra) {
      this.router.navigate(["/escrituracion/comentarios-posventa", { obra: id_obra }]);
    } else {
      this.router.navigate(["/escrituracion/comentarios-posventa", {}]);
    }

  }


  getAvancesLote(lote) {
    //console.log("getAvancesLote", lote);

    if (this.mobileQuery.matches) {
      this.drawer.close();
    }

    this.loteSrv.getAvances(lote.id_lote)
      .subscribe((response: any) => {
        this.lote = response.lote;
        this.acordeon = response.acordeon;
        this.num_partidas = +response.num_partidas;
        this.num_partidas_finalizadas = +response.num_partidas_finalizadas;
        this.selection = new SelectionModel<any>(true, []);

        //this.changeDetectorRef.markForCheck();

      });
  }

  agregarComentario() {
    let dialogRef = this.dialog.open(AgregarComentarioPosventaDialogoComponent, {
      data: {
      },
      width: "600px"
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.snackBar.open("Comentario Agregado", "", {
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

  editarComentario(c) {
    let dialogRef = this.dialog.open(EditarComentarioPosventaDialogoComponent, {
      data: {
        c: c
      },
      width: "600px"
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.snackBar.open("Comentario Actualizado", "", {
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

  delComentario(c) {
    let dialogRef = this.dialog.open(ConfirmarBorradoDialogoComponent, {
      data: {
        title: "Eliminar Comentario",
        content: `¿Desea eliminar el comentario del ${c.fecha}?`
      },
      width: "600px"
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.snackBar.open("Comentario Actualizado", "", {
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

  addFoto() {


    //dentro del dialogo se incrementa el numero de fotos
    let dialogRef = this.dialog.open(AgregarFotoLotePosventaDialogoComponent, {
      width: '500px',
      data: {

      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {

        this.snackBar.open("Foto Agregada", "", {
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

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);

  }

}

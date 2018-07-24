import { of as observableOf, Observable } from 'rxjs';
import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatDialog, MatSnackBar, MatDrawer } from '../../../../../node_modules/@angular/material';
import { Router, ActivatedRoute, ParamMap } from '../../../../../node_modules/@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import { LotesService } from 'app/services/lotes.service';
import { MediaMatcher } from '@angular/cdk/layout';
import { switchMap } from 'rxjs/operators';
import { ObrasService } from 'app/services/obras.service';
import { AuthService } from 'app/services/auth.service';


@Component({
  selector: 'app-encuesta-satisfaccion',
  templateUrl: './encuesta-satisfaccion.component.html',
  styleUrls: ['./encuesta-satisfaccion.component.scss']
})
export class EncuestaSatisfaccionComponent implements OnInit {
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

  encuestas = [
    {
      pregunta: "¿Te gustó el servicio que se te brindó?"
    },
    {
      pregunta: "¿El vendedor que lo atendió le dio un buen servicio?"
    },
    {
      pregunta: "¿Cómo calificaría el recorrido del inmueble?"
    },
    {
      pregunta: "¿Cómo calificaría el proceso de entrega del inmueble?"
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
      this.router.navigate(["/escrituracion/encuesta-satisfaccion", { obra: id_obra }]);
    } else {
      this.router.navigate(["/escrituracion/encuesta-satisfaccion", {}]);
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

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

}

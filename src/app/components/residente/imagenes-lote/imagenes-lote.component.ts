import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatDrawer } from '@angular/material';
import { MediaMatcher } from '@angular/cdk/layout';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { ObrasService } from 'app/services/obras.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-imagenes-lote',
  templateUrl: './imagenes-lote.component.html',
  styleUrls: ['./imagenes-lote.component.scss']
})
export class ImagenesLoteComponent implements OnInit {

  @ViewChild(MatDrawer) drawer: MatDrawer;


  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  obras: any = [];
  obra_selected: string = "";
  obra: any;

  constructor(
    private media: MediaMatcher,
    private changeDetectorRef: ChangeDetectorRef,
    private route: ActivatedRoute,
    private router: Router,
    private obraSrv: ObrasService,
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit() {
    this.route.data
      .subscribe((data: { obras: any[] }) => {
        this.obras = data.obras;
      });
    this.route.paramMap
      .switchMap((params: ParamMap) => {
        if (params.has("obra")) {
          this.obra_selected = params.get("obra");
          return this.obraSrv.getAcordeonManzanas(params.get("obra"));
        } else {
          return Observable.of({ datos: {} });
        }
      }).subscribe(obra => {
        console.log("obra", obra);
        this.obra = obra;
      });
  }

  cargarObra(id_obra) {

    if (id_obra) {
      this.router.navigate([".", { obra: id_obra }]);
    } else {
      this.router.navigate([".", {}]);

    }

  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener)

  }

}

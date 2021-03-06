
import {of as observableOf,  Observable } from 'rxjs';

import {switchMap} from 'rxjs/operators';
import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatDrawer, MatDialog, MatSnackBar } from '@angular/material';
import { MediaMatcher } from '@angular/cdk/layout';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { ObrasService } from 'app/services/obras.service';
import { LotesService } from '../../../services/lotes.service';
import { ConfirmarBorradoDialogoComponent } from 'app/components/admin/confirmar-borrado-dialogo/confirmar-borrado-dialogo.component';
import { Rol } from "../../../constantes/roles";
import { AuthService } from '../../../services/auth.service';

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
  lote: any;
  fotos: any = [];
  Rol = Rol;
  usuario: any;

  constructor(
    private media: MediaMatcher,
    private changeDetectorRef: ChangeDetectorRef,
    private route: ActivatedRoute,
    private router: Router,
    private obraSrv: ObrasService,
    private loteSrv: LotesService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private authSrv: AuthService
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
        //this.usuario = data.usuario;
      });
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        if (params.has("obra")) {
          this.obra_selected = params.get("obra");
          return this.obraSrv.getAcordeonManzanasNumFotos(params.get("obra"));
        } else {
          return observableOf({ datos: {} });
        }
      })).subscribe(obra => {
        //console.log("obra", obra);
        this.obra = obra;
      });
  }

  getImagenesLote(lote) {


    if (this.mobileQuery.matches) {
      this.drawer.close();
    }

    //console.log("lote", lote);
    this.lote = lote;

    this.loteSrv.getFotosAvances(lote.id_lote)
      .subscribe(fotos => {
        this.fotos = fotos;
      }, (error) => {

      });

  }

  girarFoto(imagen, grados) {
    this.loteSrv.girarFoto(imagen.id_imagen, grados)
      .subscribe((res: any) => {
        imagen.url = res.url;
      }, (error) => {

      });

  }

  delFoto(foto) {

    let dialogRef = this.dialog.open(ConfirmarBorradoDialogoComponent, {
      data: {
        title: "Eliminar imagen",
        content: `¿Desea eliminar la imagen de: ${foto.partida_padre} ${foto.partida} del ${foto.fecha}?`
      },
      width: "500px"
    });


    dialogRef.afterClosed().subscribe(result => {

      if (result === true) {


        this.loteSrv.delFoto(foto.id_imagen)
          .subscribe((res: any) => {
            if (res.count == 1) {
              let i = this.fotos.indexOf(foto);
              this.fotos.splice(i, 1);
              this.lote.num_fotos -= 1;

              this.snackBar.open("Imagen Eliminada", "", {
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

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener)

  }

}

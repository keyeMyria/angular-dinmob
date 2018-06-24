
import {of as observableOf, forkJoin as observableForkJoin,  Observable } from 'rxjs';

import {switchMap} from 'rxjs/operators';
import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatDrawer, MatDialog, MatSnackBar } from '@angular/material';
import { MediaMatcher } from '@angular/cdk/layout';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ObrasService } from 'app/services/obras.service';
import { ConfirmarBorradoDialogoComponent } from "app/components/admin/confirmar-borrado-dialogo/confirmar-borrado-dialogo.component";
import { LotesService } from '../../../services/lotes.service';
import { SelectionModel } from '@angular/cdk/collections';
import { TrabajadorService } from '../../../services/trabajador.service';

@Component({
  selector: 'app-asignar-trabajadores',
  templateUrl: './asignar-trabajadores.component.html',
  styleUrls: ['./asignar-trabajadores.component.scss']
})
export class AsignarTrabajadoresComponent implements OnInit {

  @ViewChild(MatDrawer) drawer: MatDrawer;

  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  obras: any = [];
  obra_selected: string = "";
  obra: any;
  trabajador_selected: string = "";
  especialidades: any = [];
  trabajadores: any = [];
  lote: any = {};
  lotes_iguales: any = [];
  lote_origen: string = "";

  //selector de especialidades
  selection = new SelectionModel<any>(true);

  constructor(
    private media: MediaMatcher,
    private changeDetectorRef: ChangeDetectorRef,
    private route: ActivatedRoute,
    private router: Router,
    private obraSrv: ObrasService,
    private loteSrv: LotesService,
    private trabajadorSrv: TrabajadorService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
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
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        if (params.has("obra")) {
          this.obra_selected = params.get("obra");
          return observableForkJoin(
            this.obraSrv.getAcordeonManzanas(params.get("obra")),
            this.trabajadorSrv.getTrabajadoresObra(params.get("obra"))
          );
        } else {
          return observableOf([[], []]);
        }
      })).subscribe(res => {
        //console.log("obra", obra);
        this.obra = res[0];
        this.trabajadores = res[1];
        this.selection.clear();

      }, (error) => {
        //snackbar error
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

  delTrabajador() {

    let newpassword: string;

    let dialogRef = this.dialog.open(ConfirmarBorradoDialogoComponent, {
      data: {
        title: "Desea continuar",
        content: `¿Está seguro de borrar la asignacion del trabajador: ?`
      },
      width: "500px"
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result === true) {

        if (result === true) {

          this.snackBar.open("Trabajador Actualizado", "", {
            duration: 2000,
            panelClass: ["bg-success", "text-white"]
          });

        } else if (result.error) {

          this.snackBar.open(result.error, "", {
            duration: 3000,
            panelClass: ["bg-danger", "text-white"]
          });

        }


      }

    });

  }

  getEspecialidadesLote(lote) {

    //console.log("lote", lote);


    this.loteSrv.getEspecialidades(lote.id_lote)
      .subscribe(especialidades => {
        this.selection.clear();
        this.especialidades = especialidades;
        let obra = this.obras.find(obra => obra.id_obra == this.obra_selected);
        lote.obra = obra.nombre;
        this.lote = lote;

        //buscamos los lotes de los cuales podemos copiar sus asignaciones
        this.lotes_iguales = [];

        if (this.lote.prototipos.length) {
          let prototipo = this.lote.prototipos[0].id_prototipo;

          this.obra.manzanas.forEach(manzana => {

            manzana.lotes.forEach(lote => {

              if (lote.prototipos.length) {

                //agregamos el lote si tiene el mismo prototipo y no es ese mismo lote
                if (lote.prototipos[0].id_prototipo == prototipo && lote.id_lote != this.lote.id_lote) {
                  this.lotes_iguales.push(lote);
                }

              }
            });
          });
        }




      }, (error) => {
        //snackbar error
      });

  }

  seleccionarEspecialidad(e) {
    this.selection.toggle(e);
  }

  delEspecialidadLote(e) {
    console.log("delEspecialidadLote", e);
    this.loteSrv.delEspecialidadLote(e.id_familia, e.id_lote, e.id_trabajador)
      .subscribe(respuesta => {
        console.log(respuesta);
        e.trabajador = "";
        e.id_trabajador = "";
        e.especialidad_trabajador = "";
        this.snackBar.open("Asignación Actualizada", "", {
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

  asignarTrabajador() {
    let ids = [];
    this.selection.selected.forEach(familia => {
      ids.push(familia.id_familia);
    });
    //console.log("lote", this.lote);
    //console.log("trabajador", this.trabajador_selected);
    //console.log("seleccion", this.selection.selected);

    this.loteSrv.addEspecialidadLote(ids, this.lote.id_lote, this.trabajador_selected)
      .subscribe(respuesta => {

        let trabajador = this.trabajadores.find(t => t.id_trabajador == this.trabajador_selected);

        this.selection.selected.forEach(asignacion => {
          asignacion.trabajador = trabajador.nombre;
          asignacion.id_trabajador = trabajador.id_trabajador;
          asignacion.especialidad_trabajador = trabajador.especialidad;
          this.snackBar.open("Trabajador Asignado", "", {
            duration: 2000,
            panelClass: ["bg-success", "text-white"]
          });

          //cuando leemos inicialmente los datos, si no se ha realizado la asignacion entonces,
          // el id_lote es nulo
          if (!asignacion.id_lote) {
            asignacion.id_lote = this.lote.id_lote;
          }
        });
        this.selection.clear();
      }, (error) => {
        this.snackBar.open("Ha ocurrido un error de conexión. Inténtelo más tarde", "", {
          duration: 3000,
          panelClass: ["bg-danger", "text-white"]
        });
      });

  }

  copiarEspecialidades() {
    console.log("copiar especialidades");

    this.loteSrv.copiarEspecialidadesLote(this.lote_origen, this.lote.id_lote)
      .subscribe(especialidades => {
        this.selection.clear();
        this.especialidades = especialidades;
        this.snackBar.open("Asignaciones Copiadas", "", {
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

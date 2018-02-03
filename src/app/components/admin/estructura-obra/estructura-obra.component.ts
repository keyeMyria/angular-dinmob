import { Component, OnInit } from '@angular/core';
import { ObrasService } from "app/services/obras.service";
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import { EditarManzanaDialogoComponent } from 'app/components/admin/editar-manzana-dialogo/editar-manzana-dialogo.component';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ConfirmarBorradoDialogoComponent } from 'app/components/admin/confirmar-borrado-dialogo/confirmar-borrado-dialogo.component';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import "rxjs/add/observable/of";
import "rxjs/add/observable/forkJoin";
import { Observable } from 'rxjs/Observable';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AgregarManzanaDialogoComponent } from 'app/components/admin/agregar-manzana-dialogo/agregar-manzana-dialogo.component';
import { AgregarLoteDialogoComponent } from 'app/components/admin/agregar-lote-dialogo/agregar-lote-dialogo.component';
import { LotesService } from 'app/services/lotes.service';
import { ManzanasService } from 'app/services/manzanas.service';
import { EditarLoteDialogoComponent } from 'app/components/admin/editar-lote-dialogo/editar-lote-dialogo.component';


import { SelectionModel } from '@angular/cdk/collections';
import { log } from 'util';
import { PrototiposService } from 'app/services/prototipos.service';

@Component({
  selector: 'app-estructura-obra',
  templateUrl: './estructura-obra.component.html',
  styleUrls: ['./estructura-obra.component.scss']
})
export class EstructuraObraComponent implements OnInit {

  loading: boolean;

  numbermask = createNumberMask({
    allowDecimal: true,
    prefix: '',
    decimalLimit: 2
  });

 


  lotesMapping:
    { [k: string]: string } = { '=0': 'Ningún lote seleccionado', '=1': 'Un lote seleccionado', 'other': '# lotes seleccionados' };


  obras: any[] = [];
  prototipos: any[] = [];

  obra: any = {};

  obra_selected: string = "";


  opPrototipo = new FormControl("", Validators.required);
  opEnVenta = new FormControl("", Validators.required);
  opValorBase = new FormControl("", Validators.required);
  opValorAmpliacion = new FormControl("", Validators.required);



  manzana_selected: number = null;
  selection: SelectionModel<any>[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private obraSrv: ObrasService,
    private prototipoSrv: PrototiposService,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private loteSrv: LotesService,
    private manzanaSrv: ManzanasService,
    private snackBar: MatSnackBar
  ) { }


  /* obtenemos las obras del usurio del resolve y consultamos la obra requerida como routeParam */
  ngOnInit() {
    this.loading = true;
    this.route.data
      .subscribe((data: { obras: any[] }) => {
        //console.log("resusltado resolve ", data);
        this.obras = data.obras;
      });


    this.route.paramMap
      .switchMap((params: ParamMap) => {
        if (params.has("obra")) {
          this.obra_selected = params.get("obra");

          //unimos la consulta de las manzanas y los prototipos
          return Observable.forkJoin(
            this.obraSrv.getAcordeonManzanas(params.get("obra")),
            this.prototipoSrv.getPrototiposObra(params.get("obra"))
          );
        } else {
          return Observable.of([{ datos: {} }, []]);
        }
      }).subscribe(res => {
        //console.log("res", res);
        this.obra = res[0];
        this.prototipos = res[1];

        //inicializamos la seleccion de lotes
        this.manzana_selected = null;
        this.selection = [];
        for (let i = 0; i < this.obra.manzanas.length; i++) {
          this.selection.push(new SelectionModel<any>(true, []));
        }
        this.loading = false;


      });

  }

  /* actualizamos la ruta con el parametro obra  */
  cargarObra(id_obra) {
    //console.log("cargarobra");

    if (id_obra) {
      //si se eligio una obra del select entonces enviamos el id
      this.router.navigate([".", { obra: id_obra }]);

    } else {
      // eliminamos el parametro de navegacion
      this.router.navigate([".", {}]);
    }
  }



  /* asignamos la obra seleccionada como resultado del evento expansion-panel opened */
  selectManzana(index) {

    //console.log("opened", index);
    //seleccionamos la manzana expandida
    this.manzana_selected = index;

  }

  /* callback del evento expansion-panel closed, ninguna manzana seleccionada si cerramos todos los paneles */
  onClosedManzana(index) {

    //console.log("closed", index);

    //si cerramos la manzana expandida entonces no queda ninguna abierta
    if (this.manzana_selected === index) {
      this.manzana_selected = null;
    }

  }


  editarManzana(manzana) {
    let dialogRef = this.dialog.open(EditarManzanaDialogoComponent, {
      data: {
        manzana: manzana
      },
      width: '500px',

    });
    dialogRef.afterClosed().subscribe(result => {

    });
  }


  /* abrimos un dialogo para editar las propiedades del lote */
  editarLote(manzana, lote, event) {
    event.stopPropagation();


    let dialogRef = this.dialog.open(EditarLoteDialogoComponent, {
      data: {
        lotes: manzana.lotes,
        lote: lote,
        prototipos: this.prototipos

      },
      width: '500px',

    });
    dialogRef.afterClosed().subscribe(result => {

      if (result === true) {

        this.snackBar.open("Lote Actualizado", "Cerrar", {
          duration: 2000
        });

      } else if (result.error) {

        this.snackBar.open(result.error, "Cerrar", {
          duration: 2000
        });

      }

    });
  }

  /* abrimos el dialogo para crear los lotes por nombre o numero */
  addManzanas() {
    let dialogRef = this.dialog.open(AgregarManzanaDialogoComponent, {
      data: {
        obra: this.obra,
        selection: this.selection
      },
      width: "500px"
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result === true) {

        this.snackBar.open("Obra Actualizada", "Cerrar", {
          duration: 2000
        });

      } else {

        this.snackBar.open("Ha ocurrido un error de conexión. Inténtelo más tarde", "Cerrar", {
          duration: 3000
        });

      }

    });

  }

  /* mostramos el dialogo para agregar lotes a la manzana seleccionada */
  addLotes(manzana) {
    let dialogRef = this.dialog.open(AgregarLoteDialogoComponent, {
      data: {
        manzana: manzana
      },
      width: "500px"
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result === true) {

        this.snackBar.open("Obra Actualizada", "Cerrar", {
          duration: 2000
        });

      } else if (result === false) {

      } else {

        this.snackBar.open("Ha ocurrido un error de conexión. Inténtelo más tarde", "Cerrar", {
          duration: 3000
        });

      }

    });

  }

  delLote(manzana, lote, event) {

    event.stopPropagation();

    let dialogRef = this.dialog.open(ConfirmarBorradoDialogoComponent, {
      data: {
        title: "Eliminar Lote",
        content: `¿Desea eliminar: ${lote.nombre}?`
      },
      width: "500px"
    });

    dialogRef.afterClosed().subscribe(result => {

    });

  }


  delManzana(manzana) {
    let dialogRef = this.dialog.open(ConfirmarBorradoDialogoComponent, {
      data: {
        title: "Eliminar Manzana",
        content: `¿Desea eliminar: ${manzana.nombre}?`
      },
      width: "500px"
    });

    dialogRef.afterClosed().subscribe(result => {

    });

  }

  /* actualizamos la propiedad valor_base a los lotes seleccionados */
  updateValorBase() {

    let id_lotes = [];

    this.selection[this.manzana_selected].selected.forEach(lote => {
      id_lotes.push(lote.id_lote);
    });

    let valor = this.opValorBase.value.replace(/,/g, "");
    this.loteSrv.bulkUpdate(id_lotes, { valor_base: valor })
      .subscribe(res => {
        console.log("respuesta", res);


        if (res.count) {
          //todo ok

          //actualizamos la vista
          this.selection[this.manzana_selected].selected.forEach(lote => {
            lote.valor_base = valor;
          });

          //eliminamos la seleccion
          this.selection[this.manzana_selected].clear();

          this.snackBar.open("Actualización completada", "Cerrar", {
            duration: 2000
          });

        } else {
          //error

          this.snackBar.open("Su solicitud no se ha podido completar.", "Cerrar", {
            duration: 3000
          });

        }


      },
      (error) => {

        this.snackBar.open("Ha ocurrido un error de conexión. Inténtelo más tarde.", "Cerrar", {
          duration: 3000
        });

      });


  }

  /* actualizamos la propiedad valor_ampliacion a los lotes seleccionados */
  updateValorAmpliacion() {

    let id_lotes = [];

    this.selection[this.manzana_selected].selected.forEach(lote => {
      id_lotes.push(lote.id_lote);
    });

    let valor = this.opValorAmpliacion.value.replace(/,/g, "");
    this.loteSrv.bulkUpdate(id_lotes, { valor_ampliacion: valor })
      .subscribe(res => {
        console.log("respuesta", res);


        if (res.count) {
          //todo ok

          //actualizamos la vista
          this.selection[this.manzana_selected].selected.forEach(lote => {
            lote.valor_ampliacion = valor;
          });

          //eliminamos la seleccion
          this.selection[this.manzana_selected].clear();


          this.snackBar.open("Actualización completada", "Cerrar", {
            duration: 2000
          });

        } else {
          //error o count==0

          this.snackBar.open("Su solicitud no se ha podido completar.", "Cerrar", {
            duration: 3000
          });

        }


      },
      (error) => {

        this.snackBar.open("Ha ocurrido un error de conexión. Inténtelo más tarde.", "Cerrar", {
          duration: 3000
        });

      });


  }

  /* actualizamos la propiedad en_venta a los lotes seleccionados */
  updateEnVenta() {

    let id_lotes = [];

    this.selection[this.manzana_selected].selected.forEach(lote => {
      id_lotes.push(lote.id_lote);
    });


    this.loteSrv.bulkUpdate(id_lotes, { en_venta: this.opEnVenta.value })
      .subscribe(res => {
        console.log("respuesta", res);

        if (res.count) {
          //todo ok

          //actualizamos la vista
          this.selection[this.manzana_selected].selected.forEach(lote => {
            lote.en_venta = this.opEnVenta.value;
          });

          //eliminamos la seleccion
          this.selection[this.manzana_selected].clear();

          this.snackBar.open("Actualización completada", "Cerrar", {
            duration: 2000
          });

        } else {
          //error

          this.snackBar.open("Su solicitud no se ha podido completar.", "Cerrar", {
            duration: 3000
          });

        }


      },
      (error) => {

        this.snackBar.open("Ha ocurrido un error de conexión. Inténtelo más tarde.", "Cerrar", {
          duration: 3000
        });

      });


  }

  /* agregamos el prototipo a los lotes seleccionados */
  addLotePrototipo() {

    let id_lotes = [];

    this.selection[this.manzana_selected].selected.forEach(lote => {
      id_lotes.push(lote.id_lote);
    });


    let prototipo = {
      id_prototipo: this.opPrototipo.value.id_prototipo,
      nombre: this.opPrototipo.value.nombre
    };

    //console.log(prototipo);

    this.loteSrv.bulkAddLotePrototipo(id_lotes, prototipo.id_prototipo)
      .subscribe(res => {
        console.log("respuesta", res);


        //todo ok

        //actualizamos la vista
        this.selection[this.manzana_selected].selected.forEach(lote => {
          lote.prototipos = res.lotes[lote.id_lote].prototipos;
        });

        //eliminamos la seleccion
        this.selection[this.manzana_selected].clear();

        this.snackBar.open("Actualización completada", "Cerrar", {
          duration: 2000
        });


      },
      (error) => {

        this.snackBar.open("Ha ocurrido un error de conexión. Inténtelo más tarde.", "Cerrar", {
          duration: 3000
        });

      });


  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected(i) {
    const numSelected = this.selection[i].selected.length;
    const numRows = this.obra.manzanas[i].lotes.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle(i) {
    this.isAllSelected(i) ?
      this.selection[i].clear() :
      this.obra.manzanas[i].lotes.forEach(lote => this.selection[i].select(lote));
  }


}

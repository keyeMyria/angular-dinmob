import { Component, OnInit } from '@angular/core';
import { ObrasService } from "app/services/obras.service";
import { Usuario } from "app/model/usuario";
import { AuthService } from "app/services/auth.service";
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import { EditarManzanaDialogoComponent } from 'app/components/admin/editar-manzana-dialogo/editar-manzana-dialogo.component';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ConfirmarBorradoDialogoComponent } from 'app/components/admin/confirmar-borrado-dialogo/confirmar-borrado-dialogo.component';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import "rxjs/add/observable/of";
import { Observable } from 'rxjs/Observable';
import { NgForm, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AgregarManzanaDialogoComponent } from 'app/components/admin/agregar-manzana-dialogo/agregar-manzana-dialogo.component';
import { AgregarLoteDialogoComponent } from 'app/components/admin/agregar-lote-dialogo/agregar-lote-dialogo.component';
import { LotesService } from 'app/services/lotes.service';
import { ManzanasService } from 'app/services/manzanas.service';
import { EditarLoteDialogoComponent } from 'app/components/admin/editar-lote-dialogo/editar-lote-dialogo.component';


import { SelectionModel } from '@angular/cdk/collections';
import { log } from 'util';

@Component({
  selector: 'app-estructura-obra',
  templateUrl: './estructura-obra.component.html',
  styleUrls: ['./estructura-obra.component.scss']
})
export class EstructuraObraComponent implements OnInit {

  public maskDosDigitos = [/[1-9]/, /\d/];
  guide: boolean = false;

  lotesMapping:
    { [k: string]: string } = { '=0': 'Ningún lote seleccionado', '=1': 'Un lote seleccionado', 'other': '# lotes seleccionados' };


  obras: any = [];

  obra: any = {
    datos: {}
  };

  obra_selected: string = "";

  lotes_selected: any = {};


  opPrototipo = new FormControl("", Validators.required);
  opEnVenta = new FormControl("", Validators.required);
  opValorBase = new FormControl("", Validators.required);
  opValorAmpliacion = new FormControl("", Validators.required);



  manzana_selected: number = null;
  items: any[] = [];
  //selection = new SelectionModel<any>(true, []);
  selection: SelectionModel<any>[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private obraSrv: ObrasService,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private loteSrv: LotesService,
    private manzanaSrv: ManzanasService,
    public snackBar: MatSnackBar
  ) {
    // console.log("-------------constructor-----");


    for (let i = 0; i < 10; i++) {
      this.items.push({ id: i, valor: "valor " + i });
    }

  }



  ngOnInit() {

    this.route.data
      .subscribe((data: { obras: any[] }) => {
        //console.log("resusltado resolve ", data);
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
        //console.log("obra", obra);
        this.obra = obra;

        this.manzana_selected = null;
        this.selection = [];
        for (let i = 0; i < this.obra.manzanas.length; i++) {
          this.selection.push(new SelectionModel<any>(true, []));
        }


      });

  }

  cargarObra(id_obra) {
    console.log("cargarobra");

    if (id_obra) {
      //si se eligio una obra del select entonces enviamos el id
      this.router.navigate([".", { obra: id_obra }]);

    } else {
      // eliminamos el parametro de navegacion
      this.router.navigate([".", {}]);
    }
  }





  selectManzana(index) {

    //console.log("opened", index);
    //seleccionamos la manzana expandida
    this.manzana_selected = index;

  }

  onClosedManzana(index) {

    //console.log("closed", index);

    //si cerramos la manzana expandida entonces no queda ninguna abierta
    if (this.manzana_selected === index) {
      this.manzana_selected = null;
    }

  }


  editarManzana() {
    let dialogRef = this.dialog.open(EditarManzanaDialogoComponent, {
      data: {},
      width: '500px',

    });
    dialogRef.afterClosed().subscribe(result => {

    });
  }

  editarLote(manzana, lote, event) {
    event.stopPropagation();


    let dialogRef = this.dialog.open(EditarLoteDialogoComponent, {
      data: {
        lotes: manzana.lotes,
        lote: lote

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


  addManzanas() {
    let dialogRef = this.dialog.open(AgregarManzanaDialogoComponent, {
      data: {
        obra: this.obra.datos
      },
      width: "500px"
    });

    dialogRef.afterClosed().subscribe(result => {

    });

  }

  addLotes(manzana) {
    let dialogRef = this.dialog.open(AgregarLoteDialogoComponent, {
      data: {
        manzana: manzana
      },
      width: "500px"
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("dialogo cerrado");


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

  updateValorBase() {

    let id_lotes = [];

    this.selection[this.manzana_selected].selected.forEach(lote => {
      id_lotes.push(lote.id_lote);
    });


    this.loteSrv.bulkUpdate(id_lotes, { valor_base: this.opValorBase.value })
      .subscribe(res => {
        console.log("respuesta", res);


        if (res.count) {
          //todo ok

          //actualizamos la vista
          this.selection[this.manzana_selected].selected.forEach(lote => {
            lote.valor_base = this.opValorBase.value;
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

  updateValorAmpliacion() {

    let id_lotes = [];

    this.selection[this.manzana_selected].selected.forEach(lote => {
      id_lotes.push(lote.id_lote);
    });


    this.loteSrv.bulkUpdate(id_lotes, { valor_ampliacion: this.opValorAmpliacion.value })
      .subscribe(res => {
        console.log("respuesta", res);


        if (res.count) {
          //todo ok

          //actualizamos la vista
          this.selection[this.manzana_selected].selected.forEach(lote => {
            lote.valor_ampliacion = this.opValorAmpliacion.value;
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

  debugSelection() {
    //console.log(this.selection.selected);
    console.log("manzana selected", this.manzana_selected);
    this.manzana_selected === null ? console.log("ninguna manzana seleccionada") : console.log(this.selection[this.manzana_selected].selected);



  }



}

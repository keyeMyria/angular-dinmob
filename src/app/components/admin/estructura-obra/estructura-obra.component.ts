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


import {SelectionModel} from '@angular/cdk/collections';

@Component({
  selector: 'app-estructura-obra',
  templateUrl: './estructura-obra.component.html',
  styleUrls: ['./estructura-obra.component.scss']
})
export class EstructuraObraComponent implements OnInit {

  public maskDosDigitos = [/[1-9]/, /\d/];
  guide: boolean = false;


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


  items: any[] = [];
  selection = new SelectionModel<any>(true, []);

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



  debug(model) {
    console.log(model);

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
        this.obra = obra
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



  toggleSelectionLote(manzana, lote) {
    lote.selected = !lote.selected;

    this.lotes_selected[lote.id_lote] = lote.selected;

    /*   var allSelected = _.find(manzana.lotes, function (lote) {
        return !_.has(lote, 'selected') || lote.selected === false;
      });
  
      if (_.isUndefined(allSelected)) {
        manzana.selected = true;
      } else {
        manzana.selected = false;
      } */



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

    //let lotes = this.getLotesSelected();

    //console.log("lotes", lotes);

    console.log("lotes_selected", this.lotes_selected);



    /*    this.loteSrv.bulkUpdate(lotes,this.opValorBase)
       .subscribe(res=>{
         console.log("respuesta", res);
         
       }); */


  }

  private getLotesSelected() {

    let lotes = [];

    this.obra.manzanas.forEach(manzana => {

      manzana.lotes.forEach(lote => {
        if (lote.selected) {
          lotes.push(lote.id_lote);
        }
      });

    });

    return lotes;
  }


    /** Whether the number of selected elements matches the total number of rows. */
    isAllSelected() {
      const numSelected = this.selection.selected.length;
      const numRows = this.items.length;
      return numSelected === numRows;
    }
  
    /** Selects all rows if they are not all selected; otherwise clear selection. */
    masterToggle() {
      this.isAllSelected() ?
          this.selection.clear() :
          this.items.forEach(row => this.selection.select(row));
    }

    debugSelection(){
      console.log(this.selection.selected);
      
    }



}

import { Component, OnInit } from '@angular/core';
import { ObrasService } from "app/services/obras.service";
import { Usuario } from "app/model/usuario";
import { AuthService } from "app/services/auth.service";
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import { EditarManzanaDialogoComponent } from 'app/components/admin/editar-manzana-dialogo/editar-manzana-dialogo.component';
import { MatDialog } from '@angular/material';
import { ConfirmarBorradoDialogoComponent } from 'app/components/admin/confirmar-borrado-dialogo/confirmar-borrado-dialogo.component';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import "rxjs/add/observable/of";
import { Observable } from 'rxjs/Observable';
import { NgForm, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AgregarManzanaDialogoComponent } from 'app/components/admin/agregar-manzana-dialogo/agregar-manzana-dialogo.component';
import { AgregarLoteDialogoComponent } from 'app/components/admin/agregar-lote-dialogo/agregar-lote-dialogo.component';



@Component({
  selector: 'app-estructura-obra',
  templateUrl: './estructura-obra.component.html',
  styleUrls: ['./estructura-obra.component.scss']
})
export class EstructuraObraComponent implements OnInit {

  public maskDosDigitos = [/[1-9]/, /\d/];
  guide: boolean = false;

  selectedOption: string;
  usuario: Usuario;
  obras: any = [];
  obra: any = {
    datos: {}
  };
  obra_selected: string = "";
  residente: any = {};

  addManzanas: any = {
    tipo: "numero",
    nombre: "",
    ini: "",
    fin: "",
    prefijo: ""
  };
  nuevaManzana: any = {
    nombre: ""
  };

  addLoteOptions: any = {
    tipo: "numero",
    nombre: "",
    ini: "",
    fin: "",
    prefijo: ""
  };

  nuevoLote: any = {
    nombre: ""
  };



  manzanaSelected: any = {
    nombre: ""
  };


  opPrototipo = new FormControl("", Validators.required)
  opEnVenta = new FormControl("", Validators.required)
  opValorBase = new FormControl("", Validators.required)
  opValorAmpliacion = new FormControl("", Validators.required)

  formManzana: FormGroup;
  formLote: FormGroup;


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private obraSrv: ObrasService,
    private auth: AuthService,
    public dialog: MatDialog,
    private fb: FormBuilder
  ) {

    this.formManzana = this.fb.group({
      tipo: "numero",
      nombre: "",
      ini: "",
      fin: "",
      prefijo: ""
    });

    // { value: "", disabled: true }
    this.formLote = this.fb.group({
      tipo: "numero",
      nombre: ["", [Validators.required, Validators.maxLength(30)]],
      ini: ["", Validators.required],
      fin: ["", Validators.required],
      prefijo: ["", [Validators.required, Validators.maxLength(30)]]
    });

    this.formLote.controls["tipo"].valueChanges
      .subscribe((value) => {
        console.log("valueChanges", value);

        if (value == "nombre") {

          this.formLote.controls["ini"].disable();
          this.formLote.controls["fin"].disable();
          this.formLote.controls["prefijo"].disable();

          this.formLote.controls["nombre"].enable();




        } else {/* numero*/
          this.formLote.controls["ini"].enable();
          this.formLote.controls["fin"].enable();
          this.formLote.controls["prefijo"].enable();

          this.formLote.controls["nombre"].disable();
        }

      });

  }





  debug(model) {
    console.log(model);

  }

  ngOnInit() {
    this.usuario = this.auth.getUsuario();


    this.route.paramMap
      .switchMap((params: ParamMap) => {
        if (params.has("obra")) {
          this.obra_selected = params.get("obra");
          return this.obraSrv.loadFullObra(params.get("obra"));
        } else {
          return Observable.of({ datos: {} });
        }
      }).subscribe(obra => {
        console.log("obra", obra);
        this.obra = obra
      });


    this.obraSrv.getObrasUsuario(this.usuario.id_usuario)
      .subscribe(response => {
        this.obras = response;
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

    /*   var allSelected = _.find(manzana.lotes, function (lote) {
        return !_.has(lote, 'selected') || lote.selected === false;
      });
  
      if (_.isUndefined(allSelected)) {
        manzana.selected = true;
      } else {
        manzana.selected = false;
      } */



  }

  residentesRepetidos() {
    return true;
  }

  controlAlmacenRepetidos() {
    return true;
  }

  num_lotes_selected() {
    return 0;
  }

  onFechaChange() {

  }

  editarManzana() {
    let dialogRef = this.dialog.open(EditarManzanaDialogoComponent, {
      data: {},
      width: '500px',

    });
    dialogRef.afterClosed().subscribe(result => {
      this.selectedOption = result;
    });
  }

  DelManzana() {

    let dialogRef = this.dialog.open(ConfirmarBorradoDialogoComponent, {
      data: {
        title: "Eliminar Manzana",
        content: `¿Desea eliminar la Manzana?`
      },
      width: "500px"
    });

    dialogRef.afterClosed().subscribe(result => {

    });

  }

  createManzanas(form: NgForm) {
    console.log("Opciones", form.value);
  }

  addManzana() {
    let dialogRef = this.dialog.open(AgregarManzanaDialogoComponent, {
      data: {

      },
      width: "500px"
    });

    dialogRef.afterClosed().subscribe(result => {

    });

  }

  addLote() {
    let dialogRef = this.dialog.open(AgregarLoteDialogoComponent, {
      data: {

      },
      width: "500px"
    });

    dialogRef.afterClosed().subscribe(result => {

    });

  }




}

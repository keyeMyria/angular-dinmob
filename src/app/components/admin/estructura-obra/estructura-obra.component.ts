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
  addManzanaOptions: any = {
    by: ""
  };
  nuevaManzana: any = {
    nombre: ""
  };

  addLoteOptions: any = {
    by: ""
  };

  nuevoLote: any = {
    nombre: ""
  };

  op: any = {
    prototipo: ""
  };

  manzanaSelected: any = {
    nombre: ""
  };




  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private obraSrv: ObrasService,
    private auth: AuthService,
    public dialog: MatDialog
  ) { }



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

  createManzanas() {
    console.log("Opciones", this.addManzanaOptions);
  }



}

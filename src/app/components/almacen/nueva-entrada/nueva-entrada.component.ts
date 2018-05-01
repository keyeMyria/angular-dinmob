import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { InsumoService } from 'app/services/insumo.service';
import { of } from "rxjs/observable/of";
import { EntradasService } from '../../../services/entradas.service';
import { MatSnackBar, MatCheckbox, MatDialog } from '@angular/material';
import { NgForm } from '@angular/forms';
import { AlertaDialogoComponent } from '../../admin/alerta-dialogo/alerta-dialogo.component';

@Component({
  selector: 'app-nueva-entrada',
  templateUrl: './nueva-entrada.component.html',
  styleUrls: ['./nueva-entrada.component.scss']
})
export class NuevaEntradaComponent implements OnInit {
  @ViewChild("filtroEntrada") checkFiltro: MatCheckbox;
  // @ViewChild('formEntrada') form: NgForm;

  obras: any = [];
  proveedores: any = [];
  obra_selected: string = "";
  insumos: any[] = [];
  id_proveedor: string = "";
  folio: string = "";
  insumos_filtrados: any[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private insumoSrv: InsumoService,
    private entradaSrv: EntradasService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.route.data
      .subscribe((data: { obras: any[], proveedores: any }) => {
        this.obras = data.obras;
        this.proveedores = data.proveedores;
      });
    this.route.paramMap
      .switchMap((params: ParamMap) => {
        if (params.has("obra")) {
          this.obra_selected = params.get("obra");
          return this.insumoSrv.getMaterialesObra(params.get("obra"));
        } else {
          return of([]);
        }
      }).subscribe(insumos => {

        this.insumos = insumos;
        this.insumos_filtrados = this.insumos.slice();


      });
  }

  cargarObra(id_obra) {

    if (id_obra) {
      this.router.navigate([".", { obra: id_obra }]);
    } else {
      this.router.navigate([".", {}]);

    }

  }

  crearEntrada(form: NgForm) {

    let insumos = [];
    this.insumos.forEach(insumo => {
      if (insumo.entrada) {
        insumos.push({ id_insumo: insumo.id_insumo, cantidad: insumo.entrada });
      }
    });
    console.log(this.folio, this.id_proveedor, this.obra_selected, insumos);

    if (insumos.length > 0) {
      this.entradaSrv.createEntrada(this.obra_selected, insumos, this.id_proveedor, this.folio)
        .subscribe(insumos => {
          //console.log("respuesta", insumos);
          //volver a leer los insumos
          this.insumos = insumos;
          this.folio = "";
          this.id_proveedor = "";
          this.checkFiltro.checked = false;
          this.insumos_filtrados = this.insumos.slice();

          form.reset();

          this.snackBar.open("Entrada Creada", "", {
            duration: 2000,
            panelClass: ["bg-success", "text-white"]
          });

        }, (error) => {
          this.snackBar.open("Ha ocurrido un error de conexión. Inténtelo más tarde", "", {
            duration: 3000,
            panelClass: ["bg-danger", "text-white"]
          });

        });

    } else {
      //mostrar diálogo para que el usuario agregue insumos

      let dialogRef = this.dialog.open(AlertaDialogoComponent, {
        data: {
          title: "Corregir",
          content: "La entrada que intenta crear no contiene ningún material.",
          icon:true
        },
        //width: '500px',
      });

    }

  }

  aplicarFiltro(termino) {

    let min_termino = termino.toLowerCase();
    this.insumos_filtrados = this.insumos.filter(insumo => {
      let nombre = insumo.insumo.toLowerCase();
      return nombre.includes(min_termino);
    });
  }

  borrarFiltro(input_filtro) {
    console.log("filtro", input_filtro.value);
    input_filtro.value = "";
    this.insumos_filtrados = this.insumos.slice();
  }

  insumosConEntrada($event, filtro) {

    console.log("change", $event.checked);

    if ($event.checked == true) {
      this.insumos_filtrados = this.insumos.filter(insumos => insumos.entrada > 0);
      filtro.value = '';
    } else {
      this.insumos_filtrados = this.insumos.slice();
    }

  }


}

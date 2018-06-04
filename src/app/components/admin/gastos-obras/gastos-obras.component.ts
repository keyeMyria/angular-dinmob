import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { NuevoGastoDialogoComponent } from '../nuevo-gasto-dialogo/nuevo-gasto-dialogo.component';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ConfirmarBorradoDialogoComponent } from "app/components/admin/confirmar-borrado-dialogo/confirmar-borrado-dialogo.component";
import { EditarGastoDialogoComponent } from 'app/components/admin/editar-gasto-dialogo/editar-gasto-dialogo.component';
import { GastoService } from '../../../services/gasto.service';
import { of } from "rxjs/observable/of";
import * as moment from 'moment';

@Component({
  selector: 'app-gastos-obras',
  templateUrl: './gastos-obras.component.html',
  styleUrls: ['./gastos-obras.component.scss']
})
export class GastosObrasComponent implements OnInit {
  @ViewChild('del') dpDel: ElementRef;
  @ViewChild('al') dpAl: ElementRef;
  obras: any = [];
  obra_selected: string = "";
  gastos: any = [];
  tipos: any = [];
  gastosFiltrados: any = [];
  tipo_gasto_selected: string = "";

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private gastoSrv: GastoService
  ) { }

  ngOnInit() {
    this.route.data
      .subscribe((data: { obras: any[], tipos: any }) => {
        this.obras = data.obras;
        this.tipos = data.tipos;
      });

    this.route.paramMap
      .switchMap((params: ParamMap) => {
        if (params.has("obra")) {
          this.obra_selected = params.get("obra");
          return this.gastoSrv.getGastosObra(params.get("obra"));
        } else {
          return of([]);
        }
      }).subscribe(gastos => {
        this.gastos = gastos;
        this.gastosFiltrados = this.gastos.slice(); // this.gastos; 
      }, (error) => {
      });


  }

  cargarObra(id_obra) {

    if (id_obra) {
      this.router.navigate([".", { obra: id_obra }]);
    } else {
      this.router.navigate([".", {}]);

    }
  }

  nuevoGasto() {
    let obra = this.obras.find(obra => obra.id_obra == this.obra_selected);
    //console.log("obra seleccionada", this.obra_selected, obra);

    let dialogRef = this.dialog.open(NuevoGastoDialogoComponent, {
      width: '500px',
      data: {
        obra: obra,
        gastos: this.gastos,
        tipos: this.tipos
      },
    });
    dialogRef.afterClosed().subscribe(result => {

      if (result === true) {

        this.snackBar.open("Gasto Agregado", "", {
          duration: 2000,
          panelClass: ["bg-success", "text-white"]
        });

        //console.log("del", this.dpDel.nativeElement, "al", this.dpAl.nativeElement);

        this.filtro(this.dpDel.nativeElement, this.dpAl.nativeElement, this.tipo_gasto_selected);

      } else if (result && result.error) {

        this.snackBar.open(result.error, "", {
          duration: 3000,
          panelClass: ["bg-danger", "text-white"]
        });

      }
    });

  }

  editarGasto(gasto) {

    let dialogRef = this.dialog.open(EditarGastoDialogoComponent, {
      data: {
        gasto: gasto,
        gastos: this.gastos,
        gastosFiltrados: this.gastosFiltrados,
        tipos: this.tipos
      },
      width: '500px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {

        this.snackBar.open("Gasto Actulizado", "", {
          duration: 2000,
          panelClass: ["bg-success", "text-white"]
        });

        this.filtro(this.dpDel.nativeElement, this.dpAl.nativeElement, this.tipo_gasto_selected);

      } else if (result && result.error) {

        this.snackBar.open(result.error, "", {
          duration: 3000,
          panelClass: ["bg-danger", "text-white"]
        });

      }

    });
  }

  filtro(del, al, id_tipo_gasto) {

    //console.log("del", del, "al", al);



    let fecha_ini = del.value == "" ? "" : moment(del.value, "ll", "es").format("YYYY-MM-DD");
    let fecha_fin = al.value == "" ? "" : moment(al.value, "ll", "es").format("YYYY-MM-DD");

    let filtro = false;

    //console.log("filtro", id_tipo, fecha_ini, fecha_fin);

    if (fecha_ini != "") {

      this.gastosFiltrados = this.gastos.filter(item => item.fecha >= fecha_ini);
      filtro = true;

    }

    if (fecha_fin != "") {



      if (filtro) {
        this.gastosFiltrados = this.gastosFiltrados.filter(item => item.fecha <= fecha_fin);
      } else {
        this.gastosFiltrados = this.gastos.filter(item => item.fecha <= fecha_fin);
      }

      filtro = true;

    }

    if (id_tipo_gasto != "") {

      if (filtro) {
        this.gastosFiltrados = this.gastosFiltrados.filter(item => item.id_tipo_gasto == id_tipo_gasto);

      } else {
        this.gastosFiltrados = this.gastos.filter(item => item.id_tipo_gasto == id_tipo_gasto);
      }

    } else {
      //todos los tipos


      // this.tabla_filtrada && !filtro
      if (!filtro) {
        //console.log("todos, no filtro");

        this.gastosFiltrados = this.gastos.filter(item => item.id_tipo_gasto);
      } else {
        //console.log("todos, filtro");
        //ya se ha aplicado algún filtro de fechas
        this.gastosFiltrados = this.gastosFiltrados.filter(item => item.id_tipo_gasto);
      }

    }



  }

  sumaGastos() {
    let suma = 0;

    this.gastosFiltrados.forEach(gasto => {
      suma += +gasto.monto;
    });

    return suma;
  }

  delGasto(gasto) {

    let dialogRef = this.dialog.open(ConfirmarBorradoDialogoComponent, {
      data: {
        title: "Eliminar Gasto",
        content: `¿Desea eliminar el gasto del: ${gasto.fecha} ?`
      },
      width: "500px"
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {

        this.gastoSrv.delGasto(gasto.id_gasto)
          .subscribe((res: any) => {
            if (res.count === 1) {

              this.snackBar.open("Gasto Eliminado", "", {
                duration: 2000,
                panelClass: ["bg-success", "text-white"]
              });

              let i = this.gastos.indexOf(gasto);
              this.gastos.splice(i, 1);
              this.filtro(this.dpDel.nativeElement, this.dpAl.nativeElement, this.tipo_gasto_selected);

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


}

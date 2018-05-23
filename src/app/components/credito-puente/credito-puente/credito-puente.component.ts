import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { CargoAbonoCreditoDialogoComponent } from '../cargo-abono-credito-dialogo/cargo-abono-credito-dialogo.component';
import { ConfirmarBorradoDialogoComponent } from "app/components/admin/confirmar-borrado-dialogo/confirmar-borrado-dialogo.component";
import { EditarCargoAbonoCreditoDialogoComponent } from '../editar-cargo-abono-credito-dialogo/editar-cargo-abono-credito-dialogo.component';
import { ActivatedRoute, Router, ParamMap } from "@angular/router";
import { CreditoPuenteService } from '../../../services/credito-puente.service';
import { of } from "rxjs/observable/of";

@Component({
  selector: 'app-credito-puente',
  templateUrl: './credito-puente.component.html',
  styleUrls: ['./credito-puente.component.scss']
})
export class CreditoPuenteComponent implements OnInit {
  obras: any = [];
  obra_selected: string = "";
  movimientos: any = [];

  constructor(
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router,
    private creditoSrv: CreditoPuenteService
  ) { }

  ngOnInit() {
    this.route.data
      .subscribe((data: { obras: any[] }) => {
        //console.log("resultado resolve ", data);
        this.obras = data.obras;
      });

    this.route.paramMap
      .switchMap((params: ParamMap) => {
        if (params.has("obra")) {
          this.obra_selected = params.get("obra");
          return this.creditoSrv.getMovimientos(params.get("obra"));
        } else {
          return of([]);
        }
      }).subscribe(movimientos => {
        this.movimientos = movimientos;
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

  nuevoMovimiento() {

    let dialogRef = this.dialog.open(CargoAbonoCreditoDialogoComponent, {
      data: {
        id_obra:this.obra_selected,
        movimientos:this.movimientos
      },
      width: "500px"
    });

    dialogRef.afterClosed().subscribe(result => {
    });

  }

  editarMovimiento() {

    let dialogRef = this.dialog.open(EditarCargoAbonoCreditoDialogoComponent, {
      data: {
      },
      width: "500px"
    });

    dialogRef.afterClosed().subscribe(result => {
    });

  }

  delMovimiento() {

    let dialogRef = this.dialog.open(ConfirmarBorradoDialogoComponent, {
      data: {
        title: "Eliminar Movimiento",
        content: `¿Desea eliminar el movimiento: (tipo-fecha)?`
      },
      width: "500px"
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result === true) {


      }

    });

  }

}

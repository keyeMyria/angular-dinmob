import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '../../../../../node_modules/@angular/router';
import { CargoAbonoProveedoresDialogoComponent } from '../cargo-abono-proveedores-dialogo/cargo-abono-proveedores-dialogo.component';
import { MatDialog, MatSnackBar } from '../../../../../node_modules/@angular/material';
import { ConfirmarBorradoDialogoComponent } from 'app/components/admin/confirmar-borrado-dialogo/confirmar-borrado-dialogo.component';
import { EditarCargoAbonoProveedoresDialogoComponent } from '../editar-cargo-abono-proveedores-dialogo/editar-cargo-abono-proveedores-dialogo.component';

@Component({
  selector: 'app-saldo-proveedores',
  templateUrl: './saldo-proveedores.component.html',
  styleUrls: ['./saldo-proveedores.component.scss']
})
export class SaldoProveedoresComponent implements OnInit {
  obras: any = [];
  obra_selected: string = "";
  proveedores: any;

  constructor(
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.proveedores = [
      {
        fecha: "21 jun. 2018",
        cargo: "1000",
        abono: "500",
        nota: "Folio 02"
      },
      {
        fecha: "2 ene. 2018",
        cargo: "5000",
        abono: "",
        nota: "Folio 04"
      },
      {
        fecha: "10 jul. 2018",
        cargo: "500",
        abono: "",
        nota: "Folio 06"
      },
      {
        fecha: "21 ago. 2018",
        cargo: "100000",
        abono: "1000",
        nota: "Folio 08"
      }
    ]
  }

  ngOnInit() {
    this.route.data
      .subscribe((data: { obras: any[] }) => {
        //console.log("resultado resolve ", data);
        this.obras = data.obras;
      });
  }

  cargarObra(id_obra) {

    if (id_obra) {
      this.router.navigate([".", { obra: id_obra }]);
    } else {
      this.router.navigate([".", {}]);

    }

  }


  totalCargo() {
    let suma = 0;
    this.proveedores.forEach(pago => {
      suma += +pago.cargo;
    });
    return suma;
  }

  totalAbono() {
    let total = 0;
    this.proveedores.forEach(pagoAbono => {
      total += +pagoAbono.abono;
    });
    return total;
  }

  totalSaldo() {
    let saldo = 0;
    if (this.proveedores) {
      saldo = +this.totalCargo() + this.totalAbono();
    }
    return saldo;
  }


  cargoAbono() {

    let dialogRef = this.dialog.open(CargoAbonoProveedoresDialogoComponent, {
      data: {
        proveedores: this.proveedores
      },
      width: "500px"
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {

        this.snackBar.open("Movimiento Agregado", "", {
          duration: 2000,
          panelClass: ["bg-success", "text-white"]
        });

      } else if (result && result.error) {

        this.snackBar.open(result.error, "", {
          duration: 3000,
          panelClass: ["bg-danger", "text-white"]
        });

      }
    });

  }

  editarCargo(proveedor) {

    let dialogRef = this.dialog.open(EditarCargoAbonoProveedoresDialogoComponent, {
      data: {
        proveedor: proveedor
      },
      width: "500px"
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {

        this.snackBar.open("Movimiento Actulizado", "", {
          duration: 2000,
          panelClass: ["bg-success", "text-white"]
        });

      } else if (result && result.error) {

        this.snackBar.open(result.error, "", {
          duration: 3000,
          panelClass: ["bg-danger", "text-white"]
        });

      }
    });

  }

  delCargo(proveedor) {


    let dialogRef = this.dialog.open(ConfirmarBorradoDialogoComponent, {
      data: {
        title: "Eliminar Movimiento",
        content: `¿Desea eliminar el movimiento del ${proveedor.fecha}?`
      },
      width: "500px"
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {



      }
    });

  }




}

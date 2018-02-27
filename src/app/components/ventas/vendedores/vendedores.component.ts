import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CrearVendedorDialogoComponent } from '../crear-vendedor-dialogo/crear-vendedor-dialogo.component';
import { MatDialog, MatSnackBar } from '@angular/material';
import { EditarVendedorDialogoComponent } from '../editar-vendedor-dialogo/editar-vendedor-dialogo.component';
import { ConfirmarBorradoDialogoComponent } from "app/components/admin/confirmar-borrado-dialogo/confirmar-borrado-dialogo.component";

@Component({
  selector: 'app-vendedores',
  templateUrl: './vendedores.component.html',
  styleUrls: ['./vendedores.component.scss']
})
export class VendedoresComponent implements OnInit {
  obras: any = [];
  obra_selected: string = "";
  vendedores = [
    { nombre: "Emilio", email: "emilio@hotmail.com", telefono: "9612160320" },
    { nombre: "Emilio", email: "emilio@hotmail.com", telefono: "9612160320" },
    { nombre: "Emilio", email: "emilio@hotmail.com", telefono: "9612160320" },
    { nombre: "Emilio", email: "emilio@hotmail.com", telefono: "9612160320" }
  ]

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    public snackBar: MatSnackBar,
  ) { }

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

  agregarVendedor() {
    let dialogRef = this.dialog.open(CrearVendedorDialogoComponent, {
      data: {

      },
      width: "500px"
    });
    dialogRef.afterClosed().subscribe(result => {

      if (result === true) {

        this.snackBar.open("Vendedor Agregado", "", {
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

  editarVendedor(vendedor) {
    let dialogRef = this.dialog.open(EditarVendedorDialogoComponent, {
      data: {
        vendedor: vendedor
      },
      width: "500px"
    });
    dialogRef.afterClosed().subscribe(result => {

      if (result === true) {

        this.snackBar.open("Vendedor Actulizado", "", {
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

  delVendedor(vendedor) {
    let dialogRef = this.dialog.open(ConfirmarBorradoDialogoComponent, {
      data: {
        title: "Eliminar Vendedor",
        content: `¿Desea eliminar: ${vendedor.nombre} ?`
      },
      width: "500px"
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {




      }
    });
  }



}

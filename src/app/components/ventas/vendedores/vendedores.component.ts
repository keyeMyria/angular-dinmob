
import {switchMap} from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { CrearVendedorDialogoComponent } from '../crear-vendedor-dialogo/crear-vendedor-dialogo.component';
import { MatDialog, MatSnackBar } from '@angular/material';
import { EditarVendedorDialogoComponent } from '../editar-vendedor-dialogo/editar-vendedor-dialogo.component';
import { ConfirmarBorradoDialogoComponent } from "app/components/admin/confirmar-borrado-dialogo/confirmar-borrado-dialogo.component";
import { VendedorService } from '../../../services/vendedor.service';
import { of } from "rxjs";

@Component({
  selector: 'app-vendedores',
  templateUrl: './vendedores.component.html',
  styleUrls: ['./vendedores.component.scss']
})
export class VendedoresComponent implements OnInit {
  obras: any = [];
  obra_selected: string = "";
  vendedores: any = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    public snackBar: MatSnackBar,
    private vendedorSrv: VendedorService
  ) { }

  ngOnInit() {
    this.route.data
      .subscribe((data: { obras: any[] }) => {
        //console.log("resultado resolve ", data);
        this.obras = data.obras;
      });

    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        if (params.has("obra")) {
          this.obra_selected = params.get("obra");
          return this.vendedorSrv.getVendedoresObra(params.get("obra"));
        } else {
          return of([]);
        }
      })).subscribe(vendedores => {
        this.vendedores = vendedores;
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

  agregarVendedor() {
    
    let obra = this.obras.find(obra => obra.id_obra == this.obra_selected);
    console.log("obra seleccionada", this.obra_selected, obra);

    let dialogRef = this.dialog.open(CrearVendedorDialogoComponent, {
      data: {
        obra: obra,
        vendedores: this.vendedores
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
        vendedor: vendedor,
        vendedores: this.vendedores
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
        content: `¿Desea eliminar a: ${vendedor.nombre} ?`
      },
      width: "500px"
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {

        this.vendedorSrv.delVendedor(vendedor.id_vendedor)
          .subscribe((res: any) => {
            if (res.count === 1) {

              let i = this.vendedores.indexOf(vendedor);
              this.vendedores.splice(i, 1);


              this.snackBar.open("Vendedor Eliminado", "", {
                duration: 2000,
                panelClass: ["bg-success", "text-white"]
              });

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

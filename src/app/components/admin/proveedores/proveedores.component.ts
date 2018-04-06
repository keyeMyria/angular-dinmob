import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MatDialog, MatSnackBar } from '@angular/material';
import { NuevoProveedorDialogoComponent } from '../nuevo-proveedor-dialogo/nuevo-proveedor-dialogo.component';
import { EditarProveedorDialogoComponent } from '../editar-proveedor-dialogo/editar-proveedor-dialogo.component';
import { ConfirmarBorradoDialogoComponent } from "app/components/admin/confirmar-borrado-dialogo/confirmar-borrado-dialogo.component";
import { ProveedorService } from '../../../services/proveedor.service';
import { of } from "rxjs/observable/of";


@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.scss']
})
export class ProveedoresComponent implements OnInit {
  obras: any = [];
  obra_selected: string = "";
  proveedores: any = [];
  proveedores_filtrados: any = [];
  trackByIndex = (index, item) => item.id_proveedor;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private proveedorSrv: ProveedorService,
    public snackBar: MatSnackBar,
  ) { }

  ngOnInit() {

    this.route.paramMap
      .switchMap((params: ParamMap) => {
        if (params.has("obra")) {
          this.obra_selected = params.get("obra");
          return this.proveedorSrv.getProveedores();
        } else {
          return of([]);
        }
      }).subscribe(proveedores => {
        this.proveedores = proveedores;
        this.proveedores_filtrados = this.proveedores.slice();
      }, (error) => {
      });

  }


  nuevoProveedor() {

    let dialogRef = this.dialog.open(NuevoProveedorDialogoComponent, {
      data: {
        proveedores: this.proveedores
      },
      width: '800px'
    });
    dialogRef.afterClosed().subscribe(result => {

      if (result === true) {

        this.snackBar.open("Trabajador Agregado", "", {
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

  editarProveedor(proveedor) {

    let dialogRef = this.dialog.open(EditarProveedorDialogoComponent, {
      data: {
        proveedor: proveedor,
        proveedores: this.proveedores,
        proveedores_filtrados: this.proveedores_filtrados
      },
      width: '500px'
    });
    dialogRef.afterClosed().subscribe(result => {



      if (result === true) {

        this.snackBar.open("Trabajador Actulizado", "", {
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

  filtrar(event) {

    this.proveedores_filtrados = this.proveedores.filter(proveedor => {
      return proveedor.nombre.toLowerCase().includes(event.srcElement.value.toLowerCase());
    });

  }

  delProveedor(proveedor) {

    let dialogRef = this.dialog.open(ConfirmarBorradoDialogoComponent, {
      data: {
        title: "Eliminar Proveedor",
        content: `¿Desea eliminar a: ${proveedor.nombre} ?`
      },
      width: "500px"
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {

        this.proveedorSrv.delProveedor(proveedor.id_proveedor)
          .subscribe((res: any) => {
            if (res.count === 1) {

              let i = this.proveedores.indexOf(proveedor);
              this.proveedores.splice(i, 1);


              this.snackBar.open("Proveedor Eliminado", "", {
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

import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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
  proveedores: any = [];
  proveedores_filtrados: any = [];
  trackByIndex = (index, item) => item.id_proveedor;

  @ViewChild('term') term: ElementRef;

  constructor(
    public dialog: MatDialog,
    private proveedorSrv: ProveedorService,
    public snackBar: MatSnackBar,
  ) { }

  ngOnInit() {

    this.proveedorSrv.getProveedores()
      .subscribe(proveedores => {
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

        //aplicamos el filtro por si el nuevo elemento cumple el filtro
        this.doFilter();

        this.snackBar.open("Proveedor Agregado", "", {
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
        /*     proveedores_filtrados: this.proveedores_filtrados */
      },
      width: '500px'
    });
    dialogRef.afterClosed().subscribe(result => {



      if (result === true) {

        this.snackBar.open("Proveedor Actulizado", "", {
          duration: 2000,
          panelClass: ["bg-success", "text-white"]
        });

        this.doFilter();

      } else if (result && result.error) {

        this.snackBar.open(result.error, "", {
          duration: 3000,
          panelClass: ["bg-danger", "text-white"]
        });

      }

    });
  }

  filtrar(event) {

    this.filter(event.srcElement.value);

    /*     this.proveedores_filtrados = this.proveedores.filter(proveedor => {
          return proveedor.nombre.toLowerCase().includes(event.srcElement.value.toLowerCase());
        });
     */
  }

  doFilter() {

    //console.log("doFilter", this.term.nativeElement.value);

    this.filter(this.term.nativeElement.value);

  }

  filter(term: string) {
    this.proveedores_filtrados = this.proveedores.filter(proveedor => {
      return proveedor.nombre.toLowerCase().includes(term.toLowerCase());
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

              let j = this.proveedores_filtrados.indexOf(proveedor);
              this.proveedores_filtrados.splice(j, 1);


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

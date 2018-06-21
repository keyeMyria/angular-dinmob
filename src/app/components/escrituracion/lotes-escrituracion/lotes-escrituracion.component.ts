import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EditarLoteEscrituracionDialogoComponent } from '../editar-lote-escrituracion-dialogo/editar-lote-escrituracion-dialogo.component';
import { MatDialog, MatSnackBar, MatDrawer } from '@angular/material';

@Component({
  selector: 'app-lotes-escrituracion',
  templateUrl: './lotes-escrituracion.component.html',
  styleUrls: ['./lotes-escrituracion.component.scss']
})
export class LotesEscrituracionComponent implements OnInit {
  obras: any = [];
  obra: any = {};
  obra_selected: string = "";

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.route.data
      .subscribe((data: { obras: any }) => {
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

  editarLote() {
    let dialogRef = this.dialog.open(EditarLoteEscrituracionDialogoComponent, {
      data: {
      },
      width: '800px',

    });
    dialogRef.afterClosed().subscribe(result => {

      if (result === true) {

        this.snackBar.open("Equipo Agregado", "", {
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


}

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { EditarEntradaDialogoComponent } from 'app/components/almacen/editar-entrada-dialogo/editar-entrada-dialogo.component';
import { MatDialog } from '@angular/material';
import { EntradasService } from 'app/services/entradas.service';
import { of } from "rxjs/observable/of";
import { ConfirmarBorradoDialogoComponent } from 'app/components/admin/confirmar-borrado-dialogo/confirmar-borrado-dialogo.component';

@Component({
  selector: 'app-entradas',
  templateUrl: './entradas.component.html',
  styleUrls: ['./entradas.component.scss']
})
export class EntradasComponent implements OnInit {
  obras: any = [];
  loading: boolean;
  obra_selected: string = "";
  entradas: any[] = [];


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private entradaSrv: EntradasService,


  ) { }

  ngOnInit() {
    this.route.data
      .subscribe((data: { obras: any[] }) => {
        this.obras = data.obras;
      });
    this.loading = true;
    this.route.paramMap
      .switchMap((params: ParamMap) => {
        if (params.has("obra")) {
          this.obra_selected = params.get("obra");
          return this.entradaSrv.getEntradasObra(params.get("obra"));
        } else {
          return of([]);
        }
      }).subscribe(entradas => {
        this.entradas = entradas;
        this.loading = false;

      });
  }

  nuevaEntrada() {
    this.router.navigate(["/nueva-entrada"]);
  }

  editarEntrada(entrada) {
    this.router.navigate(["/editar-entrada",entrada.id_entrada]);
  }

  delEntrada(entrada) {
    let dialogRef = this.dialog.open(ConfirmarBorradoDialogoComponent, {
      data: {
        title: "Eliminar Entrada",
        content: `¿Desea eliminar la entrada: ${entrada.folio}?`
      },
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
      }
    });

  }


  cargarObra(id_obra) {

    if (id_obra) {
      this.router.navigate([".", { obra: id_obra }]);
    } else {
      this.router.navigate([".", {}]);

    }

  }



}

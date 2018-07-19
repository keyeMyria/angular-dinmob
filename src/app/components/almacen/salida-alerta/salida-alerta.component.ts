import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AceptarSalidaAlertaDialogoComponent } from '../aceptar-salida-alerta-dialogo/aceptar-salida-alerta-dialogo.component';
import { MatDialog } from '@angular/material';
import { ConfirmarBorradoDialogoComponent } from 'app/components/admin/confirmar-borrado-dialogo/confirmar-borrado-dialogo.component';

@Component({
  selector: 'app-salida-alerta',
  templateUrl: './salida-alerta.component.html',
  styleUrls: ['./salida-alerta.component.scss']
})
export class SalidaAlertaComponent implements OnInit {
  obras: any = [];
  obra_selected: string = "";
  salidas: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog,
  ) {
    this.salidas = [
      {
        vale: "0002",
        fecha: "10 ene. 2018",
        manzana: "Manzana 1",
        lote: "Lote 1",
        partida: "CIMENTACION",
        recibio: "",
        estado: "",
        aceptada: "0"
      },
      {
        vale: "0003",
        fecha: "10 ene. 2018",
        manzana: "Manzana 2",
        lote: "Lote 2",
        partida: "CIMENTACION",
        recibio: "",
        estado: "",
        aceptada: "1"
      },
      {
        vale: "0004",
        fecha: "10 ene. 2018",
        manzana: "Manzana 3",
        lote: "Lote 3",
        partida: "CIMENTACION",
        recibio: "",
        estado: "",
        aceptada: "0"
      },
      {
        vale: "0005",
        fecha: "10 ene. 2018",
        manzana: "Manzana 4",
        lote: "Lote 4",
        partida: "CIMENTACION",
        recibio: "",
        estado: "",
        aceptada: "1"
      }
    ]
  }

  ngOnInit() {
    this.route.data
      .subscribe((data: { obras: any[], usuario: any }) => {
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

  setValidacionAceptada(salida) {
    let dialogRef = this.dialog.open(AceptarSalidaAlertaDialogoComponent, {
      data: {
        salida: salida
      },
      width: '500px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
      }
    });
  }

  delSalida(salida) {
    let dialogRef = this.dialog.open(ConfirmarBorradoDialogoComponent, {
      data: {
        title: "Eliminar Salida",
        content: `¿Desea eliminar la salida del: ${salida.fecha}?`
      },
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {

    });

  }

}

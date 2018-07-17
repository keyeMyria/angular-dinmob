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
  lotes: any = [];
  obra: any = {};
  obra_selected: string = "";
  lote: any;
  clientes: any;
  valor: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.lotes = [
      {
        nombre: "lote 1",
        manzana: "manzana 1",
        dtu: "21 jun. 2018",
        apartado: "20 ago. 2018",
        checklist: null,
        infonavit: null,
        firma: null,
        entrega: null,
        alerta: "1",
        estado: "1"
      },
      {
        nombre: "lote 2",
        manzana: "manzana 1",
        dtu: null,
        apartado: "20 ago. 2018",
        checklist: "10 jul. 2018",
        infonavit: null,
        firma: null,
        entrega: null,
        alerta: "0",
        estado: "2"

      },
      {
        nombre: "lote 3",
        manzana: "manzana 1",
        dtu: "21 jun. 2018",
        apartado: "20 ago. 2018",
        checklist: "10 jul. 2018",
        infonavit: "4 jul. 2018",
        firma: null,
        entrega: null,
        alerta: "1",
        estado: "3"

      },
      {
        nombre: "lote 4",
        manzana: "manzana 1",
        dtu: null,
        apartado: "20 ago. 2018",
        checklist: "10 jul. 2018",
        infonavit: "4 jul. 2018",
        firma: "6 mar. 2018",
        entrega: "8 mar. 2018",
        alerta: "0",
        estado: "5"
      }
    ];

    this.lote = {
      id_estado: "3",
      dtu: "21 jun. 2018",
      precio_venta: "800000",
    }
    this.clientes = [
      {
        nombre: "Pablo Neruda",
        fecha_activacion: "25 agos. 20188",
        fecha_cacelacion: "10 may. 2018",
        activo: "1",
        fecha_nacimiento: "30 mar. 1978",
        curp: "2155FFKGKG208",
        telefono: "9612160320",
        precio_venta: "800000",
        id_vendedor: "1",
        id_tipo_credito: "2",
        valor_operacion: "800000",
        documentos: [
          {
            id_documento: "1"
          },
          {
            id_documento: "2"
          },
          {
            id_documento: "3"
          }
        ],
        pagos: [
          {
            fecha_programacion: "21 jun. 2018",
            fecha_pago: "10 jul. 2018",
            monto: "10000",
            id_tipo_pago: "3",
            id_forma_pago: "2",
            tipo_pago: "Enganche",
            fomra_pago: "Efectivo",
            nota: "Hola a todos",
            validado: "1"
          },
          {
            fecha_programacion: "21 jun. 2018",
            fecha_pago: "10 ago. 2018",
            monto: "5000",
            id_tipo_pago: "1",
            id_forma_pago: "2",
            tipo_pago: "Mensualidad",
            fomra_pago: "Efectivo",
            nota: "Hola a todos",
            validado: "1"
          },
          {
            fecha_programacion: "21 jun. 2018",
            fecha_pago: "10 sep. 2018",
            monto: "2000",
            id_tipo_pago: "2",
            id_forma_pago: "2",
            tipo_pago: "Mensualidad",
            fomra_pago: "Efectivo",
            nota: "Hola a todos",
            validado: "0"
          }
        ],


      }
    ]

  }

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
        lote: this.lote,
        clientes: this.clientes
      },
      width: '900px',

    });
    dialogRef.afterClosed().subscribe(result => {

      if (result === true) {

        this.snackBar.open("Lote Actualizado", "", {
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

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
  estados_infonavit = [
    {
      nombre: "Apartado",
      id_estado_infonavit: "1",

    },
    {
      nombre: "Expediente",
      id_estado_infonavit: "2",

    },
    {
      nombre: "Infonavit",
      id_estado_infonavit: "3",

    },
    {
      nombre: "Firma",
      id_estado_infonavit: "4",

    },
    {
      nombre: "Entrega",
      id_estado_infonavit: "5",

    }
  ];
  estados_fovissste = [
    {
      nombre: "Apartado",
      id_estado_fovissste: "1",

    },
    {
      nombre: "Expediente",
      id_estado_fovissste: "2",

    },
    {
      nombre: "Reactivación",
      id_estado_fovissste: "3",

    },
    {
      nombre: "Avaluo",
      id_estado_fovissste: "4",

    },
    {
      nombre: "Validación CUV",
      id_estado_fovissste: "5",

    },
    {
      nombre: "SOFOM",
      id_estado_fovissste: "6",

    },
    {
      nombre: "Instrucción Notarial",
      id_estado_fovissste: "57",

    },
    {
      nombre: "Escrituración",
      id_estado_fovissste: "8",

    },
    {
      nombre: "Entrega",
      id_estado_fovissste: "9",

    },
  ];
  estados_contado = [
    {
      nombre: "Apartado",
      id_estado_contado: "1"
    },
    {
      nombre: "Expediente",
      id_estado_contado: "2"
    },
    {
      nombre: "Notaria",
      id_estado_contado: "3"
    },
    {
      nombre: "Firma",
      id_estado_contado: "4"
    },
    {
      nombre: "Entrega",
      id_estado_contado: "5"
    }
  ];
  estados_bancos = [
    {
      nombre: "Apartado",
      id_estado_banco: "1"
    },
    {
      nombre: "Expediente",
      id_estado_banco: "2"
    },
    {
      nombre: "Autorización Crédito",
      id_estado_banco: "3"
    },
    {
      nombre: "Firma",
      id_estado_banco: "4"
    },
    {
      nombre: "Entrega",
      id_estado_banco: "5"
    }
  ];
  estados_cofinanciamiento = [
    {
      nombre: "Apartado",
      id_estado_confinanciamiento: "1"
    },
    {
      nombre: "Expediente",
      id_estado_confinanciamiento: "2"
    },
    {
      nombre: "Autorización Crédito",
      id_estado_confinanciamiento: "3"
    },
    {
      nombre: "Infonavit",
      id_estado_confinanciamiento: "4"
    },
    {
      nombre: "Entrega",
      id_estado_confinanciamiento: "5"
    }
  ];
  tipos_creditos = [
    {
      credito: "Infonavit",
      id_tipo_credito: "1"
    },
    {
      credito: "Fovissste",
      id_tipo_credito: "2"
    },
    {
      credito: "Contado",
      id_tipo_credito: "3"
    },
    {
      credito: "Banco",
      id_tipo_credito: "4"
    },
    {
      credito: "Cofinanciamiento",
      id_tipo_credito: "5"
    }
  ]


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
        clientes: this.clientes,
        tipos_creditos: this.tipos_creditos,
        estados_infonavit: this.estados_infonavit,
        estados_fovissste: this.estados_fovissste,
        estados_contado: this.estados_contado,
        estados_bancos: this.estados_bancos,
        estados_cofinanciamiento: this.estados_cofinanciamiento
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

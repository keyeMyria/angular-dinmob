import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material'
import { EditarClienteEscrituracionDialogoComponent } from '../editar-cliente-escrituracion-dialogo/editar-cliente-escrituracion-dialogo.component';
import { ConfirmarBorradoDialogoComponent } from "app/components/admin/confirmar-borrado-dialogo/confirmar-borrado-dialogo.component";
import { DocumentoService } from '../../services/documento.service';

@Component({
  selector: 'app-clientes-escrituracion',
  templateUrl: './clientes-escrituracion.component.html',
  styleUrls: ['./clientes-escrituracion.component.scss']
})
export class ClientesEscrituracionComponent implements OnInit {
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
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private docSrv: DocumentoService
  ) { }

  ngOnInit() {

    this.docSrv.getChecklist()
      .subscribe((docs: any) => {

      }, (error) => {

      });
  }

  agregarCliente() {

  }


  editarCliente() {
    let dialogRef = this.dialog.open(EditarClienteEscrituracionDialogoComponent, {
      data: {
        tipos_creditos: this.tipos_creditos,
        estados_infonavit: this.estados_infonavit,
        estados_fovissste: this.estados_fovissste,
        estados_contado: this.estados_contado,
        estados_bancos: this.estados_bancos,
        estados_cofinanciamiento: this.estados_cofinanciamiento
      },
      width: '800px',

    });
    dialogRef.afterClosed().subscribe(result => {

      if (result === true) {

        this.snackBar.open("Cliente Actualizado", "", {
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

  delCliente() {

    let dialogRef = this.dialog.open(ConfirmarBorradoDialogoComponent, {
      data: {
        title: "Eliminar Cliente",
        content: `¿Desea eliminar el cliente?`
      },
      width: "500px"
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
      }
    });

  }

}

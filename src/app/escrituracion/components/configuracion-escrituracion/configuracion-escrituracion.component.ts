import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import * as moment from 'moment';
import { EstadoService } from '../../services/estado.service';

@Component({
  selector: 'app-configuracion-escrituracion',
  templateUrl: './configuracion-escrituracion.component.html',
  styleUrls: ['./configuracion-escrituracion.component.scss']
})
export class ConfiguracionEscrituracionComponent implements OnInit {
  form: FormGroup;

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

  estados: any = [];
  constructor(
    private fb: FormBuilder,
    private estadoSrv: EstadoService
  ) {
  }

  ngOnInit() {
    this.estadoSrv.getTodosEstadosEscrituracion()
      .subscribe((estados: any) => {
        this.estados = estados;
      }, (error) => {

      });
  }

  guardar() {

  }

}

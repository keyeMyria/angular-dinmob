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
  estados: any = [];
  formInfonavit: FormGroup;
  formContado: FormGroup;
  formFovissste: FormGroup;
  formBancos: FormGroup;
  formConfinanciamiento: FormGroup;

  constructor(
    private fb: FormBuilder,
    private estadoSrv: EstadoService
  ) {
    this.formInfonavit = this.fb.group({
    });
    this.formContado = this.fb.group({
    });
    this.formFovissste = this.fb.group({
    });
    this.formBancos = this.fb.group({
    });
    this.formConfinanciamiento = this.fb.group({

    });
  }

  ngOnInit() {
    this.estadoSrv.getTodosEstadosEscrituracion()
      .subscribe((estados: any) => {
        this.estados = estados;
      }, (error) => {

      });
  }

  guardarInfonavit() {
  }

  guardarContado() {
  }

  guardarFovissste() {
  }

  guardarBancos() {
  }

  guardarCofinanciamiento() {
  }



}

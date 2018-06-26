import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-configuracion-escrituracion',
  templateUrl: './configuracion-escrituracion.component.html',
  styleUrls: ['./configuracion-escrituracion.component.scss']
})
export class ConfiguracionEscrituracionComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
  ) {
    this.form = this.fb.group({
      etapa_uno: null,
      etapa_dos: null,
      etapa_tres: null,
    });
  }

  ngOnInit() {
  }

}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-nueva-salida',
  templateUrl: './nueva-salida.component.html',
  styleUrls: ['./nueva-salida.component.scss']
})
export class NuevaSalidaComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      partida: [""],
      Entrega: [""],
      recibe: ["", Validators.required],
      autoriza: ["", Validators.required],
      num_vale: [""],
      notas: [""],
    });
  }

  ngOnInit() {
  }

  guardar() {
    console.log("pago", this.form.value);
  }

}

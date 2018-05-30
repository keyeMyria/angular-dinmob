import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormGroup, FormControl, FormArray, Validators, FormBuilder } from '@angular/forms';
import { ObrasService } from 'app/services/obras.service';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import * as moment from 'moment';


@Component({
  selector: 'app-editar-obra-dialogo',
  templateUrl: './editar-obra-dialogo.component.html',
  styleUrls: ['./editar-obra-dialogo.component.scss']
})
export class EditarObraDialogoComponent implements OnInit {

  form: FormGroup;

  numberMask = createNumberMask({
    allowDecimal: true,
    prefix: '',
    decimalLimit: 2,
  });


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<EditarObraDialogoComponent>,
    private fb: FormBuilder,
    private obraSrv: ObrasService
  ) {

    this.form = this.fb.group({

      nombre: [data.obra.nombre, Validators.required],
      fecha_ini: [moment(data.obra.fecha_ini, "YYYY-MM-DD"), Validators.required],
      credito: [data.obra.credito],
      en_venta: data.obra.en_venta == "0" ? false : true,
      residentes: this.fb.array([], this.checkUsuariosRepetidos),
      control_almacen: this.fb.array([], this.checkUsuariosRepetidos),
      almacenistas: this.fb.array([], this.checkUsuariosRepetidos),
      comision_vendedor: [data.obra.comision_vendedor],
      comision_gerente: [data.obra.comision_gerente],
      comision_expediente: [data.obra.comision_expediente]
    });

    this.data.obra.residentes.forEach(usuario => {
      (<FormArray>this.form.controls["residentes"]).push(new FormControl(usuario.id_usuario, Validators.required));
    });

    this.data.obra.control_almacen.forEach(usuario => {
      (<FormArray>this.form.controls["control_almacen"]).push(new FormControl(usuario.id_usuario, Validators.required));
    });

    this.data.obra.almacenistas.forEach(usuario => {
      (<FormArray>this.form.controls["almacenistas"]).push(new FormControl(usuario.id_usuario, Validators.required));
    });


  }

  ngOnInit() {
  }

  checkUsuariosRepetidos(control: FormArray): { [key: string]: boolean } {

    //console.log("chekrepetidos", control);

    let tiene_repetidos = (new Set(control.value)).size !== control.value.length;

    if (tiene_repetidos) {
      return { repetidos: true };
    } else {
      return null;
    }

  }


  get residentes(): FormArray {
    return this.form.get('residentes') as FormArray;
  }
  get almacenistas(): FormArray {
    return this.form.get('almacenistas') as FormArray;
  }
  get control_almacen(): FormArray {
    return this.form.get('control_almacen') as FormArray;
  }


  addResidente() {
    (<FormArray>this.form.controls["residentes"]).push(new FormControl("", Validators.required));
  }

  delResidente(index: number) {
    (<FormArray>this.form.controls["residentes"]).removeAt(index);
  }


  addAlmacenista() {
    (<FormArray>this.form.controls["almacenistas"]).push(new FormControl("", Validators.required));
  }

  delAlmacenista(index: number) {
    (<FormArray>this.form.controls["almacenistas"]).removeAt(index);
  }

  addControlAlmacen() {
    (<FormArray>this.form.controls["control_almacen"]).push(new FormControl("", Validators.required));
  }

  delControlAlmacen(index: number) {
    (<FormArray>this.form.controls["control_almacen"]).removeAt(index);
  }

  private clonar(objeto): any {

    let strObject = JSON.stringify(objeto);
    return JSON.parse(strObject);

  }

  guardar() {


    let obra = this.clonar(this.form.value);
    if (obra.credito) {
      obra.credito = obra.credito.replace(/,/g, "");
    }

    this.obraSrv.updateObra(this.data.obra.id_obra, obra)
      .subscribe(obra => {
        let i = this.data.obras.indexOf(this.data.obra);
        this.data.obras[i] = obra;
        this.dialogRef.close(true);

      }, (error) => {
        this.dialogRef.close({ error: "Ha ocurrido un error de conexión. Inténtelo más tarde" });
      });
  }

  debug() {
    console.log("formgroup", this.form);
    console.log("value", this.form.value);
    console.log("status", this.form.status);
  }

}

import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import * as moment from 'moment';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-editar-lote-escrituracion-dialogo',
  templateUrl: './editar-lote-escrituracion-dialogo.component.html',
  styleUrls: ['./editar-lote-escrituracion-dialogo.component.scss']
})
export class EditarLoteEscrituracionDialogoComponent implements OnInit {
  numbermask = createNumberMask({
    allowDecimal: true,
    prefix: '',
    decimalLimit: 2
  });
  public maskCURP = [/[A-Z0-9]/i, /[A-Z0-9]/i, /[A-Z0-9]/i, /[A-Z0-9]/i, '-', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, '-', /[A-Z]/i, '-', /[A-Z]/i, /[A-Z]/i, '-', /[A-Z0-9]/i, /[A-Z0-9]/i, /[A-Z0-9]/i, '-', /[A-Z0-9]/i, /[A-Z0-9]/i];
  public maskPhone = ['(', /\d/, /\d/, /\d/, ')', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

  estados_selected: string;
  formGenerales: FormGroup;
  formDocumentos: FormGroup;


  selection = new SelectionModel<any>(false);
  cliente_selected: any = null;
  clientes: any = [{ nombre: "José Perez", manzana: "manzana1", lote: "lote 1" }];


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<EditarLoteEscrituracionDialogoComponent>,
    private fb: FormBuilder,
  ) {
    this.formGenerales = this.fb.group({
      id_estado: [null, Validators.required],
      fecha_apartado: [moment(), Validators.required],
      fecha_documentos: [moment(), Validators.required],
      fecha_escriturado: [moment(), Validators.required],
      nombre: [null, Validators.required],
      fecha_nacimiento: [moment(), Validators.required],
      dtu: [moment(), Validators.required],
      curp: [null, Validators.required],
      telefono: [null, Validators.required],
      precio_venta: [null, Validators.required],
      id_vendedor: [null, Validators.required],
      id_tipo_credito: [null, Validators.required],
    });
    this.formDocumentos = this.fb.group({
      curp: null,
      ine: null,
      acta_nacimiento: null,
      comprobante: null,
    });

  }

  ngOnInit() {
  }

  selectCliente(cliente) {

    //this.selection.isEmpty();
    //this.selection.hasValue();

    this.selection.toggle(cliente);
    if (this.selection.selected.length > 0) {
      this.cliente_selected = this.selection.selected[0];

    } else {
      this.cliente_selected = null;
    }

    console.log("cliente", this.cliente_selected);


  }

  guardarGenerales() {

  }

  guardarDocumentos() {

  }



}

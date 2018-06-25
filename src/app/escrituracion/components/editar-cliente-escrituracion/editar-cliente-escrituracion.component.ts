import { Component, OnInit } from '@angular/core';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-editar-cliente-escrituracion',
  templateUrl: './editar-cliente-escrituracion.component.html',
  styleUrls: ['./editar-cliente-escrituracion.component.scss']
})
export class EditarClienteEscrituracionComponent implements OnInit {
  numbermask = createNumberMask({
    allowDecimal: true,
    prefix: '',
    decimalLimit: 2
  });

  public maskCURP = [/[A-Z0-9]/i, /[A-Z0-9]/i, /[A-Z0-9]/i, /[A-Z0-9]/i, '-', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, '-', /[A-Z]/i, '-', /[A-Z]/i, /[A-Z]/i, '-', /[A-Z0-9]/i, /[A-Z0-9]/i, /[A-Z0-9]/i, '-', /[A-Z0-9]/i, /[A-Z0-9]/i];
  public maskPhone = ['(', /\d/, /\d/, /\d/, ')', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

  tab_selected:string;

  formGenerales: FormGroup;
  formDocumentos: FormGroup;
  formInmueble: FormGroup;


  constructor(
    private fb: FormBuilder,
  ) {
    this.formGenerales = this.fb.group({
      nombre: [null, Validators.required],
      fecha_nacimiento: [null, Validators.required],
      curp_cliente: [null, Validators.required],
      telefono_cliente: [null, Validators.required]
    });

    this.formDocumentos = this.fb.group({
      curp_documentos: "",
      ife_documentos: "",
      rfc_documentos: ""

    });

    this.formInmueble = this.fb.group({
      precio_lista: null,
      id_vendedor: null,
      tipo_credito: null

    });

  }

  ngOnInit() {
  }

  guardarGenerales() {
    //console.log("guardar datos generales", this.tab_selected);
  }

  guardarDocumentos() {
    //console.log("guardar datos generales", this.tab_selected);
  }


  guardarInmueble() {
    //console.log("guardar datos generales", this.tab_selected);
  }


}

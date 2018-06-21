import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';

@Component({
  selector: 'app-editar-cliente-escrituracion-dialogo',
  templateUrl: './editar-cliente-escrituracion-dialogo.component.html',
  styleUrls: ['./editar-cliente-escrituracion-dialogo.component.scss']
})
export class EditarClienteEscrituracionDialogoComponent implements OnInit {
  numbermask = createNumberMask({
    allowDecimal: true,
    prefix: '',
    decimalLimit: 2
  });

  public maskCURP = [/[A-Z0-9]/i, /[A-Z0-9]/i, /[A-Z0-9]/i, /[A-Z0-9]/i, '-', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, '-', /[A-Z]/i, '-', /[A-Z]/i, /[A-Z]/i, '-', /[A-Z0-9]/i, /[A-Z0-9]/i, /[A-Z0-9]/i, '-', /[A-Z0-9]/i, /[A-Z0-9]/i]
  public maskPhone = ['(', /\d/, /\d/, /\d/, ')', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]

  formGenerales: FormGroup;
  formDocumentos: FormGroup;
  formInmueble: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<EditarClienteEscrituracionDialogoComponent>,
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

}

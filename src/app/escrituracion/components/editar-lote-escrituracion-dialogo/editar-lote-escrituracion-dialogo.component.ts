import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatSnackBar } from '@angular/material';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import * as moment from 'moment';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import { SelectionModel } from '@angular/cdk/collections';
import { NuevoPagoEscrituracionDialogoComponent } from '../nuevo-pago-escrituracion-dialogo/nuevo-pago-escrituracion-dialogo.component';

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
  selectionCliente = new SelectionModel<any>(false);
  selectionCompra = new SelectionModel<any>(false);
  cliente_selected: any = null;  
  compra_selected: any = null;
  clientes: any = [{ nombre: "José Perez", manzana: "manzana1", lote: "lote 1" }];
  compras: any = [{ obra: "Tres Marias", manzana: "Manzana 1", lote: "lote 1" }];
 

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<EditarLoteEscrituracionDialogoComponent>,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.formGenerales = this.fb.group({
      id_estado: [null, Validators.required],
      fecha_apartado: [moment(""), Validators.required],
      fecha_checklist: [moment(""), Validators.required],
      fecha_infonavit: [moment(""), Validators.required],
      fecha_firma: [moment(""), Validators.required],
      fecha_entregado: [moment(""), Validators.required],
      nombre: [null, Validators.required],
      fecha_nacimiento: [moment(""), Validators.required],
      dtu: [moment(""), Validators.required],
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

    this.selectionCliente.toggle(cliente);
    if (this.selectionCliente.selected.length > 0) {
      this.cliente_selected = this.selectionCliente.selected[0];

    } else {
      this.cliente_selected = null;
    }

    console.log("cliente", this.cliente_selected);


  }

  selectCompra(compra) {

    //this.selection.isEmpty();
    //this.selection.hasValue();

    this.selectionCompra.toggle(compra);
    if (this.selectionCompra.selected.length > 0) {
      this.compra_selected = this.selectionCompra.selected[0];

    } else {
      this.compra_selected = null;
    }


  }

  nuevoPago() {
    let dialogRef = this.dialog.open(NuevoPagoEscrituracionDialogoComponent, {
      data: {
      },
      width: '500px',

    });
    dialogRef.afterClosed().subscribe(result => {

      if (result === true) {

        this.snackBar.open("Pago Agregado", "", {
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

  

  

  guardarGenerales() {

  }

  guardarDocumentos() {

  }



}

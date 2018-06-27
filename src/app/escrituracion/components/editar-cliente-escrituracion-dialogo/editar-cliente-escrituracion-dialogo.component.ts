import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import { ConfirmarBorradoDialogoComponent } from 'app/components/admin/confirmar-borrado-dialogo/confirmar-borrado-dialogo.component';
import { MatDialog } from '@angular/material';
import * as moment from 'moment';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-editar-cliente-escrituracion-dialogo',
  templateUrl: './editar-cliente-escrituracion-dialogo.component.html',
  styleUrls: ['./editar-cliente-escrituracion-dialogo.component.scss']
})
export class EditarClienteEscrituracionDialogoComponent implements OnInit {
  estados_selected: string;
  numbermask = createNumberMask({
    allowDecimal: true,
    prefix: '',
    decimalLimit: 2
  });

  tab_selected: string;

  public maskCURP = [/[A-Z0-9]/i, /[A-Z0-9]/i, /[A-Z0-9]/i, /[A-Z0-9]/i, '-', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, '-', /[A-Z]/i, '-', /[A-Z]/i, /[A-Z]/i, '-', /[A-Z0-9]/i, /[A-Z0-9]/i, /[A-Z0-9]/i, '-', /[A-Z0-9]/i, /[A-Z0-9]/i];
  public maskPhone = ['(', /\d/, /\d/, /\d/, ')', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

  formGenerales: FormGroup;
  formDocumentos: FormGroup;
  formInmueble: FormGroup;

  selection = new SelectionModel<any>(false);
  cliente_selected: any = null;
  clientes: any = [{ obra: "Tres marias", manzana: "manzana1", lote: "lote 1" }];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<EditarClienteEscrituracionDialogoComponent>,
    private fb: FormBuilder,
    private dialog: MatDialog,
  ) {
    this.formGenerales = this.fb.group({
      nombre: [null, Validators.required],
      fecha_nacimiento: [moment(), Validators.required],
      curp_cliente: [null, Validators.required],
      telefono_cliente: [null, Validators.required]
    });

    this.formDocumentos = this.fb.group({
      curp_documentos: "",
      ife_documentos: "",
      rfc_documentos: ""

    });

    this.formInmueble = this.fb.group({
      precio_lista: [null, Validators.required],
      id_vendedor: [null, Validators.required],
      tipo_credito: [null, Validators.required],
      estado: [null, Validators.required],
      dtu: [moment(), Validators.required],
      fecha_apartado: [moment(), Validators.required],
      fecha_documentos: [moment(), Validators.required],
      fecha_escriturado: [moment(), Validators.required],


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

  totalPagosRealizados() {
    let total = 0;

    if (this.cliente_selected.pagos) {
      this.cliente_selected.pagos.forEach(pago => {

        //total += +pago.monto;

        //personalización CIVSA, para otras empresas sumar todo independiente del tipo 
        /*     if (pago.tipo_pago != "Apartado" && pago.tipo_pago != "Avalúo") {
              total += +pago.monto;
            } */

        //solo sumamos los pagos con id_tipo_pago < 100
        if (pago.id_tipo_pago < 100) {
          total += +pago.monto;
        }

      });
    }
    return total;
  }

  delLote() {

    let dialogRef = this.dialog.open(ConfirmarBorradoDialogoComponent, {
      data: {
        title: "Eliminar Lote",
        content: `¿Desea eliminar el lote?`
      },
      width: "500px"
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
      }
    });

  }

  guardarGenerales() {
    console.log("guardar datos generales", this.tab_selected);
  }

  guardarDocumentos() {
    console.log("guardar datos generales", this.tab_selected);
  }


  guardarInmueble() {
    console.log("guardar datos generales", this.tab_selected);
  }


}

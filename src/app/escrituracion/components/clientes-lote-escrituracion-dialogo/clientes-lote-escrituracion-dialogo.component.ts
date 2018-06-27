import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { ReporteService } from 'app/services/reporte.service';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import * as moment from 'moment';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-clientes-lote-escrituracion-dialogo',
  templateUrl: './clientes-lote-escrituracion-dialogo.component.html',
  styleUrls: ['./clientes-lote-escrituracion-dialogo.component.scss']
})
export class ClientesLoteEscrituracionDialogoComponent implements OnInit {

  numbermask = createNumberMask({
    allowDecimal: true,
    prefix: '',
    decimalLimit: 2
  });

  public maskCURP = [/[A-Z0-9]/i, /[A-Z0-9]/i, /[A-Z0-9]/i, /[A-Z0-9]/i, '-', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, '-', /[A-Z]/i, '-', /[A-Z]/i, /[A-Z]/i, '-', /[A-Z0-9]/i, /[A-Z0-9]/i, /[A-Z0-9]/i, '-', /[A-Z0-9]/i, /[A-Z0-9]/i];
  public maskPhone = ['(', /\d/, /\d/, /\d/, ')', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

  cliente_selected: any = { pagos: [] };
  formGenerales: FormGroup;
  formDocumentos: FormGroup;
  estados_selected: string;

  //selector de clientes
  selection = new SelectionModel<any>(false);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ClientesLoteEscrituracionDialogoComponent>,
    private reporteSrv: ReporteService,
    private fb: FormBuilder
  ) {
    this.formGenerales = this.fb.group({
      fecha_apartado: [moment(), Validators.required],
      fecha_documentos: [moment(), Validators.required],
      fecha_escriturado: [moment(), Validators.required],
      nombre: [null, Validators.required],
      fecha_nacimiento: [moment(), Validators.required],
      curp: [null, Validators.required],
      telefono: [null, Validators.required],
      precio_venta: [null, Validators.required],
      id_vendedor: [null, Validators.required],
      id_tipo_credito: [null, Validators.required],
      id_estado: [null, Validators.required],
      dtu: [moment(), Validators.required],
    });
    this.formDocumentos = this.fb.group({
      curp: null,
      ife: null,
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
      this.cliente_selected = {};
    }

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

  saldoPendiente() {

    let pendiente = 0;

    if (this.cliente_selected.valor_operacion) {

      pendiente = +this.cliente_selected.valor_operacion - this.totalPagosRealizados();

    }
    return pendiente;

  }

  reporteCliente(cliente) {

    let url = this.reporteSrv.getUrlReporteCompra(cliente.id_cliente, cliente.id_lote, cliente.id_compra);
    let link = document.createElement("a");
    link.href = url;
    link.target = "_blank";
    link.click();

  }

}

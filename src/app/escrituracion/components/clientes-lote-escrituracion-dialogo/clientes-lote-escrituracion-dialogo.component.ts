import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog, MatSnackBar } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { ReporteService } from 'app/services/reporte.service';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import * as moment from 'moment';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { NuevoPagoDialogoComponent } from '../../../components/ventas/nuevo-pago-dialogo/nuevo-pago-dialogo.component';
import { EditarPagoDialogoComponent } from '../../../components/ventas/editar-pago-dialogo/editar-pago-dialogo.component';
import { UploadFileDialogoComponent } from '../../../components/ventas/upload-file-dialogo/upload-file-dialogo.component';
import { ConfirmarBorradoDialogoComponent } from '../../../components/admin/confirmar-borrado-dialogo/confirmar-borrado-dialogo.component';

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

  cliente_selected: any = null;
  formGenerales: FormGroup;
  formDocumentos: FormGroup;
  estados_selected: string;
  tipos: any;
  formas: any

  //selector de clientes
  selection = new SelectionModel<any>(false);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ClientesLoteEscrituracionDialogoComponent>,
    private reporteSrv: ReporteService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.formGenerales = this.fb.group({
      fecha_apartado: [moment(""), Validators.required],
      fecha_checklist: [moment(""), Validators.required],
      fecha_infonavit: [moment(""), Validators.required],
      fecha_firma: [moment(""), Validators.required],
      fecha_entregado: [moment(""), Validators.required],

      nombre: [null, Validators.required],
      fecha_nacimiento: [moment(""), Validators.required],
      curp: [null, Validators.required],
      telefono: [null, Validators.required],
      precio_venta: [null, Validators.required],
      id_vendedor: [null, Validators.required],
      id_tipo_credito: [null, Validators.required],
      id_estado: [null, Validators.required],
      dtu: [moment(""), Validators.required],
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
      this.formGenerales.patchValue(cliente);

    } else {
      this.cliente_selected = {};
    }

  }

  sumaPagos() {
    let suma = 0;

    this.cliente_selected.pagos.forEach(pago => {
      suma += +pago.monto;
    });

    return suma;
  }

  saldoPendiente() {

    let pendiente = 0;

    if (this.cliente_selected.valor_operacion) {

      pendiente = +this.cliente_selected.valor_operacion - this.sumaPagos();

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

  nuevoPago() {
    let dialogRef = this.dialog.open(NuevoPagoDialogoComponent, {
      width: '400px',
      data: {
      },
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

  editarPago(pago) {    

    let dialogRef = this.dialog.open(EditarPagoDialogoComponent, {
      width: '500px',
      data: {
        pago: pago
      },
    });
    dialogRef.afterClosed().subscribe(result => {

      if (result === true) {

        this.snackBar.open("Pago Actualizado", "", {
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

  cargarFicha() {

    let dialogRef = this.dialog.open(UploadFileDialogoComponent, {
      data: {
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        this.snackBar.open("Documento Agregado", "", {
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

  delPago(pago) {
    let dialogRef = this.dialog.open(ConfirmarBorradoDialogoComponent, {
      data: {
        title: "Eliminar Pago",
        content: `¿Desea eliminar el pago del ${pago.fecha_pago}?`
      },
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {

    })
  }

}

import { Component, OnInit } from '@angular/core';
import { Cliente } from "app/model/cliente";
import { MatDialog, MatSnackBar, MatTabChangeEvent } from "@angular/material";
import { AgregarDocumentoDialogoComponent } from "app/components/ventas/agregar-documento-dialogo/agregar-documento-dialogo.component";
import { ActivatedRoute, Router, ParamMap } from "@angular/router";
import "rxjs/add/operator/switchMap";
import { ClientesService } from "app/services/clientes.service";
import { NuevaCompraDialogoComponent } from 'app/components/ventas/nueva-compra-dialogo/nueva-compra-dialogo.component';
import { NuevoPagoDialogoComponent } from 'app/components/ventas/nuevo-pago-dialogo/nuevo-pago-dialogo.component';
import { EditarPagoDialogoComponent } from 'app/components/ventas/editar-pago-dialogo/editar-pago-dialogo.component';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import { Pago } from 'app/model/pago';
import { EditarDocumentoDialogoComponent } from 'app/components/ventas/editar-documento-dialogo/editar-documento-dialogo.component';
import { ConfirmarBorradoDialogoComponent } from 'app/components/admin/confirmar-borrado-dialogo/confirmar-borrado-dialogo.component';
import { FormGroup, FormControl, FormArray, Validators, FormBuilder } from '@angular/forms';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.scss']
})
export class EditarClienteComponent implements OnInit {

  numbermask = createNumberMask({
    allowDecimal: true,
    prefix: '',
    decimalLimit: 2
  });

  public maskRFC = [/[A-Z0-9]/i, /[A-Z0-9]/i, /[A-Z0-9]/i, /[A-Z0-9]/i, '-', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, '-', /[A-Z0-9]/i, /[A-Z0-9]/i, /[A-Z0-9]/i,]
  public maskCURP = [/[A-Z0-9]/i, /[A-Z0-9]/i, /[A-Z0-9]/i, /[A-Z0-9]/i, '-', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, '-', /[A-Z]/i, '-', /[A-Z]/i, /[A-Z]/i, '-', /[A-Z0-9]/i, /[A-Z0-9]/i, /[A-Z0-9]/i, '-', /[A-Z0-9]/i, /[A-Z0-9]/i]
  public maskCP = [/\d/, /\d/, /\d/, /\d/, /\d/]
  public maskPhone = ['(', /\d/, /\d/, /\d/, ')', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
  public maskRFCM = [/[A-Z0-9]/i, /[A-Z0-9]/i, /[A-Z0-9]/i, '-', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, '-', /[A-Z0-9]/i, /[A-Z0-9]/i, /[A-Z0-9]/i,]

  //las propiedades del cliente
  cliente: Cliente = new Cliente();
  compras: any[] = [];
  documentos_cliente: any[] = [];
  documentos_conyuge: any[] = [];


  //catalogos para los selects
  //mediante resolvers
  obras: any[] = [];
  formas_pago: any[] = [];
  instituciones_credito: any[] = [];
  tipos_operacion: any[] = [];
  tipos_pago: any[] = [];
  estados: any[] = [];

  //selector de compras
  selection = new SelectionModel<any>(false);

  //la tab seleccionada inicialmente
  tab_selected: string = "Cliente";

  compra_selected: any = {};

  formAlerta: FormGroup;

  constructor(
    private clienteSrv: ClientesService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private fb: FormBuilder,
  ) {

    this.formAlerta = this.fb.group({
      mensaje_alerta: "",
      alerta_activada: ""
    });

  }

  ngOnInit() {
    /* this.cliente = new Cliente();
    this.cliente.persona_moral = "0"; */

    this.route.data
      .subscribe((data: { obras: any[], formas_pago: any[], instituciones_credito: any[], tipos_operacion: any[], tipos_pago: any[], estados: any[] }) => {
        //console.log("resultado resolve ", data);
        this.obras = data.obras;
        this.formas_pago = data.formas_pago;
        this.instituciones_credito = data.instituciones_credito;
        this.tipos_operacion = data.tipos_operacion;
        this.tipos_pago = data.tipos_pago;
        this.estados = data.estados;
      });


    let id = this.route.snapshot.paramMap.get('id');


    this.clienteSrv.getClienteConComprasYDocumentos(id)
      .subscribe(response => {
        this.cliente = response.cliente;
        this.compras = response.compras;
        this.documentos_cliente = response.documentos_cliente;
        this.documentos_conyuge = response.documentos_conyuge;

        this.setFormAlertaValue(this.cliente);

      });

  }

  setFormAlertaValue(cliente) {
    this.formAlerta.get("mensaje_alerta").setValue(cliente.mensaje_alerta);
    this.formAlerta.get("alerta_activada").setValue(cliente.alerta_activada == "1" ? true : false);
  }


  selectCompra(compra) {

    //this.selection.isEmpty();
    //this.selection.hasValue();

    this.selection.toggle(compra);
    if (this.selection.selected.length > 0) {
      this.compra_selected = this.selection.selected[0];

    } else {
      this.compra_selected = {};
    }

  }



  showSelection() {
    console.log(this.selection.selected);

  }

  guardarGenerales() {
    console.log("guardar datos generales", this.tab_selected);

  }

  guardarLaborales() {
    console.log("guardar datos laborales", this.tab_selected);

  }

  guardarApoderado() {
    console.log("guardar datos apoderado", this.tab_selected);

  }

  guardarConyuge() {
    console.log("guardar datos conyuge", this.tab_selected);

  }

  guardarInmueble() {
    console.log("guardar datos inmueble", this.tab_selected);

  }

  guardarAlerta() {
    console.log("guardar datos alerta", this.tab_selected);
    console.log("mensaje alerta", this.formAlerta.value);

    this.clienteSrv.updateCliente(this.cliente.id_cliente, this.formAlerta.value)
      .subscribe(cliente => {
        this.cliente = cliente;
        this.setFormAlertaValue(this.cliente);
      }, (error) => {

      });

  }

  onTabChange(event: MatTabChangeEvent) {
    //console.log("tabChange", event.tab.textLabel, event.tab);
    this.tab_selected = event.tab.textLabel;

  }


  agregarDocumento() {

    console.log();
    let dialogRef = this.dialog.open(AgregarDocumentoDialogoComponent, {
      data: {
      }
    });
    dialogRef.afterClosed().subscribe(result => {

    });
  }

  updateCliente() {
    this.clienteSrv.updateCliente(this.cliente.id_cliente, this.cliente)
      .subscribe(res => {
        this.cliente = res;
        this.snackBar.open("Cliente Actualizado", "Cerrar", {
          duration: 2000
        });

      });

  }

  nuevaCompra() {
    console.log();
    let dialogRef = this.dialog.open(NuevaCompraDialogoComponent, {
      width: '400px',
      data: {
        obras: this.obras
      }
    });
    dialogRef.afterClosed().subscribe(result => {

    });
  }

  nuevoPago() {
    console.log();
    let dialogRef = this.dialog.open(NuevoPagoDialogoComponent, {
      width: '400px',
      data: {
        tipos: this.tipos_pago,
        formas: this.formas_pago
      },
    });
    dialogRef.afterClosed().subscribe(result => {

    });

  }

  editarPago(pago) {

    let dialogRef = this.dialog.open(EditarPagoDialogoComponent, {
      width: '400px',
      data: {
        pago: pago,
        tipos: this.tipos_pago,
        formas: this.formas_pago
      },
    });
    dialogRef.afterClosed().subscribe(result => {
     
    });

  }

  editarDocumento(doc) {

    let dialogRef = this.dialog.open(EditarDocumentoDialogoComponent, {
      data: {
        doc: doc
      },
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }

  delDocumento(doc) {

    let dialogRef = this.dialog.open(ConfirmarBorradoDialogoComponent, {
      data: {
        title: "Eliminar Documento",
        content: `¿Desea eliminar el documento: ${doc.nombre}?`
      }
    });

    dialogRef.afterClosed().subscribe(result => {



    });

  }

  delLote(compra) {

    let dialogRef = this.dialog.open(ConfirmarBorradoDialogoComponent, {
      data: {
        title: "Eliminar Lote",
        content: `¿Desea eliminar el ${compra.lote}?`
      }
    });

    dialogRef.afterClosed().subscribe(result => {



    });

  }

  delPagos(compra) {

    let dialogRef = this.dialog.open(ConfirmarBorradoDialogoComponent, {
      data: {
        title: "Eliminar Pago",
        content: `¿Desea eliminar el pagos del ${compra.lote}?`
      }
    });

    dialogRef.afterClosed().subscribe(result => {



    });

  }

  delPago(pago) {

    let dialogRef = this.dialog.open(ConfirmarBorradoDialogoComponent, {
      data: {
        title: "Eliminar Pago",
        content: `¿Desea eliminar el pago del ${pago.fecha_pago}?`
      }
    });

    dialogRef.afterClosed().subscribe(result => {



    });

  }

  irLote(compra) {
    this.router.navigate(["/ventas/lote", compra.id_lote]);
  }



  onFechaChange() {

  }

  totalPagosRealizados() {
    let total = 0;

    if (this.compra_selected.pagos) {
      this.compra_selected.pagos.forEach(pago => {
        total += +pago.monto;

      });
    }
    return total;
  }

  saldoPendiente() {

    let pendiente = 0;

    if (this.compra_selected.valor_operacion) {
      let valor_operacion = Number(this.compra_selected.valor_operacion.replace(/,/g, ""));

      pendiente = valor_operacion - this.totalPagosRealizados();

    }
    return pendiente;

  }

  createFormCompra() {

    let formCompra: FormGroup;

    formCompra = this.fb.group({

      proyecto: "",
      desarrollador: "",
      valor_operacion: "",
      ubicacion: "",
      cp: "",
      id_tipo_operacion: "",
      id_institucion_credito: "",
      banco_credito: "",
      otra_credito: "",
      asesor_inmobiliario: "",
      id_asesor: "",
      notas_escrituracion: "",
      notas_cancelacion: "",
      comentarios_entrega_fisica: "",
      fecha_firma_contrato: "",
      fehca_entrega: "",
      fecha_entrega_fisica: ""

    });




  }


}

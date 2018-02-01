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
  formGenerales: FormGroup;
  formLaborales: FormGroup;
  formConyuge: FormGroup;
  formApoderado: FormGroup;
  formInmueble: FormGroup;

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
      alerta_activada: "",
    });

    this.formGenerales = this.fb.group({
      persona_moral: "",
      nombre_persona_fisica: "",
      nacionalidad_persona_fisica: "",
      lugar_nacimiento_persona_fisica: "",
      fecha_nacimiento_persona_fisica: "",
      pais_nacimiento_persona_fisica: "",
      lugar_residencia_persona_fisica: "",
      domicilio_persona_fisica: "",
      cp_persona_fisica: "",
      ciudad_persona_fisica: "",
      telefono_persona_fisica: "",
      celular_persona_fisica: "",
      email_persona_fisica: "",
      identificacion_oficial_persona_fisica: "",
      num_identificacion_persona_fisica: "",
      rfc_persona_fisica: "",
      curp_persona_fisica: "",
      estado_civil_persona_fisica: "",
      regimen_conyugal_persona_fisica: "",
      df_calle_persona_fisica: "",
      df_num_exterior_persona_fisica: "",
      df_num_interior_persona_fisica: "",
      df_colonia_persona_fisica: "",
      df_cp_persona_fisica: "",
      df_localidad_persona_fisica: "",
      df_municipio_persona_fisica: "",
      df_estado_persona_fisica: "",

      razon_social_persona_moral: "",
      nacionalidad_persona_moral: "",
      fecha_constitucion_persona_moral: "",
      actividad_persona_moral: "",
      telefono_persona_moral: "",
      email_persona_moral: "",
      rfc_persona_moral: "",
      apoderado_legal_persona_moral: "",
      instrumento_publico_persona_moral: "",
      poderes_representante_persona_moral: "",
      df_calle_persona_moral: "",
      df_num_exterior_persona_moral: "",
      df_num_interior_persona_moral: "",
      df_colonia_persona_moral: "",
      df_cp_persona_moral: "",
      df_localidad_persona_moral: "",
      df_municipio_persona_moral: "",
      df_estado_persona_moral: "",
    });

    this.formLaborales = this.fb.group({
      profesion_laboral: "",
      ocupacion_laboral: "",
      empresa_laboral: "",
      puesto_laboral: "",
      jefe_inmediato_laboral: "",
      giro_empresa_laboral: "",
      domicilio_empresa_laboral: "",
      cp_laboral: "",
      ciudad_laboral: "",
      telefono_laboral: "",
    });

    this.formConyuge = this.fb.group({
      nombre_conyuge: "",
      nacionalidad_conyuge: "",
      lugar_nacimiento_conyuge: "",
      fecha_nacimiento_conyuge: "",
      pais_nacimiento_conyuge: "",
      lugar_residencia_conyuge: "",
      domicilio_conyuge: "",
      cp_conyuge: "",
      ciudad_conyuge: "",
      telefono_conyuge: "",
      celular_conyuge: "",
      email_conyuge: "",
      identificacion_oficial_conyuge: "",
      rfc_conyuge: "",
      curp_conyuge: "",
      df_calle_conyuge: "",
      df_num_exterior_conyuge: "",
      df_num_interior_conyuge: "",
      df_colonia_conyuge: "",
      df_cp_conyuge: "",
      df_localidad_conyuge: "",
      df_municipio_conyuge: "",
      df_estado_conyuge: "",
    });
    this.formApoderado = this.fb.group({
      nombre_apoderado: "",
      nacionalidad_apoderado: "",
      lugar_nacimiento_apoderado: "",
      fecha_nacimiento_apoderado: "",
      pais_nacimiento_apoderado: "",
      lugar_residencia_apoderado: "",
      domicilio_apoderado: "",
      cp_apoderado: "",
      ciudad_apoderado: "",
      telefono_apoderado: "",
      celular_apoderado: "",
      email_apoderado: "",
      identificacion_oficial_apoderado: "",
      num_identificacion_apoderado: "",
      rfc_apoderado: "",
      curp_apoderado: "",
    });

    this.formInmueble = this.fb.group({
      proyecto: "",
      desarrollador: "",
      valor_operacion: "",
      ubicacion: "",
      cp: "",
      id_tipo_operacion: "",
      id_institucion_credito: "",
      banco_credito: "",
      otra_credito: "",
      fecha_firma_contrato: "",
      fecha_entrega: "",
      asesor_inmobiliario: "",
      id_asesor: "",
      notas_escrituracion: "",
      notas_cancelacion: "",
      fecha_entrega_fisica: "",
      comentarios_entrega_fisica: "",
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
        this.formGenerales.patchValue(this.cliente);
        this.formLaborales.patchValue(this.cliente);
        this.formConyuge.patchValue(this.cliente);
        this.formApoderado.patchValue(this.cliente);
        this.formInmueble.patchValue(this.cliente);

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

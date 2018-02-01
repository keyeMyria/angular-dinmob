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

  loading: boolean;

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
      mensaje_alerta: null,
      alerta_activada: null,
    });

    this.formGenerales = this.fb.group({
      //persona fisica
      persona_moral: [null, Validators.required],
      nombre: [null, Validators.required],
      nacionalidad_persona_fisica: null,
      lugar_nacimiento_persona_fisica: null,
      fecha_nacimiento_persona_fisica: null,
      pais_nacimiento_persona_fisica: null,
      lugar_residencia_persona_fisica: null,
      domicilio_persona_fisica: null,
      cp_persona_fisica: null,
      ciudad_persona_fisica: null,
      telefono_persona_fisica: null,
      celular_persona_fisica: null,
      email_persona_fisica: null,
      identificacion_oficial_persona_fisica: null,
      num_identificacion_persona_fisica: null,
      rfc_persona_fisica: null,
      curp_persona_fisica: null,
      estado_civil_persona_fisica: null,
      regimen_conyugal_persona_fisica: null,
      df_calle_persona_fisica: null,
      df_num_exterior_persona_fisica: null,
      df_num_interior_persona_fisica: null,
      df_colonia_persona_fisica: null,
      df_cp_persona_fisica: null,
      df_localidad_persona_fisica: null,
      df_municipio_persona_fisica: null,
      df_estado_persona_fisica: null,

      //persona moral
      nacionalidad_persona_moral: null,
      fecha_constitucion_persona_moral: null,
      actividad_persona_moral: null,
      telefono_persona_moral: null,
      email_persona_moral: null,
      rfc_persona_moral: null,
      apoderado_legal_persona_moral: null,
      instrumento_publico_persona_moral: null,
      poderes_representante_persona_moral: null,
      df_calle_persona_moral: null,
      df_num_exterior_persona_moral: null,
      df_num_interior_persona_moral: null,
      df_colonia_persona_moral: null,
      df_cp_persona_moral: null,
      df_localidad_persona_moral: null,
      df_municipio_persona_moral: null,
      df_estado_persona_moral: null,
    });

    this.formLaborales = this.fb.group({
      profesion_laboral: null,
      ocupacion_laboral: null,
      empresa_laboral: null,
      puesto_laboral: null,
      jefe_inmediato_laboral: null,
      giro_empresa_laboral: null,
      domicilio_empresa_laboral: null,
      cp_laboral: null,
      ciudad_laboral: null,
      telefono_laboral: null,
    });

    this.formConyuge = this.fb.group({
      nombre_conyuge: null,
      nacionalidad_conyuge: null,
      lugar_nacimiento_conyuge: null,
      fecha_nacimiento_conyuge: null,
      pais_nacimiento_conyuge: null,
      lugar_residencia_conyuge: null,
      domicilio_conyuge: null,
      cp_conyuge: null,
      ciudad_conyuge: null,
      telefono_conyuge: null,
      celular_conyuge: null,
      email_conyuge: null,
      identificacion_oficial_conyuge: null,
      rfc_conyuge: null,
      curp_conyuge: null,
      df_calle_conyuge: null,
      df_num_exterior_conyuge: null,
      df_num_interior_conyuge: null,
      df_colonia_conyuge: null,
      df_cp_conyuge: null,
      df_localidad_conyuge: null,
      df_municipio_conyuge: null,
      df_estado_conyuge: null,
    });

    this.formApoderado = this.fb.group({
      nombre_apoderado: null,
      nacionalidad_apoderado: null,
      lugar_nacimiento_apoderado: null,
      fecha_nacimiento_apoderado: null,
      pais_nacimiento_apoderado: null,
      lugar_residencia_apoderado: null,
      domicilio_apoderado: null,
      cp_apoderado: null,
      ciudad_apoderado: null,
      telefono_apoderado: null,
      celular_apoderado: null,
      email_apoderado: null,
      identificacion_oficial_apoderado: null,
      num_identificacion_apoderado: null,
      rfc_apoderado: null,
      curp_apoderado: null,
    });

    this.formInmueble = this.fb.group({
      proyecto: null,
      desarrollador: null,
      valor_operacion: null,
      ubicacion: null,
      cp: null,
      id_tipo_operacion: null,
      id_institucion_credito: null,
      banco_credito: null,
      otra_credito: null,
      fecha_firma_contrato: null,
      fecha_entrega: null,
      asesor_inmobiliario: null,
      id_asesor: null,
      notas_escrituracion: null,
      notas_cancelacion: null,
      fecha_entrega_fisica: null,
      comentarios_entrega_fisica: null,
    });

  }

  ngOnInit() {

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

        this.setFormsValue(this.cliente);

      });

  }

  setFormsValue(cliente) {
    this.formAlerta.get("mensaje_alerta").setValue(cliente.mensaje_alerta);
    this.formAlerta.get("alerta_activada").setValue(cliente.alerta_activada == "1" ? true : false);

    this.formGenerales.patchValue(this.cliente);
    this.formLaborales.patchValue(this.cliente);
    this.formConyuge.patchValue(this.cliente);
    this.formApoderado.patchValue(this.cliente);
    this.formInmueble.patchValue(this.cliente);


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
    console.log(this.formGenerales.value);
    this.updateCliente(this.formGenerales.value);


  }

  guardarLaborales() {
    console.log("guardar datos laborales", this.tab_selected);
    console.log(this.formLaborales.value);
    this.updateCliente(this.formLaborales.value);

  }

  guardarApoderado() {
    console.log("guardar datos apoderado", this.tab_selected);
    console.log(this.formApoderado.value);
    this.updateCliente(this.formApoderado.value);

  }

  guardarConyuge() {
    console.log("guardar datos conyuge", this.tab_selected);
    console.log(this.formConyuge.value);
    this.updateCliente(this.formConyuge.value);

  }

  guardarInmueble() {
    console.log("guardar datos inmueble", this.tab_selected);
    console.log(this.formInmueble.value);

  }

  guardarAlerta() {
    console.log("guardar datos alerta", this.tab_selected);
    console.log("mensaje alerta", this.formAlerta.value);

    this.updateCliente(this.formAlerta.value);

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

  updateCliente(cliente) {
    this.loading = true;
    this.clienteSrv.updateCliente(this.cliente.id_cliente, cliente)
      .subscribe(res => {

        this.cliente = res;
        //asignamos todos los formularios
        this.setFormsValue(this.cliente);
        this.loading = false;
        this.snackBar.open("Cliente Actualizado", "", {
          duration: 2000
        });

      }, (error) => {
        this.snackBar.open("Ha ocurrido un error. Inténtelo más tarde", "", {
          duration: 3000
        });
      });

  }

  nuevaCompra() {
    console.log();
    let dialogRef = this.dialog.open(NuevaCompraDialogoComponent, {
      width: '400px',
      data: {
        obras: this.obras,
        compras: this.compras,
        id_cliente: this.cliente.id_cliente
      }
    });
    dialogRef.afterClosed().subscribe(result => {

      if (result===true) {
        this.snackBar.open("Cliente Actualizado", "", {
          duration: 2000
        });

      } else {
        //console.log("error",result);
        
        this.snackBar.open(result.error, "", {
          duration: 3000
        });
      }

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

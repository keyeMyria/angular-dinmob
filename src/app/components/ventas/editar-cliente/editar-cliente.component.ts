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
import { VentasPagosService } from 'app/services/ventas-pagos.service';
import { UploadFileDialogoComponent } from 'app/components/ventas/upload-file-dialogo/upload-file-dialogo.component';
import { ReporteService } from 'app/services/reporte.service';
import { LotesService } from 'app/services/lotes.service';
import { AlertaDialogoComponent } from '../../admin/alerta-dialogo/alerta-dialogo.component';

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

  public maskRFC = [/[A-Z0-9]/i, /[A-Z0-9]/i, /[A-Z0-9]/i, /[A-Z0-9]/i, '-', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, '-', /[A-Z0-9]/i, /[A-Z0-9]/i, /[A-Z0-9]/i];
  public maskCURP = [/[A-Z0-9]/i, /[A-Z0-9]/i, /[A-Z0-9]/i, /[A-Z0-9]/i, '-', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, '-', /[A-Z]/i, '-', /[A-Z]/i, /[A-Z]/i, '-', /[A-Z0-9]/i, /[A-Z0-9]/i, /[A-Z0-9]/i, '-', /[A-Z0-9]/i, /[A-Z0-9]/i];
  public maskCP = [/\d/, /\d/, /\d/, /\d/, /\d/];
  public maskPhone = ['(', /\d/, /\d/, /\d/, ')', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  public maskRFCM = [/[A-Z0-9]/i, /[A-Z0-9]/i, /[A-Z0-9]/i, '-', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, '-', /[A-Z0-9]/i, /[A-Z0-9]/i, /[A-Z0-9]/i];

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
  asesores: any = [];
  vendedores: any = [];

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
  formLote: FormGroup;

  constructor(
    private clienteSrv: ClientesService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private fb: FormBuilder,
    private pagoSrv: VentasPagosService,
    private reporteSrv: ReporteService,
    private loteSrv: LotesService
  ) {
    this.formAlerta = this.fb.group({
      mensaje_alerta: null,
      alerta_activada: null,
    });

    this.formGenerales = this.fb.group({
      //persona fisica
      persona_moral: ["0", Validators.required],
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
      valor_escrituracion: null,
      ubicacion: null,
      cp: null,
      id_tipo_operacion: "",
      id_institucion_credito: "",
      banco_credito: null,
      otra_credito: null,
      fecha_firma_contrato: null,
      fecha_entrega: null,
      asesor_inmobiliario: null,
      id_asesor: null,
      id_vendedor: null,
      notas_escrituracion: null,
      notas_cancelacion: null,
      fecha_entrega_fisica: null,
      comentarios_entrega_fisica: null,
      expediente_completo: null
    });

    this.formLote = this.fb.group({
      id_estado_venta: null,
      valor_base: null,
      fecha_cambio_estado: null,
    });

  }

  ngOnInit() {
    /* vendedores:any */
    this.route.data
      .subscribe((data: { obras: any[], formas_pago: any[], instituciones_credito: any[], tipos_operacion: any[], tipos_pago: any[], estados: any[], asesores: any }) => {
        //console.log("resultado resolve ", data);
        this.obras = data.obras;
        this.formas_pago = data.formas_pago;
        this.instituciones_credito = data.instituciones_credito;
        this.tipos_operacion = data.tipos_operacion;
        this.tipos_pago = data.tipos_pago;
        this.estados = data.estados;
        this.asesores = data.asesores;
        //this.vendedores=data.vendedores;
      });


    let id = this.route.snapshot.paramMap.get('id');

    // la compra contiene los vendedores
    // porque cada obra tiene sus propios vendedores
    // entonces si las compras son de distintas obras
    // no sabríamos cuales traer
    this.clienteSrv.getClienteConComprasYDocumentos(id)
      .subscribe((response: any) => {
        this.cliente = response.cliente;
        this.compras = response.compras;
        this.documentos_cliente = response.documentos_cliente;
        this.documentos_conyuge = response.documentos_conyuge;

        this.setFormsValue(this.cliente);

      }, (error) => {
        this.snackBar.open("Ha ocurrido un error de conexión. Inténtelo más tarde", "", {
          duration: 3000
        });

      });

  }

  //relleno todos los formularios despues de leer el cliente
  setFormsValue(cliente) {
    this.formAlerta.get("mensaje_alerta").setValue(cliente.mensaje_alerta);
    this.formAlerta.get("alerta_activada").setValue(cliente.alerta_activada == "1" ? true : false);

    this.formGenerales.patchValue(this.cliente);
    this.formLaborales.patchValue(this.cliente);
    this.formConyuge.patchValue(this.cliente);
    this.formApoderado.patchValue(this.cliente);



  }

  //selecciona la compra seleccionada
  selectCompra(compra) {


    this.selection.toggle(compra);
    if (this.selection.selected.length > 0) {
      this.compra_selected = this.selection.selected[0];

      this.formInmueble.patchValue(this.compra_selected);
      this.formInmueble.get("expediente_completo").setValue(this.compra_selected.expediente_completo == "1" ? true : false);
      //console.log("expediente_completo", this.compra_selected.expediente_completo, this.formInmueble.get("expediente_completo"));

      this.formLote.patchValue(this.compra_selected);

    } else {
      this.compra_selected = {};
      this.formInmueble.reset();
      this.formLote.reset();
    }

  }

  //debug
  showSelection() {
    console.log(this.selection.selected);

  }

  //guarda el formulario
  guardarGenerales() {
    //console.log("guardar datos generales", this.tab_selected);
    //console.log(this.formGenerales.value);
    this.updateCliente(this.formGenerales.value);
  }

  //guarda el formulario
  guardarLaborales() {
    //console.log("guardar datos laborales", this.tab_selected);
    //console.log(this.formLaborales.value);
    this.updateCliente(this.formLaborales.value);

  }

  //guarda el formulario
  guardarApoderado() {
    //console.log("guardar datos apoderado", this.tab_selected);
    //console.log(this.formApoderado.value);
    this.updateCliente(this.formApoderado.value);

  }

  //guarda el formulario
  guardarConyuge() {
    //console.log("guardar datos conyuge", this.tab_selected);
    //console.log(this.formConyuge.value);
    this.updateCliente(this.formConyuge.value);

  }

  //clona un objeto
  private clonar(objeto): any {

    let strObject = JSON.stringify(objeto);
    return JSON.parse(strObject);

  }

  //guarda el formulario
  guardarInmueble() {
    //console.log("guardar datos inmueble", this.tab_selected);
    //console.log(this.formInmueble.value);

    let compra = this.clonar(this.formInmueble.value);
    if (compra.valor_operacion !== null) {
      compra.valor_operacion = compra.valor_operacion.replace(/,/g, "");
    }
    if (compra.valor_escrituracion !== null) {
      compra.valor_escrituracion = compra.valor_escrituracion.replace(/,/g, "");
    }

    this.clienteSrv.updateCompra(this.compra_selected.id_compra, compra)
      .subscribe((compra: any) => {
        let i = this.compras.indexOf(this.compra_selected);
        this.compras[i] = compra;

        this.selection.select(this.compras[i]);
        this.compra_selected = this.selection.selected[0];
        this.formInmueble.patchValue(this.compra_selected);
        this.formInmueble.get("expediente_completo").setValue(this.compra_selected.expediente_completo == "1" ? true : false);
        this.formLote.patchValue(this.compra_selected);


        this.snackBar.open("Compra Actualizada", "", {
          duration: 2000,
          panelClass: ["bg-success", "text-white"]
        });
      }, (error) => {
        this.snackBar.open("Ha ocurrido un error de conexión. Inténtelo más tarde", "", {
          duration: 3000,
          panelClass: ["bg-danger", "text-white"]
        });
      });

  }


  //guarda el formulario
  guardarLote() {
    //console.log("guardar datos inmueble", this.tab_selected);
    //console.log(this.formInmueble.value);

    let lote = this.clonar(this.formLote.value);
    if (lote.valor_base !== null) {
      lote.valor_base = lote.valor_base.replace(/,/g, "");
    }

    this.loteSrv.updateLote(this.compra_selected.id_lote, lote)
      .subscribe((lote: any) => {

        this.compra_selected.valor_base = lote.valor_base;
        this.compra_selected.id_estado_venta = lote.id_estado_venta;
        this.compra_selected.fecha_cambio_estado = lote.fecha_cambio_estado;
        this.formLote.patchValue(lote);


        this.snackBar.open("Lote Actualizado", "", {
          duration: 2000,
          panelClass: ["bg-success", "text-white"]
        });
      }, (error) => {
        this.snackBar.open("Ha ocurrido un error de conexión. Inténtelo más tarde", "", {
          duration: 3000,
          panelClass: ["bg-danger", "text-white"]
        });
      });

  }


  //guarda el formulario
  guardarAlerta() {
    //console.log("guardar datos alerta", this.tab_selected);
    //console.log("mensaje alerta", this.formAlerta.value);

    this.updateCliente(this.formAlerta.value);

  }

  //guardamos el nombre de la tab seleccionada cuando ocurre el evento tabChange de tab group
  onTabChange(event: MatTabChangeEvent) {
    //console.log("tabChange", event.tab.textLabel, event.tab);
    this.tab_selected = event.tab.textLabel;

  }

  //agregamos documentos al cliente o conyuge
  agregarDocumento(es_de_conyuge) {

    //console.log("agregar documento", es_de_conyuge);

    let dialogRef = this.dialog.open(AgregarDocumentoDialogoComponent, {
      data: {
        cliente: this.cliente,
        conyuge: es_de_conyuge,
        documentos: es_de_conyuge == 1 ? this.documentos_conyuge : this.documentos_cliente
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


  //permite subir una comprobante del pago
  cargarFicha(pago) {

    let dialogRef = this.dialog.open(UploadFileDialogoComponent, {
      data: {
        pago: pago
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

  //actualiza el cliente
  updateCliente(cliente) {
    this.clienteSrv.updateCliente(this.cliente.id_cliente, cliente)
      .subscribe((res: any) => {

        this.cliente = res;
        //asignamos todos los formularios
        this.setFormsValue(this.cliente);
        this.snackBar.open("Cliente Actualizado", "", {
          duration: 2000,
          panelClass: ["bg-success", "text-white"]
        });

      }, (error) => {
        this.snackBar.open("Ha ocurrido un error de conexión. Inténtelo más tarde", "", {
          duration: 3000,
          panelClass: ["bg-danger", "text-white"]
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

      if (result === true) {
        this.snackBar.open("Cliente Actualizado", "", {
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

  //agrega un pago a la compra asociada
  nuevoPago(compra) {
    let dialogRef = this.dialog.open(NuevoPagoDialogoComponent, {
      width: '400px',
      data: {
        tipos: this.tipos_pago,
        formas: this.formas_pago,
        compra: compra
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

  //edita las propiedades del pago 
  editarPago(pago, compra) {

    let dialogRef = this.dialog.open(EditarPagoDialogoComponent, {
      width: '400px',
      data: {
        pago: pago,
        compra: compra,
        tipos: this.tipos_pago,
        formas: this.formas_pago
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

  //edita el nombre del documento
  editarDocumento(doc, documentos) {

    let dialogRef = this.dialog.open(EditarDocumentoDialogoComponent, {
      data: {
        doc: doc,
        documentos: documentos
      },
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result == true) {

        this.snackBar.open("Documento Actualizado", "", {
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

  //elimina el documento
  delDocumento(doc, documentos) {

    let dialogRef = this.dialog.open(ConfirmarBorradoDialogoComponent, {
      data: {
        title: "Eliminar Documento",
        content: `¿Desea eliminar el documento: ${doc.nombre}?`
      }
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result == true) {
        this.clienteSrv.delDocumento(doc.id_documento)
          .subscribe((res: any) => {
            if (res.count == 1) {

              let i = documentos.indexOf(doc);
              documentos.splice(i, 1);

              this.snackBar.open("Documento Eliminado", "", {
                duration: 2000,
                panelClass: ["bg-success", "text-white"]
              });

            } else {

              this.snackBar.open("Ha ocurrido un error. Inténtelo más tarde", "", {
                duration: 3000,
                panelClass: ["bg-danger", "text-white"]
              });

            }
          }, (error) => {
            this.snackBar.open("Ha ocurrido un error de conexión. Inténtelo más tarde", "", {
              duration: 3000,
              panelClass: ["bg-danger", "text-white"]
            });
          })

      }

    });

  }


  //elimina un pago de la compra asociada
  delPago(pago, compra) {

    let dialogRef = this.dialog.open(ConfirmarBorradoDialogoComponent, {
      data: {
        title: "Eliminar Pago",
        content: `¿Desea eliminar el pago del ${pago.fecha_pago}?`
      }
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result === true) {

        this.pagoSrv.delPago(pago.id_pago)
          .subscribe((res: any) => {

            if (res.count == 1) {
              let i = compra.pagos.indexOf(pago);
              compra.pagos.splice(i, 1);

              this.snackBar.open("Pago Eliminado", "", {
                duration: 2000,
                panelClass: ["bg-success", "text-white"]
              });
            } else {
              this.snackBar.open("Ha ocurrido un error", "", {
                duration: 2000,
                panelClass: ["bg-danger", "text-white"]
              });
            }

          }, (error) => {
            this.snackBar.open("Ha ocurrido un error de conexión. Inténtelo más tarde", "", {
              duration: 3000,
              panelClass: ["bg-danger", "text-white"]
            });
          });



      }

    });

  }

  //navega hacia ventas lote
  irLote(compra) {
    this.router.navigate(["/ventas/lote", compra.id_lote]);
  }

  //sumatoria de pagos
  totalPagosRealizados() {
    let total = 0;

    if (this.compra_selected.pagos) {
      this.compra_selected.pagos.forEach(pago => {

        //total += +pago.monto;        

        //solo sumamos los pagos con id_tipo_pago < 100
        if (pago.id_tipo_pago < 100) {
          total += +pago.monto;
        } else if (pago.id_tipo_pago == 101) {
          // restamos las devoluciones
          total = total - pago.monto;
        }

      });
    }
    return total;
  }

  //sumatoria de pagos
  saldoPendiente() {

    let pendiente = 0;

    if (this.compra_selected.valor_operacion) {
      let valor_operacion = Number(this.compra_selected.valor_operacion.replace(/,/g, ""));

      pendiente = valor_operacion - this.totalPagosRealizados();

    }
    return pendiente;

  }

  //activa o desactiva la compra
  toggleActivacionCompra(compra) {
    //console.log("toggleActivacion", compra);

    // si la compra está activa entonces la cancelamos activo=0
    // sino la activamos activo=1
    let activo = 0;
    if (compra.activo == "0") {
      activo = 1;
    }

    this.clienteSrv.setActivacionCompra(compra.id_compra, activo)
      .subscribe((res: any) => {
        // si la respuesta tiene error es porque ya hay otro cliente asociado al lote
        if (res.error) {

          let dialogRef = this.dialog.open(AlertaDialogoComponent, {
            data: {
              title: "Corregir",
              content: `El lote seleccionado ya está activo para el cliente: ${res.cliente}. Debe cancelarlo antes de continuar.`,
              icon: true
            },
            width: '500px',
          });

        } else {
          compra.activo = res.activo;
          compra.fecha_cancelacion = res.fecha_cancelacion;
          compra.fecha_activo = res.fecha_activo;
          this.snackBar.open("Compra Actualizada", "", {
            duration: 2000,
            panelClass: ["bg-success", "text-white"]
          });
        }

      }, (error) => {
        this.snackBar.open("Ha ocurrido un error de conexión. Inténtelo más tarde", "", {
          duration: 2000,
          panelClass: ["bg-danger", "text-white"]
        });
      });

  }

  //elimina la compra indicada  
  delCompra(compra) {
    //console.log("delCompra", compra);

    let dialogRef = this.dialog.open(ConfirmarBorradoDialogoComponent, {
      data: {
        title: "Eliminar compra",
        content: `¿Desea eliminar la compra de: ${compra.manzana} ${compra.lote}?. Los pagos asociados también serán eliminados.`
      },
      width: "500px"
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result === true) {

        this.clienteSrv.delCompra(compra.id_compra)
          .subscribe((res:any) => {
            if (res.count == 1) {
              let i = this.compras.indexOf(compra);
              this.compras.splice(i, 1);

              // ui estado
              this.selection.clear();
              this.compra_selected = {};
              this.formInmueble.reset();
              this.formLote.reset();


              this.snackBar.open("Compra Eliminada", "", {
                duration: 2000,
                panelClass: ["bg-success", "text-white"]
              });
            } else {
              this.snackBar.open("Ha ocurrido un error", "", {
                duration: 2000,
                panelClass: ["bg-danger", "text-white"]
              });
            }

          }, (error) => {
            this.snackBar.open("Ha ocurrido un error de conexión. Inténtelo más tarde", "", {
              duration: 3000,
              panelClass: ["bg-danger", "text-white"]
            });
          });

      }

    });

  }

  //reporte
  reporteCompra(compra) {
    //console.log("reporte compra", compra);
    let url = this.reporteSrv.getUrlReporteCompra(compra.id_cliente, compra.id_lote, compra.id_compra);

    let link = document.createElement("a");
    link.href = url;
    link.target = "_blank";
    link.click();

  }


}

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RoutingModule } from "app/app.routing";
import { TextMaskModule } from "angular2-text-mask";
import { FileUploadModule } from 'ng2-file-upload/file-upload/file-upload.module';
import { JwtModule } from '@auth0/angular-jwt';
import { ColorPickerModule } from 'ngx-color-picker';
import { TypeaheadModule } from "ngx-bootstrap/typeahead";

//servicios
import { LoadingService } from 'app/services/loading.service';
import { ConfigService } from 'app/services/config.service';
import { ClientesService } from "app/services/clientes.service";
import { ObrasService } from "app/services/obras.service";
import { LotesService } from 'app/services/lotes.service';
import { PrototiposService } from 'app/services/prototipos.service';
import { UsuarioService } from "app/services/usuario.service";
import { AuthService } from "app/services/auth.service";
import { MapasService } from "app/services/mapas.service";
import { ActaEntregaService } from 'app/services/acta-entrega.service';
import { ManzanasService } from 'app/services/manzanas.service';
import { LoteEstadoVentaService } from 'app/services/lote-estado-venta.service';
import { FormaPagoService } from 'app/services/forma-pago.service';
import { InstitucionCreditoService } from 'app/services/institucion-credito.service';
import { TipoOperacionService } from 'app/services/tipo-operacion.service';
import { TipoPagoService } from 'app/services/tipo-pago.service';
import { InsumoService } from 'app/services/insumo.service';
import { VentasPagosService } from 'app/services/ventas-pagos.service';
import { ComisionService } from './services/comision.service';
import { GastoService } from './services/gasto.service';
import { ProveedorService } from './services/proveedor.service';
import { VendedorService } from './services/vendedor.service';
import { TareaService } from './services/tarea.service';

//helpers
import { ClienteHelperService } from 'app/utils/cliente-helper.service';

//guards
import { AuthGuard } from "app/guards/auth.guard";

//pipes
import { NumberToYesNoPipe } from './pipes/number-to-yes-no.pipe';
import { UnmaskNumberPipe } from './pipes/unmask-number.pipe';

//app component
import { AppComponent } from './app.component';
//ventas
import { ClientesComponent } from './components/ventas/clientes/clientes.component';
import { DesarrollosComponent } from './components/ventas/desarrollos/desarrollos.component';
import { NuevoClienteComponent } from './components/ventas/nuevo-cliente/nuevo-cliente.component';
import { ClienteComponent } from './components/ventas/cliente/cliente.component';

//admin
import { ObrasComponent } from './components/admin/obras/obras.component';

//directives
import { LoadingDirective } from './directives/loading.directive';
import { LoginComponent } from './components/login/login.component';
import { LayoutComponent } from './components/layout/layout.component';
import { TableroComponent } from './components/tablero/tablero.component';
import { AngularMaterialModule } from "app/modules/angular-material.module";

import { PerfilComponent } from './components/perfil/perfil.component';
import { MapasVentasComponent } from './components/ventas/mapas-ventas/mapas-ventas.component';
import { AvancesComponent } from './components/residente/avances/avances.component';
import { MapasAvancesComponent } from './components/residente/mapas-avances/mapas-avances.component';
import { EstructuraObraComponent } from './components/admin/estructura-obra/estructura-obra.component';
import { PrototiposComponent } from './components/admin/prototipos/prototipos.component';
import { EditarPrototipoComponent } from './components/admin/editar-prototipo/editar-prototipo.component';
import { UsuariosComponent } from './components/admin/usuarios/usuarios.component';
//import { CrearUsuarioComponent } from './components/admin/crear-usuario/crear-usuario.component';


import { CambiarPasswordDialogoComponent } from './components/admin/cambiar-password-dialogo/cambiar-password-dialogo.component';
import { ConfirmarBorradoDialogoComponent } from './components/admin/confirmar-borrado-dialogo/confirmar-borrado-dialogo.component';
import { EditarUsuarioDialogoComponent } from './components/admin/editar-usuario-dialogo/editar-usuario-dialogo.component';
//import { EditarClienteDialogoComponent } from './components/ventas/editar-cliente-dialogo/editar-cliente-dialogo.component';


import { EditarClienteComponent } from './components/ventas/editar-cliente/editar-cliente.component';
import { AgregarObraDialogoComponent } from "app/components/admin/agregar-obra-dialogo/agregar-obra-dialogo.component";
import { AgregarDocumentoDialogoComponent } from './components/ventas/agregar-documento-dialogo/agregar-documento-dialogo.component';
import { CrearUsuarioDialogoComponent } from './components/admin/crear-usuario-dialogo/crear-usuario-dialogo.component';

import { AgregarPrototipoDialogoComponent } from './components/admin/agregar-prototipo-dialogo/agregar-prototipo-dialogo.component';
import { NuevaCompraDialogoComponent } from './components/ventas/nueva-compra-dialogo/nueva-compra-dialogo.component';
import { NuevoPagoDialogoComponent } from './components/ventas/nuevo-pago-dialogo/nuevo-pago-dialogo.component';
import { EditarPagoDialogoComponent } from './components/ventas/editar-pago-dialogo/editar-pago-dialogo.component';

import { EditarPartidaDialogoComponent } from './components/admin/editar-partida-dialogo/editar-partida-dialogo.component';
import { EditarSubpartidaDialogoComponent } from './components/admin/editar-subpartida-dialogo/editar-subpartida-dialogo.component';
import { EditarInsumoDialogoComponent } from './components/admin/editar-insumo-dialogo/editar-insumo-dialogo.component';
import { EditarNombrePrototipoDialogoComponent } from './components/admin/editar-nombre-prototipo-dialogo/editar-nombre-prototipo-dialogo.component';
import { AgregarPartidaDialogoComponent } from './components/admin/agregar-partida-dialogo/agregar-partida-dialogo.component';
import { AgregarSubpartidaDialogoComponent } from './components/admin/agregar-subpartida-dialogo/agregar-subpartida-dialogo.component';
import { AgregarInsumoDialogoComponent } from './components/admin/agregar-insumo-dialogo/agregar-insumo-dialogo.component';

import { VentasLoteComponent } from './components/ventas/ventas-lote/ventas-lote.component';
import { ComentarioAvancesDialogoComponent } from './components/residente/comentario-avances-dialogo/comentario-avances-dialogo.component';
import { ActaEntregaComponent } from './components/ventas/acta-entrega/acta-entrega.component';
import { CrearActaEntregaComponent } from './components/ventas/crear-acta-entrega/crear-acta-entrega.component';
import { ActasEntregaComponent } from './components/ventas/actas-entrega/actas-entrega.component';
import { EditarActaEntregaComponent } from './components/ventas/editar-acta-entrega/editar-acta-entrega.component';
import { GenerarActaEntregaComponent } from './components/ventas/generar-acta-entrega/generar-acta-entrega.component';
import { EditarManzanaDialogoComponent } from './components/admin/editar-manzana-dialogo/editar-manzana-dialogo.component'

import { AgregarManzanaDialogoComponent } from './components/admin/agregar-manzana-dialogo/agregar-manzana-dialogo.component';
import { AgregarLoteDialogoComponent } from './components/admin/agregar-lote-dialogo/agregar-lote-dialogo.component';
import { FotoPartidaDialogoComponent } from './components/residente/foto-partida-dialogo/foto-partida-dialogo.component';



//resolvers
import { ObrasUsuarioResolverService } from 'app/resolvers/obras-usuario-resolver.service';
import { UsuariosAlmacenistasResolverService } from 'app/resolvers/usuarios-almacenistas-resolver.service';
import { UsuariosContolAlmacenResolverService } from 'app/resolvers/usuarios-contol-almacen-resolver.service';
import { UsuariosResidentesResolverService } from 'app/resolvers/usuarios-residentes-resolver.service';
import { UsuariosAsesoresResolverService } from 'app/resolvers/usuarios-asesores-resolver.service';
import { EstadosVentaLoteResolverService } from 'app/resolvers/estados-venta-lote-resolver.service';
import { MapasUsuarioResolverService } from 'app/resolvers/mapas-usuario-resolver.service';
import { FormasPagoResolverService } from 'app/resolvers/formas-pago-resolver.service';
import { InstitucionesCreditoResolverService } from 'app/resolvers/instituciones-credito-resolver.service';
import { TiposPagoResolverService } from 'app/resolvers/tipos-pago-resolver.service';
import { TiposOperacionResolverService } from 'app/resolvers/tipos-operacion-resolver.service';
import { UsuarioLoggedResolverService } from 'app/resolvers/usuario-logged-resolver.service';
import { EspecialidadesTrabajadorResolverService } from './resolvers/especialidades-trabajador-resolver.service';
import { VendedoresResolverService } from './resolvers/vendedores-resolver.service';
import { TiposGastosResolverService } from './resolvers/tipos-gastos-resolver.service';
import { TrabajadoresResolverService } from './resolvers/trabajadores-resolver.service';
import { ResidentesObraResolverService } from './resolvers/residentes-obra-resolver.service';
import { ManzanasResolverService } from './resolvers/manzanas-resolver.service';
import { FamiliasInsumosResolverService } from './resolvers/familias-insumos-resolver.service';


//components
import { EditarObraDialogoComponent } from './components/admin/editar-obra-dialogo/editar-obra-dialogo.component';
import { VerDatosFirmaDialogoComponent } from './components/ventas/ver-datos-firma-dialogo/ver-datos-firma-dialogo.component';
import { EditarDocumentoDialogoComponent } from './components/ventas/editar-documento-dialogo/editar-documento-dialogo.component';
import { EditarLoteDialogoComponent } from './components/admin/editar-lote-dialogo/editar-lote-dialogo.component';




import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localeEs, 'es');

//components
import { EditarGastoDialogoComponent } from './components/admin/editar-gasto-dialogo/editar-gasto-dialogo.component';
import { VerCedulaFiscalDialogoComponent } from './components/ventas/ver-cedula-fiscal-dialogo/ver-cedula-fiscal-dialogo.component';
import { AlertaClientesComponent } from './components/ventas/alerta-clientes/alerta-clientes.component';
import { ClienteSinLoteComponent } from './components/ventas/cliente-sin-lote/cliente-sin-lote.component';
import { EstadisticasVentasComponent } from './components/ventas/estadisticas-ventas/estadisticas-ventas.component';
import { ClientesLoteDialogoComponent } from './components/ventas/clientes-lote-dialogo/clientes-lote-dialogo.component';
import { AlertaDialogoComponent } from './components/admin/alerta-dialogo/alerta-dialogo.component';
import { PrototiposToStringPipe } from './pipes/prototipos-to-string.pipe';
import { SalidasComponent } from './components/almacen/salidas/salidas.component';
import { EntradasComponent } from './components/almacen/entradas/entradas.component';
import { InventarioComponent } from './components/almacen/inventario/inventario.component';
import { NuevaSalidaComponent } from './components/almacen/nueva-salida/nueva-salida.component';
import { NuevaEntradaComponent } from './components/almacen/nueva-entrada/nueva-entrada.component';
import { EditarMaterialDialogoComponent } from './components/almacen/editar-material-dialogo/editar-material-dialogo.component';
import { NuevoMaterialDialogoComponent } from './components/almacen/nuevo-material-dialogo/nuevo-material-dialogo.component';
import { TrabajadoresComponent } from './components/admin/trabajadores/trabajadores.component';
import { NuevoTrabajadorDialogoComponent } from './components/admin/nuevo-trabajador-dialogo/nuevo-trabajador-dialogo.component';
import { AsignarTrabajadoresComponent } from './components/admin/asignar-trabajadores/asignar-trabajadores.component';
import { EditarTrabajadorDialogoComponent } from './components/admin/editar-trabajador-dialogo/editar-trabajador-dialogo.component';
import { EditarEntradaDialogoComponent } from './components/almacen/editar-entrada-dialogo/editar-entrada-dialogo.component';
import { EditarEntradaComponent } from './components/almacen/editar-entrada/editar-entrada.component';
import { VerSalidaDialogoComponent } from './components/almacen/ver-salida-dialogo/ver-salida-dialogo.component';
import { EntradasService } from 'app/services/entradas.service';
import { SalidasService } from 'app/services/salidas.service';
import { TableroAdminComponent } from './components/tablero-admin/tablero-admin.component';
import { TableroAvancesComponent } from './components/tablero-avances/tablero-avances.component';
import { TableroVentasComponent } from './components/tablero-ventas/tablero-ventas.component';
import { TableroAlmacenComponent } from './components/tablero-almacen/tablero-almacen.component';
import { VentasPagosComponent } from './components/ventas/ventas-pagos/ventas-pagos.component';
import { ConfirmarDeshabilitarAlertaDialogoComponent } from './components/ventas/confirmar-deshabilitar-alerta-dialogo/confirmar-deshabilitar-alerta-dialogo.component';
import { UploadFileDialogoComponent } from './components/ventas/upload-file-dialogo/upload-file-dialogo.component';
import { ReporteService } from 'app/services/reporte.service';
import { MapasVentasConfigDialogoComponent } from './components/ventas/mapas-ventas-config-dialogo/mapas-ventas-config-dialogo.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoadingInterceptorService } from 'app/interceptors/loading-interceptor.service';
import { ImagenesLoteComponent } from './components/residente/imagenes-lote/imagenes-lote.component';
import { ImagenesLotesDialogoComponent } from './components/ventas/imagenes-lotes-dialogo/imagenes-lotes-dialogo.component';
import { ProveedoresComponent } from './components/admin/proveedores/proveedores.component';
import { PagosTrabajadoresComponent } from './components/admin/pagos-trabajadores/pagos-trabajadores.component';
import { GastosObrasComponent } from './components/admin/gastos-obras/gastos-obras.component';
import { EditarProveedorDialogoComponent } from './components/admin/editar-proveedor-dialogo/editar-proveedor-dialogo.component';
import { NuevoProveedorDialogoComponent } from './components/admin/nuevo-proveedor-dialogo/nuevo-proveedor-dialogo.component';
import { NuevoGastoDialogoComponent } from './components/admin/nuevo-gasto-dialogo/nuevo-gasto-dialogo.component';
import { TrabajadorService } from './services/trabajador.service';
import { AgregarInstitutoCreditoDialogoComponent } from './components/ventas/agregar-instituto-credito-dialogo/agregar-instituto-credito-dialogo.component';
import { EditarInstitutoCreditoDialogoComponent } from './components/ventas/editar-instituto-credito-dialogo/editar-instituto-credito-dialogo.component';
import { InstitucionesCreditoComponent } from './components/ventas/instituciones-credito/instituciones-credito.component';
import { HistorialApartadosComponent } from './components/comisiones/historial-apartados/historial-apartados.component';
import { ComisionesComponent } from './components/comisiones/comisiones/comisiones.component';
import { VendedoresComponent } from './components/ventas/vendedores/vendedores.component';
import { CrearVendedorDialogoComponent } from './components/ventas/crear-vendedor-dialogo/crear-vendedor-dialogo.component';
import { EditarVendedorDialogoComponent } from './components/ventas/editar-vendedor-dialogo/editar-vendedor-dialogo.component';
import { TableroComisionesComponent } from './components/tablero-comisiones/tablero-comisiones.component';
import { NuevoPagoComisionDialogoComponent } from './components/comisiones/nuevo-pago-comision-dialogo/nuevo-pago-comision-dialogo.component';
import { EditarPagoComisionDialogoComponent } from './components/comisiones/editar-pago-comision-dialogo/editar-pago-comision-dialogo.component';
import { ImportarPrototipoComponent } from './components/admin/importar-prototipo/importar-prototipo.component';
import { FormatoDialogoComponent } from './components/admin/formato-dialogo/formato-dialogo.component';
import { ProveedoresResolverService } from './resolvers/proveedores-resolver.service';
import { EstadisticasAdminComponent } from './components/admin/estadisticas-admin/estadisticas-admin.component';
import { AvancesLoteDialogoComponent } from './components/residente/avances-lote-dialogo/avances-lote-dialogo.component';
import { ReportesComponent } from './components/admin/reportes/reportes.component';
import { PagoTrabajadorService } from './services/pago-trabajador.service';
import { TiposPagoTrabajadorResolverService } from './resolvers/tipos-pago-trabajador-resolver.service';
import { PedidosComponent } from './components/almacen/pedidos/pedidos.component';
import { NuevoPedidoComponent } from './components/almacen/nuevo-pedido/nuevo-pedido.component';
import { EditarPedidoComponent } from './components/almacen/editar-pedido/editar-pedido.component';
import { PedidoService } from './services/pedido.service';
import { VerPedidoDialogoComponent } from './components/almacen/ver-pedido-dialogo/ver-pedido-dialogo.component';
import { RegistroComponent } from './components/admin/registro/registro.component';
import { LogService } from './services/log.service';
import { EstadosPedidoResolverService } from './resolvers/estados-pedido-resolver.service';
import { VerEntradaDialogoComponent } from './components/almacen/ver-entrada-dialogo/ver-entrada-dialogo.component';
import { OtrasSalidasComponent } from './components/almacen/otras-salidas/otras-salidas.component';
import { UsuariosResolverService } from './resolvers/usuarios-resolver.service';
import { ArranqueComponent } from './components/admin/arranque/arranque.component';
import { PartidasUrbanizacionResolverService } from 'app/resolvers/partidas-urbanizacion-resolver.service';
import { ReporteComponent } from './components/reportes/reporte/reporte.component';
import { ObraManzanasTrabajadoresResidentesResolverService } from './resolvers/obra-manzanas-trabajadores-residentes-resolver.service';
import { ObraMaterialesTrabajadoresResidentesResolverService } from './resolvers/obra-materiales-trabajadores-residentes-resolver.service';
import { ReportesResolverService } from './resolvers/reportes-resolver.service';
import { ReporteSalidasComponent } from './components/almacen/reporte-salidas/reporte-salidas.component';
import { ReporteEntradasComponent } from './components/almacen/reporte-entradas/reporte-entradas.component';
import { ExcedentePipe } from './pipes/excedente.pipe';
import { EstadisticasAdminResolverService } from './resolvers/estadisticas-admin-resolver.service';
import { DateToIsoPipe } from './pipes/date-to-iso.pipe';
import { CreditoPuenteComponent } from './components/credito-puente/credito-puente/credito-puente.component';
import { CargoAbonoCreditoDialogoComponent } from './components/credito-puente/cargo-abono-credito-dialogo/cargo-abono-credito-dialogo.component';
import { EditarCargoAbonoCreditoDialogoComponent } from './components/credito-puente/editar-cargo-abono-credito-dialogo/editar-cargo-abono-credito-dialogo.component';
import { SaldoVentaClienteDialogoComponent } from './components/ventas/saldo-venta-cliente-dialogo/saldo-venta-cliente-dialogo.component';
import { CreditoPuenteService } from './services/credito-puente.service';
import { TableroContabilidadComponent } from './components/tablero-contabilidad/tablero-contabilidad.component';
import { TableroResidenteComponent } from './components/tablero-residente/tablero-residente.component';
import { TableroControlAlmacenComponent } from './components/tablero-control-almacen/tablero-control-almacen.component';
import { TableroAsesorComponent } from './components/tablero-asesor/tablero-asesor.component';
import { TableroPedidosComponent } from './components/tablero-pedidos/tablero-pedidos.component';
import { TableroAlmacenistaComponent } from './components/tablero-almacenista/tablero-almacenista.component';
import { EditarPagoTrabajadorDialogoComponent } from './components/admin/editar-pago-trabajador-dialogo/editar-pago-trabajador-dialogo.component';
import { HistorialAvancesComponent } from './components/residente/historial-avances/historial-avances.component';
import { MapasAvancesConfigDialogoComponent } from './components/residente/mapas-avances-config-dialogo/mapas-avances-config-dialogo.component';
import { TareasComponent } from './components/admin/tareas/tareas.component';
import { AsignarTareaDialogoComponent } from './components/admin/asignar-tarea-dialogo/asignar-tarea-dialogo.component';
import { EditarTareaDialogoComponent } from './components/admin/editar-tarea-dialogo/editar-tarea-dialogo.component';
import { OpcionesMapaVentasBottomSheetComponent } from './components/ventas/opciones-mapa-ventas-bottom-sheet/opciones-mapa-ventas-bottom-sheet.component';
import { AgregarClienteLoteDialogoComponent } from './components/ventas/agregar-cliente-lote-dialogo/agregar-cliente-lote-dialogo.component';
import { CambiarEstadoVentasLoteDialogoComponent } from './components/ventas/cambiar-estado-ventas-lote-dialogo/cambiar-estado-ventas-lote-dialogo.component';
import { EditarClienteDialogoComponent } from './components/ventas/editar-cliente-dialogo/editar-cliente-dialogo.component';
import { NuevoClienteDialogoComponent } from './components/ventas/nuevo-cliente-dialogo/nuevo-cliente-dialogo.component';
import { InsumosAvanceDialogoComponent } from './components/residente/insumos-avance-dialogo/insumos-avance-dialogo.component';
import { TableroJefeFrenteComponent } from './components/tablero-jefe-frente/tablero-jefe-frente.component';
import { SalidaAlertaComponent } from './components/almacen/salida-alerta/salida-alerta.component';
import { AceptarSalidaAlertaDialogoComponent } from './components/almacen/aceptar-salida-alerta-dialogo/aceptar-salida-alerta-dialogo.component';
import { SaldoProveedoresComponent } from './components/admin/saldo-proveedores/saldo-proveedores.component';
import { CargoAbonoProveedoresDialogoComponent } from './components/admin/cargo-abono-proveedores-dialogo/cargo-abono-proveedores-dialogo.component';
import { EditarCargoAbonoProveedoresDialogoComponent } from './components/admin/editar-cargo-abono-proveedores-dialogo/editar-cargo-abono-proveedores-dialogo.component';
import { MaterialesEjecutarComponent } from './components/almacen/materiales-ejecutar/materiales-ejecutar.component';
import { GraficasVentasComponent } from './components/admin/graficas-ventas/graficas-ventas.component';
import { TableroGraficasComponent } from './components/admin/tablero-graficas/tablero-graficas.component';
import { NgxChartsModule } from '../../node_modules/@swimlane/ngx-charts';
import { GraficasVentasVendedorComponent } from './components/admin/graficas-ventas-vendedor/graficas-ventas-vendedor.component';
import { CatalogoInsumoComponent } from './components/admin/catalogo-insumo/catalogo-insumo.component';
import { EditarInsumoCatalogoDialogoComponent } from './components/admin/editar-insumo-catalogo-dialogo/editar-insumo-catalogo-dialogo.component';
import { NuevoInsumoCatalogoDialogoComponent } from './components/admin/nuevo-insumo-catalogo-dialogo/nuevo-insumo-catalogo-dialogo.component';
import { DevolucionesCanceladosComponent } from './components/ventas/devoluciones-cancelados/devoluciones-cancelados.component';
import { DevolucionesPendientesComponent } from './components/ventas/devoluciones-pendientes/devoluciones-pendientes.component';









export function getToken() {
  return localStorage.getItem('token');
}





@NgModule({
  declarations: [
    AppComponent,
    ClientesComponent,
    DesarrollosComponent,
    NuevoClienteComponent,
    ClienteComponent,
    ObrasComponent,
    LoginComponent,
    LayoutComponent,
    TableroComponent,
    PerfilComponent,
    MapasVentasComponent,
    AvancesComponent,
    MapasAvancesComponent,
    EstructuraObraComponent,
    PrototiposComponent,
    EditarPrototipoComponent,
    UsuariosComponent,
    CambiarPasswordDialogoComponent,
    ConfirmarBorradoDialogoComponent,
    EditarUsuarioDialogoComponent,
    EditarClienteComponent,
    AgregarObraDialogoComponent,
    AgregarDocumentoDialogoComponent,
    CrearUsuarioDialogoComponent,
    AgregarPrototipoDialogoComponent,
    NuevaCompraDialogoComponent,
    NuevoPagoDialogoComponent,
    EditarPagoDialogoComponent,
    NumberToYesNoPipe,
    EditarPartidaDialogoComponent,
    EditarSubpartidaDialogoComponent,
    EditarInsumoDialogoComponent,
    EditarNombrePrototipoDialogoComponent,
    AgregarPartidaDialogoComponent,
    AgregarSubpartidaDialogoComponent,
    AgregarInsumoDialogoComponent,
    VentasLoteComponent,
    ComentarioAvancesDialogoComponent,
    ActaEntregaComponent,
    CrearActaEntregaComponent,
    ActasEntregaComponent,
    EditarActaEntregaComponent,
    GenerarActaEntregaComponent,
    EditarManzanaDialogoComponent,
    AgregarManzanaDialogoComponent,
    AgregarLoteDialogoComponent,
    FotoPartidaDialogoComponent,
    EditarObraDialogoComponent,
    VerDatosFirmaDialogoComponent,
    EditarDocumentoDialogoComponent,
    EditarLoteDialogoComponent,
    VerCedulaFiscalDialogoComponent,
    AlertaClientesComponent,
    ClienteSinLoteComponent,
    EstadisticasVentasComponent,
    ClientesLoteDialogoComponent,
    UnmaskNumberPipe,
    AlertaDialogoComponent,
    PrototiposToStringPipe,
    SalidasComponent,
    EntradasComponent,
    InventarioComponent,
    NuevaSalidaComponent,
    NuevaEntradaComponent,
    EditarMaterialDialogoComponent,
    NuevoMaterialDialogoComponent,
    TrabajadoresComponent,
    NuevoTrabajadorDialogoComponent,
    AsignarTrabajadoresComponent,
    EditarTrabajadorDialogoComponent,
    EditarEntradaDialogoComponent,
    EditarEntradaComponent,
    VerSalidaDialogoComponent,
    TableroAdminComponent,
    TableroAvancesComponent,
    TableroVentasComponent,
    TableroAlmacenComponent,
    VentasPagosComponent,
    ConfirmarDeshabilitarAlertaDialogoComponent,
    UploadFileDialogoComponent,
    MapasVentasConfigDialogoComponent,
    LoadingDirective,
    ImagenesLoteComponent,
    ImagenesLotesDialogoComponent,
    ProveedoresComponent,
    PagosTrabajadoresComponent,
    GastosObrasComponent,
    EditarProveedorDialogoComponent,
    NuevoProveedorDialogoComponent,
    NuevoGastoDialogoComponent,
    AgregarInstitutoCreditoDialogoComponent,
    EditarInstitutoCreditoDialogoComponent,
    InstitucionesCreditoComponent,
    HistorialApartadosComponent,
    ComisionesComponent,
    VendedoresComponent,
    CrearVendedorDialogoComponent,
    EditarVendedorDialogoComponent,
    TableroComisionesComponent,
    NuevoPagoComisionDialogoComponent,
    EditarPagoComisionDialogoComponent,
    EditarGastoDialogoComponent,
    ImportarPrototipoComponent,
    FormatoDialogoComponent,
    EstadisticasAdminComponent,
    AvancesLoteDialogoComponent,
    ReportesComponent,
    PedidosComponent,
    NuevoPedidoComponent,
    EditarPedidoComponent,
    VerPedidoDialogoComponent,
    RegistroComponent,
    VerEntradaDialogoComponent,
    OtrasSalidasComponent,
    ArranqueComponent,
    ReporteComponent,
    ReporteSalidasComponent,
    ReporteEntradasComponent,
    ExcedentePipe,
    DateToIsoPipe,
    CreditoPuenteComponent,
    CargoAbonoCreditoDialogoComponent,
    EditarCargoAbonoCreditoDialogoComponent,
    SaldoVentaClienteDialogoComponent,
    TableroContabilidadComponent,
    TableroResidenteComponent,
    TableroControlAlmacenComponent,
    TableroAsesorComponent,
    TableroPedidosComponent,
    TableroAlmacenistaComponent,
    EditarPagoTrabajadorDialogoComponent,
    HistorialAvancesComponent,
    MapasAvancesConfigDialogoComponent,
    TareasComponent,
    AsignarTareaDialogoComponent,
    EditarTareaDialogoComponent,
    OpcionesMapaVentasBottomSheetComponent,
    AgregarClienteLoteDialogoComponent,
    CambiarEstadoVentasLoteDialogoComponent,
    EditarClienteDialogoComponent,
    NuevoClienteDialogoComponent,
    InsumosAvanceDialogoComponent,
    TableroJefeFrenteComponent,
    SalidaAlertaComponent,
    AceptarSalidaAlertaDialogoComponent,
    SaldoProveedoresComponent,
    CargoAbonoProveedoresDialogoComponent,
    EditarCargoAbonoProveedoresDialogoComponent,
    MaterialesEjecutarComponent,
    GraficasVentasComponent,
    TableroGraficasComponent,
    GraficasVentasVendedorComponent,
    CatalogoInsumoComponent,
    EditarInsumoCatalogoDialogoComponent,
    NuevoInsumoCatalogoDialogoComponent,
    DevolucionesCanceladosComponent,
    DevolucionesPendientesComponent,

  ],

  imports: [
    BrowserModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: getToken,
        whitelistedDomains: ['localhost:8080']
      }
    }),
    HttpModule,
    FormsModule,
    FileUploadModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    //AuthModule,
    AngularMaterialModule,
    TextMaskModule,
    RoutingModule,
    ColorPickerModule,
    NgxChartsModule,
    TypeaheadModule.forRoot()

  ],

  entryComponents: [
    CambiarPasswordDialogoComponent,
    ConfirmarBorradoDialogoComponent,
    AgregarObraDialogoComponent,
    AgregarDocumentoDialogoComponent,
    CrearUsuarioDialogoComponent,
    AgregarPrototipoDialogoComponent,
    NuevaCompraDialogoComponent,
    NuevoPagoDialogoComponent,
    EditarPagoDialogoComponent,
    EditarPartidaDialogoComponent,
    EditarSubpartidaDialogoComponent,
    EditarInsumoDialogoComponent,
    EditarNombrePrototipoDialogoComponent,
    AgregarPartidaDialogoComponent,
    AgregarSubpartidaDialogoComponent,
    AgregarInsumoDialogoComponent,
    ComentarioAvancesDialogoComponent,
    EditarManzanaDialogoComponent,
    AgregarManzanaDialogoComponent,
    AgregarLoteDialogoComponent,
    FotoPartidaDialogoComponent,
    EditarObraDialogoComponent,
    VerDatosFirmaDialogoComponent,
    EditarDocumentoDialogoComponent,
    EditarLoteDialogoComponent,
    EditarUsuarioDialogoComponent,
    VerCedulaFiscalDialogoComponent,
    ClientesLoteDialogoComponent,
    AlertaDialogoComponent,
    EditarMaterialDialogoComponent,
    NuevoMaterialDialogoComponent,
    NuevoTrabajadorDialogoComponent,
    EditarTrabajadorDialogoComponent,
    EditarEntradaDialogoComponent,
    VerSalidaDialogoComponent,
    ConfirmarDeshabilitarAlertaDialogoComponent,
    UploadFileDialogoComponent,
    MapasVentasConfigDialogoComponent,
    ImagenesLotesDialogoComponent,
    EditarProveedorDialogoComponent,
    NuevoProveedorDialogoComponent,
    NuevoGastoDialogoComponent,
    AgregarInstitutoCreditoDialogoComponent,
    EditarInstitutoCreditoDialogoComponent,
    CrearVendedorDialogoComponent,
    EditarVendedorDialogoComponent,
    NuevoPagoComisionDialogoComponent,
    EditarPagoComisionDialogoComponent,
    EditarGastoDialogoComponent,
    FormatoDialogoComponent,
    AvancesLoteDialogoComponent,
    VerPedidoDialogoComponent,
    VerEntradaDialogoComponent,
    CargoAbonoCreditoDialogoComponent,
    EditarCargoAbonoCreditoDialogoComponent,
    SaldoVentaClienteDialogoComponent,
    EditarPagoTrabajadorDialogoComponent,
    MapasAvancesConfigDialogoComponent,
    AsignarTareaDialogoComponent,
    EditarTareaDialogoComponent,
    OpcionesMapaVentasBottomSheetComponent,
    AgregarClienteLoteDialogoComponent,
    CambiarEstadoVentasLoteDialogoComponent,
    EditarClienteDialogoComponent,
    NuevoClienteDialogoComponent,
    InsumosAvanceDialogoComponent,
    AceptarSalidaAlertaDialogoComponent,
    CargoAbonoProveedoresDialogoComponent,
    EditarCargoAbonoProveedoresDialogoComponent,
    EditarInsumoCatalogoDialogoComponent,
    NuevoInsumoCatalogoDialogoComponent

  ],

  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptorService,
      multi: true
    },

    AuthGuard,
    ConfigService,
    AuthService,
    ObrasService,
    ClientesService,
    ClienteHelperService,
    UsuarioService,
    MapasService,
    PrototiposService,
    LotesService,
    ManzanasService,
    ActaEntregaService,
    LoteEstadoVentaService,
    FormaPagoService,
    InstitucionCreditoService,
    TipoOperacionService,
    TipoPagoService,
    InsumoService,
    EntradasService,
    SalidasService,
    VentasPagosService,
    ReporteService,
    LoadingService,
    TrabajadorService,
    VendedorService,
    ComisionService,
    GastoService,
    ProveedorService,
    PagoTrabajadorService,
    PedidoService,
    LogService,
    CreditoPuenteService,

    ObrasUsuarioResolverService,
    UsuariosAlmacenistasResolverService,
    UsuariosAsesoresResolverService,
    UsuariosContolAlmacenResolverService,
    UsuariosResidentesResolverService,
    EstadosVentaLoteResolverService,
    MapasUsuarioResolverService,
    FormasPagoResolverService,
    InstitucionesCreditoResolverService,
    TiposPagoResolverService,
    TiposOperacionResolverService,
    UsuarioLoggedResolverService,
    EspecialidadesTrabajadorResolverService,
    VendedoresResolverService,
    TiposGastosResolverService,
    ProveedoresResolverService,
    TrabajadoresResolverService,
    ResidentesObraResolverService,
    TiposPagoTrabajadorResolverService,
    EstadosPedidoResolverService,
    UsuariosResolverService,
    PartidasUrbanizacionResolverService,
    ObraManzanasTrabajadoresResidentesResolverService,
    ObraMaterialesTrabajadoresResidentesResolverService,
    ReportesResolverService,
    EstadisticasAdminResolverService,
    ManzanasResolverService,
    TareaService,
    FamiliasInsumosResolverService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

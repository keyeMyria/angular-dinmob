import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RoutingModule } from "app/app.routing";
import { TextMaskModule } from "angular2-text-mask";
import { FileUploadModule } from 'ng2-file-upload/file-upload/file-upload.module';
import { JwtModule } from '@auth0/angular-jwt';

import "hammerjs";


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
import { HttpClientModule } from '@angular/common/http';
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


//components
import { EditarObraDialogoComponent } from './components/admin/editar-obra-dialogo/editar-obra-dialogo.component';
import { VerDatosFirmaDialogoComponent } from './components/ventas/ver-datos-firma-dialogo/ver-datos-firma-dialogo.component';
import { EditarDocumentoDialogoComponent } from './components/ventas/editar-documento-dialogo/editar-documento-dialogo.component';
import { EditarLoteDialogoComponent } from './components/admin/editar-lote-dialogo/editar-lote-dialogo.component';




import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localeEs, 'es');

//components
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
import { GastosSobrasComponent } from './components/admin/gastos-sobras/gastos-sobras.component';
import { EditarProveedorDialogoComponent } from './components/admin/editar-proveedor-dialogo/editar-proveedor-dialogo.component';
import { NuevoProveedorDialogoComponent } from './components/admin/nuevo-proveedor-dialogo/nuevo-proveedor-dialogo.component';
import { NuevoGastoDialogoComponent } from './components/admin/nuevo-gasto-dialogo/nuevo-gasto-dialogo.component';
import { TrabajadorService } from './services/trabajador.service';










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
    //CrearUsuarioComponent,
    CambiarPasswordDialogoComponent,
    ConfirmarBorradoDialogoComponent,
    EditarUsuarioDialogoComponent,
    //EditarClienteDialogoComponent,
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
    GastosSobrasComponent,
    EditarProveedorDialogoComponent,
    NuevoProveedorDialogoComponent,
    NuevoGastoDialogoComponent,








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
    RoutingModule

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
    NuevoGastoDialogoComponent




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
    TrabajadorService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

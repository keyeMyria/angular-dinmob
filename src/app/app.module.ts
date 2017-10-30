import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RoutingModule } from "app/app.routing";
import { I18n, SpanishDatepickerI18nService } from "app/services/spanish-datepicker-i18n.service";
import { NgbDatepickerI18n, NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { TextMaskModule } from "angular2-text-mask";

import { AuthModule } from "app/modules/auth.module";
import { FlexLayoutModule } from "@angular/flex-layout";
import "hammerjs";


//servicios
import { ConfigService } from 'app/services/config.service';
import { ClientesService } from "app/services/clientes.service";
import { ObrasService } from "app/services/obras.service";
import { LotesService } from 'app/services/lotes.service';
import { PrototiposService } from 'app/services/prototipos.service';
import { UsuarioService } from "app/services/usuario.service";
import { AuthService } from "app/services/auth.service";
import { MapasService } from "app/services/mapas.service";
import { ActaEntregaService } from 'app/services/acta-entrega.service';

//helpers
import { ClienteHelperService } from 'app/utils/cliente-helper.service';

//guards
import { AuthGuard } from "app/guards/auth.guard";

//pipes
import { NumberToYesNoPipe } from './pipes/number-to-yes-no.pipe';

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
import { MyCollapseDirective } from './directives/my-collapse.directive';
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
import { CrearUsuarioComponent } from './components/admin/crear-usuario/crear-usuario.component';


import { CambiarPasswordDialogoComponent } from './components/admin/cambiar-password-dialogo/cambiar-password-dialogo.component';
import { ConfirmarBorradoDialogoComponent } from './components/admin/confirmar-borrado-dialogo/confirmar-borrado-dialogo.component';
import { EditarUsuarioDialogoComponent } from './components/admin/editar-usuario-dialogo/editar-usuario-dialogo.component';
import { EditarClienteDialogoComponent } from './components/ventas/editar-cliente-dialogo/editar-cliente-dialogo.component';


import { EditarClienteComponent } from './components/ventas/editar-cliente/editar-cliente.component';
import { AgregarObraDialogoComponent } from "app/components/admin/agregar-obra-dialogo/agregar-obra-dialogo.component";
import { AgregarDocumentoDialogoComponent } from './components/ventas/agregar-documento-dialogo/agregar-documento-dialogo.component';
import { CrearUsuarioDialogoComponent } from './components/admin/crear-usuario-dialogo/crear-usuario-dialogo.component';

import { AgregarPrototipoDialogoComponent } from './components/admin/agregar-prototipo-dialogo/agregar-prototipo-dialogo.component';
import { CambiarNombrePrototipoDialogoComponent } from './components/admin/cambiar-nombre-prototipo-dialogo/cambiar-nombre-prototipo-dialogo.component';
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
import { GenerarActaEntregaComponent } from './components/ventas/generar-acta-entrega/generar-acta-entrega.component'













@NgModule({
  declarations: [
    AppComponent,
    ClientesComponent,
    DesarrollosComponent,
    NuevoClienteComponent,
    ClienteComponent,
    ObrasComponent,
    MyCollapseDirective,
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
    CrearUsuarioComponent,
    CambiarPasswordDialogoComponent,
    ConfirmarBorradoDialogoComponent,
    EditarUsuarioDialogoComponent,
    EditarClienteDialogoComponent,
    EditarClienteComponent,
    AgregarObraDialogoComponent,
    AgregarDocumentoDialogoComponent,
    CrearUsuarioDialogoComponent,
    AgregarPrototipoDialogoComponent,
    CambiarNombrePrototipoDialogoComponent,
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



    

  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    AuthModule,
    NgbModule.forRoot(),
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
    CambiarNombrePrototipoDialogoComponent,
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
    ComentarioAvancesDialogoComponent
    
  ],

  providers: [
    I18n,
    {provide:NgbDatepickerI18n, useClass:SpanishDatepickerI18nService},
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
    ActaEntregaService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

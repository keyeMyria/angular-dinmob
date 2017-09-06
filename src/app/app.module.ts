import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RoutingModule } from "app/app.routing";
import { I18n, SpanishDatepickerI18nService } from "app/services/spanish-datepicker-i18n.service";
import { NgbDatepickerI18n, NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { FlexLayoutModule } from "@angular/flex-layout";
import {
  MdMenuModule,
  MdCheckboxModule,
  MdRadioModule,
  MdIconModule,
  MdToolbarModule,
  MdSidenavModule,
  MdButtonModule,
  MdTabsModule,
  MdListModule,
  MdExpansionModule,
  MdSlideToggleModule
} from "@angular/material";
import "hammerjs";

import { AccordionModule } from "primeng/components/accordion/accordion";
import { DataTableModule } from "primeng/components/datatable/datatable";
import { ContextMenuModule } from "primeng/components/contextmenu/contextmenu";
import { SharedModule } from "primeng/components/common/shared";
import { MenuModule } from "primeng/components/menu/menu";
import { TreeTableModule } from "primeng/components/treetable/treetable";


//servicios
import { ClientesService } from "app/services/clientes.service";
import { ObrasService } from "app/services/obras.service";

//import { MaterializeModule } from "angular2-materialize";

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
import { AuthService } from "app/services/auth.service";
import { PerfilComponent } from './components/perfil/perfil.component';
import { MapasVentasComponent } from './components/ventas/mapas-ventas/mapas-ventas.component';
import { AvancesComponent } from './components/residente/avances/avances.component';
import { MapasAvancesComponent } from './components/residente/mapas-avances/mapas-avances.component';
import { EstructuraObraComponent } from './components/admin/estructura-obra/estructura-obra.component';
import { PrototiposComponent } from './components/admin/prototipos/prototipos.component';
import { EditarPrototipoComponent } from './components/admin/editar-prototipo/editar-prototipo.component';
import { UsuariosComponent } from './components/admin/usuarios/usuarios.component';
import { CrearUsuarioComponent } from './components/admin/crear-usuario/crear-usuario.component';
import { UsuarioService } from "app/services/usuario.service";
import { AuthModule } from "app/modules/auth.module";
import { CambiarPasswordDialogoComponent } from './components/admin/cambiar-password-dialogo/cambiar-password-dialogo.component';
import { ConfirmarBorradoDialogoComponent } from './components/admin/confirmar-borrado-dialogo/confirmar-borrado-dialogo.component';
import { EditarUsuarioDialogoComponent } from './components/admin/editar-usuario-dialogo/editar-usuario-dialogo.component';
import { EditarClienteDialogoComponent } from './components/ventas/editar-cliente-dialogo/editar-cliente-dialogo.component';
import { MapasService } from "app/services/mapas.service";
import { AuthGuard } from "app/guards/auth.guard";
import { EditarClienteComponent } from './components/ventas/editar-cliente/editar-cliente.component';
import { AgregarObraDialogoComponent } from "app/components/admin/agregar-obra-dialogo/agregar-obra-dialogo.component";
import { AgregarDocumentoDialogoComponent } from './components/ventas/agregar-documento-dialogo/agregar-documento-dialogo.component';





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

    AccordionModule,
    DataTableModule,
    ContextMenuModule,
    MenuModule,
    TreeTableModule,
    SharedModule,

    RoutingModule

  ],

  entryComponents: [    
    CambiarPasswordDialogoComponent,
    ConfirmarBorradoDialogoComponent,
    AgregarObraDialogoComponent,
    AgregarDocumentoDialogoComponent
    
  ],

  providers: [
    I18n,
    {provide:NgbDatepickerI18n, useClass:SpanishDatepickerI18nService},
    AuthGuard,
    AuthService,
    ObrasService,
    ClientesService,
    UsuarioService,
    MapasService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

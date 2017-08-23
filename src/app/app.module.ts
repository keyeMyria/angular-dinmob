import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RoutingModule } from "app/app.routing";

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
/*import "hammerjs";*/

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
    TableroComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    //MaterializeModule,
    AngularMaterialModule,

    AccordionModule,
    DataTableModule,
    ContextMenuModule,
    MenuModule,
    TreeTableModule,
    SharedModule,

    RoutingModule

  ],
  providers: [
    AuthService,
    ObrasService,
    ClientesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

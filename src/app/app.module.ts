import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MdMenuModule,MdCheckboxModule, MdIconModule, MdToolbarModule, MdSidenavModule, MdButtonModule, MdTabsModule, MdListModule } from "@angular/material";
import "hammerjs";

import { AccordionModule } from "primeng/components/accordion/accordion";
import { DataTableModule } from "primeng/components/datatable/datatable";
import { ContextMenuModule } from "primeng/components/contextmenu/contextmenu";
import { SharedModule } from "primeng/components/common/shared";
import { MenuModule } from "primeng/components/menu/menu";
import { TreeTableModule } from "primeng/components/treetable/treetable";


import { MaterializeModule } from "ng2-materialize";

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ClientesComponent } from './components/ventas/clientes/clientes.component';
import { DesarrollosComponent } from './components/ventas/desarrollos/desarrollos.component';
import { NuevoClienteComponent } from './components/ventas/nuevo-cliente/nuevo-cliente.component';
import { ClienteComponent } from './components/ventas/cliente/cliente.component';
import { ROUTING } from "app/app.routing";

@NgModule({
  declarations: [
    AppComponent,
    ClientesComponent,
    DesarrollosComponent,
    NuevoClienteComponent,
    ClienteComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterializeModule.forRoot(),
    MdMenuModule,
    MdIconModule,
    MdToolbarModule,
    MdSidenavModule,
    MdButtonModule,
    MdTabsModule,
    MdListModule,
    MdCheckboxModule,
    
    AccordionModule,
    DataTableModule,
    ContextMenuModule,
    MenuModule,
    TreeTableModule,
    SharedModule,

      ROUTING

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

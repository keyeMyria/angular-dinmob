import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';

import { EscrituracionRoutingModule } from './escrituracion-routing.module';
import { TableroComponent } from './components/tablero/tablero.component';
import { HomeComponent } from './components/home/home.component';
import { AngularMaterialModule } from '../modules/angular-material.module';
import { ConfiguracionEscrituracionComponent } from './components/configuracion-escrituracion/configuracion-escrituracion.component';
import { AgregarEquipoDialogoComponent } from './components/agregar-equipo-dialogo/agregar-equipo-dialogo.component';
import { AgregarVendedorEquipoDialogoComponent } from './components/agregar-vendedor-equipo-dialogo/agregar-vendedor-equipo-dialogo.component';
import { EquiposVentasEscrituracionComponent } from './components/equipos-ventas-escrituracion/equipos-ventas-escrituracion.component';
import { ClientesEscrituracionComponent } from './components/clientes-escrituracion/clientes-escrituracion.component';
import { LotesEscrituracionComponent } from './components/lotes-escrituracion/lotes-escrituracion.component';
import { MapasEscrituracionComponent } from './components/mapas-escrituracion/mapas-escrituracion.component';
import { EditarClienteEscrituracionComponent } from './components/editar-cliente-escrituracion/editar-cliente-escrituracion.component';
import { TableroEscrituracionComponent } from './components/tablero-escrituracion/tablero-escrituracion.component';
import { ClientesLoteEscrituracionDialogoComponent } from './components/clientes-lote-escrituracion-dialogo/clientes-lote-escrituracion-dialogo.component';
import { EditarClienteEscrituracionDialogoComponent } from './components/editar-cliente-escrituracion-dialogo/editar-cliente-escrituracion-dialogo.component';
import { EditarLoteEscrituracionDialogoComponent } from './components/editar-lote-escrituracion-dialogo/editar-lote-escrituracion-dialogo.component';
import { EditarEquipoDialogoComponent } from './components/editar-equipo-dialogo/editar-equipo-dialogo.component';
import { NuevoPagoEscrituracionDialogoComponent } from './components/nuevo-pago-escrituracion-dialogo/nuevo-pago-escrituracion-dialogo.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TextMaskModule,
    AngularMaterialModule,
    EscrituracionRoutingModule
  ],
  declarations: [
    HomeComponent,
    TableroComponent,
    MapasEscrituracionComponent,
    TableroEscrituracionComponent,
    ClientesEscrituracionComponent,
    LotesEscrituracionComponent,
    ConfiguracionEscrituracionComponent,
    EquiposVentasEscrituracionComponent,
    AgregarVendedorEquipoDialogoComponent,
    AgregarEquipoDialogoComponent,
    EditarClienteEscrituracionComponent,
    ClientesLoteEscrituracionDialogoComponent,
    EditarClienteEscrituracionDialogoComponent,
    EditarLoteEscrituracionDialogoComponent,
    EditarEquipoDialogoComponent,
    NuevoPagoEscrituracionDialogoComponent

  ],
  entryComponents: [
    AgregarVendedorEquipoDialogoComponent,
    AgregarEquipoDialogoComponent,
    ClientesLoteEscrituracionDialogoComponent,
    EditarClienteEscrituracionDialogoComponent,
    EditarLoteEscrituracionDialogoComponent,
    EditarEquipoDialogoComponent,
    NuevoPagoEscrituracionDialogoComponent
  ]
})
export class EscrituracionModule { }

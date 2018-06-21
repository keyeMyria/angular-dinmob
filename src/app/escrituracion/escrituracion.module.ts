import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EscrituracionRoutingModule } from './escrituracion-routing.module';
import { TableroComponent } from './components/tablero/tablero.component';
import { HomeComponent } from './components/home/home.component';
import { AngularMaterialModule } from '../modules/angular-material.module';
import { ConfiguracionEscrituracionComponent } from '../components/escrituracion/configuracion-escrituracion/configuracion-escrituracion.component';
import { AgregarEquipoDialogoComponent } from '../components/escrituracion/agregar-equipo-dialogo/agregar-equipo-dialogo.component';
import { AgregarVendedorEquipoDialogoComponent } from '../components/escrituracion/agregar-vendedor-equipo-dialogo/agregar-vendedor-equipo-dialogo.component';
import { EquiposVentasEscrituracionComponent } from '../components/escrituracion/equipos-ventas-escrituracion/equipos-ventas-escrituracion.component';
import { ClientesEscrituracionComponent } from '../components/escrituracion/clientes-escrituracion/clientes-escrituracion.component';
import { LotesEscrituracionComponent } from '../components/escrituracion/lotes-escrituracion/lotes-escrituracion.component';
import { MapasEscrituracionComponent } from '../components/escrituracion/mapas-escrituracion/mapas-escrituracion.component';
import { EditarClienteEscrituracionComponent } from '../components/escrituracion/editar-cliente-escrituracion/editar-cliente-escrituracion.component';
import { FormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TextMaskModule,
    AngularMaterialModule,
    EscrituracionRoutingModule
  ],
  declarations: [
    HomeComponent,
    TableroComponent,
    ConfiguracionEscrituracionComponent,
    AgregarEquipoDialogoComponent,
    AgregarVendedorEquipoDialogoComponent,
    EquiposVentasEscrituracionComponent,
    ClientesEscrituracionComponent,
    LotesEscrituracionComponent,
    MapasEscrituracionComponent,
    EditarClienteEscrituracionComponent,

  ],
  entryComponents:[
    AgregarEquipoDialogoComponent,
    AgregarVendedorEquipoDialogoComponent
  ]
})
export class EscrituracionModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';
import { NgxChartsModule } from '@swimlane/ngx-charts';


/* Componentes */

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
import { GraficasVentasComponent } from './components/graficas-ventas/graficas-ventas.component';
import { HistorialVentasComponent } from './components/historial-ventas/historial-ventas.component';
import { LotesInfonavitComponent } from './components/lotes-infonavit/lotes-infonavit.component';
import { LotesFovisssteComponent } from './components/lotes-fovissste/lotes-fovissste.component';
import { ComentariosPosventasComponent } from './components/comentarios-posventas/comentarios-posventas.component';
import { EncuestaSatisfaccionComponent } from './components/encuesta-satisfaccion/encuesta-satisfaccion.component';
import { ProyeccionFinancieraComponent } from './components/proyeccion-financiera/proyeccion-financiera.component';
import { LotesPorVenderComponent } from './components/lotes-por-vender/lotes-por-vender.component';
import { LotesEnTramiteComponent } from './components/lotes-en-tramite/lotes-en-tramite.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TextMaskModule,
    AngularMaterialModule,
    EscrituracionRoutingModule,
    NgxChartsModule
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
    GraficasVentasComponent,
    HistorialVentasComponent,
    LotesInfonavitComponent,
    LotesFovisssteComponent,
    ComentariosPosventasComponent,
    EncuestaSatisfaccionComponent,
    ProyeccionFinancieraComponent,
    LotesPorVenderComponent,
    LotesEnTramiteComponent,

  ],
  entryComponents: [
    AgregarVendedorEquipoDialogoComponent,
    AgregarEquipoDialogoComponent,
    ClientesLoteEscrituracionDialogoComponent,
    EditarClienteEscrituracionDialogoComponent,
    EditarLoteEscrituracionDialogoComponent,
    EditarEquipoDialogoComponent,
  ]
})
export class EscrituracionModule { }

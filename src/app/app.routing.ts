import { ModuleWithProviders } from '@angular/core/src/metadata/ng_module';
import { Routes, RouterModule } from '@angular/router';

//ventas
import { ClientesComponent } from './components/ventas/clientes/clientes.component';
import { DesarrollosComponent } from './components/ventas/desarrollos/desarrollos.component';
import { NuevoClienteComponent } from './components/ventas/nuevo-cliente/nuevo-cliente.component';
import { ClienteComponent } from './components/ventas/cliente/cliente.component';
//admin
import { ObrasComponent } from "app/components/admin/obras/obras.component";
import { LoginComponent } from "app/components/login/login.component";
import { LayoutComponent } from "app/components/layout/layout.component";
import { TableroComponent } from "app/components/tablero/tablero.component";
import { EditarPrototipoComponent } from "app/components/admin/editar-prototipo/editar-prototipo.component";
import { EstructuraObraComponent } from "app/components/admin/estructura-obra/estructura-obra.component";
import { PrototiposComponent } from "app/components/admin/prototipos/prototipos.component";
import { PerfilComponent } from "app/components/perfil/perfil.component";
import { AvancesComponent } from "app/components/residente/avances/avances.component";
import { MapasAvancesComponent } from "app/components/residente/mapas-avances/mapas-avances.component";
import { UsuariosComponent } from "app/components/admin/usuarios/usuarios.component";
//import { CrearUsuarioComponent } from "app/components/admin/crear-usuario/crear-usuario.component";
import { EditarClienteComponent } from "app/components/ventas/editar-cliente/editar-cliente.component";
import { MapasVentasComponent } from "app/components/ventas/mapas-ventas/mapas-ventas.component";
import { AuthGuard } from "app/guards/auth.guard";
import { VentasLoteComponent } from 'app/components/ventas/ventas-lote/ventas-lote.component';
import { ActaEntregaComponent } from 'app/components/ventas/acta-entrega/acta-entrega.component';
import { CrearActaEntregaComponent } from 'app/components/ventas/crear-acta-entrega/crear-acta-entrega.component';
import { EditarActaEntregaComponent } from 'app/components/ventas/editar-acta-entrega/editar-acta-entrega.component';
import { ActasEntregaComponent } from 'app/components/ventas/actas-entrega/actas-entrega.component';
import { GenerarActaEntregaComponent } from 'app/components/ventas/generar-acta-entrega/generar-acta-entrega.component';


//resolvers
import { ObrasUsuarioResolverService } from 'app/resolvers/obras-usuario-resolver.service';
import { UsuariosResidentesResolverService } from 'app/resolvers/usuarios-residentes-resolver.service';
import { UsuariosAlmacenistasResolverService } from 'app/resolvers/usuarios-almacenistas-resolver.service';
import { UsuariosContolAlmacenResolverService } from 'app/resolvers/usuarios-contol-almacen-resolver.service';
import { AlertaClientesComponent } from 'app/components/ventas/alerta-clientes/alerta-clientes.component';
import { ClienteSinLoteComponent } from 'app/components/ventas/cliente-sin-lote/cliente-sin-lote.component';
import { EstadisticasVentasComponent } from 'app/components/ventas/estadisticas-ventas/estadisticas-ventas.component';
import { EstadosVentaLoteResolverService } from 'app/resolvers/estados-venta-lote-resolver.service';
import { MapasUsuarioResolverService } from 'app/resolvers/mapas-usuario-resolver.service';
import { FormasPagoResolverService } from 'app/resolvers/formas-pago-resolver.service';
import { InstitucionesCreditoResolverService } from 'app/resolvers/instituciones-credito-resolver.service';
import { TipoOperacionService } from 'app/services/tipo-operacion.service';
import { TiposOperacionResolverService } from 'app/resolvers/tipos-operacion-resolver.service';
import { TiposPagoResolverService } from 'app/resolvers/tipos-pago-resolver.service';
import { SalidasComponent } from 'app/components/almacen/salidas/salidas.component';
import { EntradasComponent } from 'app/components/almacen/entradas/entradas.component';
import { InventarioComponent } from 'app/components/almacen/inventario/inventario.component';
import { NuevaSalidaComponent } from 'app/components/almacen/nueva-salida/nueva-salida.component';
import { NuevaEntradaComponent } from 'app/components/almacen/nueva-entrada/nueva-entrada.component';
import { TrabajadoresComponent } from 'app/components/admin/trabajadores/trabajadores.component';
import { AsignarTrabajadoresComponent } from 'app/components/admin/asignar-trabajadores/asignar-trabajadores.component';
import { EditarEntradaComponent } from 'app/components/almacen/editar-entrada/editar-entrada.component';
import { TableroAdminComponent } from 'app/components/tablero-admin/tablero-admin.component';
import { TableroAvancesComponent } from 'app/components/tablero-avances/tablero-avances.component';
import { TableroVentasComponent } from 'app/components/tablero-ventas/tablero-ventas.component';
import { TableroAlmacenComponent } from 'app/components/tablero-almacen/tablero-almacen.component';
import { UsuarioLoggedResolverService } from 'app/resolvers/usuario-logged-resolver.service';
import { VentasPagosComponent } from 'app/components/ventas/ventas-pagos/ventas-pagos.component';
import { ImagenesLoteComponent } from './components/residente/imagenes-lote/imagenes-lote.component';
import { ProveedoresComponent } from './components/admin/proveedores/proveedores.component';
import { PagosTrabajadoresComponent } from './components/admin/pagos-trabajadores/pagos-trabajadores.component';
import { GastosSobrasComponent } from './components/admin/gastos-sobras/gastos-sobras.component';
import { EspecialidadesTrabajadorResolverService } from './resolvers/especialidades-trabajador-resolver.service';
import { InstitucionesCreditoComponent } from './components/ventas/instituciones-credito/instituciones-credito.component';
import { HistorialApartadosComponent } from './components/comisiones/historial-apartados/historial-apartados.component';
import { ComisionesComponent } from './components/comisiones/comisiones/comisiones.component';
import { VendedoresComponent } from './components/ventas/vendedores/vendedores.component';
import { CrearVendedorDialogoComponent } from './components/ventas/crear-vendedor-dialogo/crear-vendedor-dialogo.component';
import { EditarVendedorDialogoComponent } from './components/ventas/editar-vendedor-dialogo/editar-vendedor-dialogo.component';
import { TableroComisionesComponent } from './components/tablero-comisiones/tablero-comisiones.component';
import { VendedoresResolverService } from './resolvers/vendedores-resolver.service';
import { TiposGastosResolverService } from './resolvers/tipos-gastos-resolver.service';





export const ROUTES: Routes = [


    { path: 'login', component: LoginComponent },

    {
        path: '',
        component: LayoutComponent,
        resolve: {
            usuario: UsuarioLoggedResolverService
        },
        canActivate: [AuthGuard],
        children: [
            { path: '', redirectTo: 'tablero', pathMatch: 'full' },
            {
                path: 'clientes', component: ClientesComponent,
                resolve: {
                    obras: ObrasUsuarioResolverService
                }
            },
            {
                path: 'desarrollos', component: DesarrollosComponent,
                resolve: {
                    obras: ObrasUsuarioResolverService
                }
            },
            {
                path: 'nuevo-cliente', component: NuevoClienteComponent,
                resolve: {
                    obras: ObrasUsuarioResolverService
                }
            },
            { path: 'cliente/:id', component: ClienteComponent },
            {
                path: 'obras', component: ObrasComponent,
                resolve: {
                    //obras: ObrasUsuarioResolverService,
                    residentes: UsuariosResidentesResolverService,
                    almacenistas: UsuariosAlmacenistasResolverService,
                    control_almacen: UsuariosContolAlmacenResolverService
                }
            },
            { path: 'tablero', component: TableroComponent },
            { path: 'editar-prototipo/:id', component: EditarPrototipoComponent },
            {
                path: 'estructura-obra', component: EstructuraObraComponent,
                resolve: {
                    obras: ObrasUsuarioResolverService
                }
            },
            {
                path: 'prototipos', component: PrototiposComponent,
                resolve: {
                    obras: ObrasUsuarioResolverService
                }
            },
            {
                path: 'perfil', component: PerfilComponent,
                resolve: {
                    obras: ObrasUsuarioResolverService
                }
            },
            {
                path: 'avances', component: AvancesComponent,
                resolve: {
                    obras: ObrasUsuarioResolverService
                }
            },
            {
                path: 'mapas-avances', component: MapasAvancesComponent,
                resolve: {
                    obras: MapasUsuarioResolverService
                }
            },
            {
                path: 'mapas-ventas', component: MapasVentasComponent,
                resolve: {
                    obras: MapasUsuarioResolverService
                }
            },
            { path: 'usuarios', component: UsuariosComponent },
            //{ path: 'crear-usuario', component: CrearUsuarioComponent },
            {
                path: 'editar-cliente/:id', component: EditarClienteComponent,
                resolve: {
                    obras: ObrasUsuarioResolverService,
                    formas_pago: FormasPagoResolverService,
                    instituciones_credito: InstitucionesCreditoResolverService,
                    tipos_operacion: TiposOperacionResolverService,
                    tipos_pago: TiposPagoResolverService,
                    estados: EstadosVentaLoteResolverService,
                    vendedores: VendedoresResolverService
                }
            },
            { path: 'acta-entrega/:id', component: ActaEntregaComponent },
            { path: 'crear-acta-entrega', component: CrearActaEntregaComponent },
            { path: 'actas-entrega', component: ActasEntregaComponent },
            { path: 'editar-acta-entrega/:id', component: EditarActaEntregaComponent },
            { path: 'generar-acta-entrega', component: GenerarActaEntregaComponent },
            {
                path: 'ventas/lote/:id', component: VentasLoteComponent,
                resolve: {
                    estados: EstadosVentaLoteResolverService
                }
            },
            {
                path: 'alerta-clientes', component: AlertaClientesComponent,
                resolve: {
                    obras: ObrasUsuarioResolverService
                }
            },
            {
                path: 'clientes-sin-lote', component: ClienteSinLoteComponent,
                resolve: {
                    obras: ObrasUsuarioResolverService
                }
            },
            {
                path: 'estadisticas-ventas', component: EstadisticasVentasComponent,
                resolve: {
                    obras: ObrasUsuarioResolverService
                }
            },
            {
                path: 'salidas', component: SalidasComponent,
                resolve: {
                    obras: ObrasUsuarioResolverService
                }
            },
            {
                path: 'entradas', component: EntradasComponent,
                resolve: {
                    obras: ObrasUsuarioResolverService
                }
            },
            {
                path: 'inventario', component: InventarioComponent,
                resolve: {
                    obras: ObrasUsuarioResolverService
                }
            },
            {
                path: 'nueva-salida', component: NuevaSalidaComponent,
                resolve: {
                    obras: ObrasUsuarioResolverService
                }
            },
            {
                path: 'nueva-entrada', component: NuevaEntradaComponent,
                resolve: {
                    obras: ObrasUsuarioResolverService
                }
            },
            {
                path: 'trabajadores', component: TrabajadoresComponent,
                resolve: {
                    obras: ObrasUsuarioResolverService,
                    especialidades: EspecialidadesTrabajadorResolverService
                }
            },
            {
                path: 'asignar-trabajadores', component: AsignarTrabajadoresComponent,
                resolve: {
                    obras: ObrasUsuarioResolverService
                }
            },
            {
                path: 'editar-entrada/:id', component: EditarEntradaComponent,
                resolve: {
                    estados: EstadosVentaLoteResolverService
                }
            },
            {
                path: 'tablero-admin', component: TableroAdminComponent,
                resolve: {
                    usuario: UsuarioLoggedResolverService
                },
            },
            {
                path: 'tablero-avances', component: TableroAvancesComponent,
                resolve: {
                    usuario: UsuarioLoggedResolverService
                },
            },
            {
                path: 'tablero-ventas', component: TableroVentasComponent,
                resolve: {
                    usuario: UsuarioLoggedResolverService
                },
            },
            {
                path: 'tablero-almacen', component: TableroAlmacenComponent,
                resolve: {
                    usuario: UsuarioLoggedResolverService
                },
            },
            {
                path: 'tablero-comisiones', component: TableroComisionesComponent,
                resolve: {
                    usuario: UsuarioLoggedResolverService
                },
            },
            {
                path: 'ventas-pagos', component: VentasPagosComponent,
                resolve: {
                    obras: ObrasUsuarioResolverService
                }
            },

            {
                path: 'imagenes-lote', component: ImagenesLoteComponent,
                resolve: {
                    obras: ObrasUsuarioResolverService
                }
            },

            {
                path: 'proveedores', component: ProveedoresComponent,
                resolve: {
                    obras: ObrasUsuarioResolverService
                }
            },
            {
                path: 'pagos-trabajadores', component: PagosTrabajadoresComponent,
                resolve: {
                    obras: ObrasUsuarioResolverService
                }
            },
            {
                path: 'gastos-sobras', component: GastosSobrasComponent,
                resolve: {
                    obras: ObrasUsuarioResolverService,
                    tipos: TiposGastosResolverService
                }
            },
            {
                path: 'historial-apartados', component: HistorialApartadosComponent,
                resolve: {
                    obras: ObrasUsuarioResolverService,
                    vendedores: VendedoresResolverService
                }
            },
            {
                path: 'comisiones', component: ComisionesComponent,
                resolve: {
                    obras: ObrasUsuarioResolverService,
                    vendedores: VendedoresResolverService
                }
            },
            {
                path: 'vendedores', component: VendedoresComponent,
                resolve: {
                    obras: ObrasUsuarioResolverService
                }
            },
            { path: 'crear-vendedor-dialogos', component: CrearVendedorDialogoComponent },
            { path: 'editar-vendedor-dialogos', component: EditarVendedorDialogoComponent },
            { path: 'instituciones-credito', component: InstitucionesCreditoComponent }






        ]
    },



    //not found
    { path: '**', redirectTo: 'login' }


];

export const RoutingModule: ModuleWithProviders = RouterModule.forRoot(ROUTES);
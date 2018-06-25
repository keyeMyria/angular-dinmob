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
import { GastosObrasComponent } from './components/admin/gastos-obras/gastos-obras.component';
import { EspecialidadesTrabajadorResolverService } from './resolvers/especialidades-trabajador-resolver.service';
import { InstitucionesCreditoComponent } from './components/ventas/instituciones-credito/instituciones-credito.component';
import { HistorialApartadosComponent } from './components/comisiones/historial-apartados/historial-apartados.component';
import { ComisionesComponent } from './components/comisiones/comisiones/comisiones.component';
import { VendedoresComponent } from './components/ventas/vendedores/vendedores.component';
import { TableroComisionesComponent } from './components/tablero-comisiones/tablero-comisiones.component';
import { VendedoresResolverService } from './resolvers/vendedores-resolver.service';
import { TiposGastosResolverService } from './resolvers/tipos-gastos-resolver.service';
import { ImportarPrototipoComponent } from './components/admin/importar-prototipo/importar-prototipo.component';
import { ProveedoresResolverService } from './resolvers/proveedores-resolver.service';
import { EstadisticasAdminComponent } from './components/admin/estadisticas-admin/estadisticas-admin.component';
import { TrabajadoresResolverService } from './resolvers/trabajadores-resolver.service';
import { ReportesComponent } from './components/admin/reportes/reportes.component';
import { TiposPagoTrabajadorResolverService } from 'app/resolvers/tipos-pago-trabajador-resolver.service';
import { NuevoPedidoComponent } from './components/almacen/nuevo-pedido/nuevo-pedido.component';
import { PedidosComponent } from './components/almacen/pedidos/pedidos.component';
import { RegistroComponent } from './components/admin/registro/registro.component';
import { EditarPedidoComponent } from 'app/components/almacen/editar-pedido/editar-pedido.component';
import { EstadosPedidoResolverService } from './resolvers/estados-pedido-resolver.service';
import { OtrasSalidasComponent } from './components/almacen/otras-salidas/otras-salidas.component';
import { UsuariosResolverService } from './resolvers/usuarios-resolver.service';
import { ArranqueComponent } from './components/admin/arranque/arranque.component';
import { PartidasUrbanizacionResolverService } from 'app/resolvers/partidas-urbanizacion-resolver.service';
import { ReporteComponent } from './components/reportes/reporte/reporte.component';
import { ObraMaterialesTrabajadoresResidentesResolverService } from './resolvers/obra-materiales-trabajadores-residentes-resolver.service';
import { ObraManzanasTrabajadoresResidentesResolverService } from 'app/resolvers/obra-manzanas-trabajadores-residentes-resolver.service';
import { ReportesResolverService } from './resolvers/reportes-resolver.service';
import { ReporteSalidasComponent } from './components/almacen/reporte-salidas/reporte-salidas.component';
import { ReporteEntradasComponent } from './components/almacen/reporte-entradas/reporte-entradas.component';
import { EstadisticasAdminResolverService } from './resolvers/estadisticas-admin-resolver.service';
import { CreditoPuenteComponent } from './components/credito-puente/credito-puente/credito-puente.component';
import { TableroAlmacenistaComponent } from './components/tablero-almacenista/tablero-almacenista.component';
import { TableroAsesorComponent } from './components/tablero-asesor/tablero-asesor.component';
import { TableroContabilidadComponent } from './components/tablero-contabilidad/tablero-contabilidad.component';
import { TableroPedidosComponent } from './components/tablero-pedidos/tablero-pedidos.component';
import { TableroResidenteComponent } from './components/tablero-residente/tablero-residente.component';
import { TableroControlAlmacenComponent } from './components/tablero-control-almacen/tablero-control-almacen.component';

import { Rol } from "./constantes/roles";
import { UsuariosAsesoresResolverService } from './resolvers/usuarios-asesores-resolver.service';
import { HistorialAvancesComponent } from './components/residente/historial-avances/historial-avances.component';


export const ROUTES: Routes = [


    { path: 'login', component: LoginComponent },

    {
        path: '',
        component: LayoutComponent,
        /*  resolve: {
             usuario: UsuarioLoggedResolverService
         }, */
        canActivate: [AuthGuard],
        data: {
            permisos: [Rol.Administrador, Rol.Almacenista, Rol.AsesorVentas, Rol.Contabilidad, Rol.Control, Rol.ControlAlmacen, Rol.Creditos, Rol.Recepcion, Rol.Residente, Rol.Ventas]
        },
        children: [
            //{ path: '', redirectTo: 'tablero', pathMatch: 'full' },
            {
                path: 'escrituracion',
                loadChildren: 'app/escrituracion/escrituracion.module#EscrituracionModule',
                data: { preload: true }
            },
            {
                path: 'clientes', component: ClientesComponent,
                canActivate: [AuthGuard],
                resolve: {
                    obras: ObrasUsuarioResolverService
                },
                data: {
                    permisos: [Rol.Administrador, Rol.Ventas, Rol.AsesorVentas, Rol.Contabilidad]
                }
            },
            {
                path: 'estadisticas', component: EstadisticasAdminComponent,
                canActivate: [AuthGuard],
                resolve: {
                    datos: EstadisticasAdminResolverService
                    //estadisticas: EstadisticasAdminResolverService,
                    //obras: ObrasUsuarioResolverService,
                },
                data: {
                    permisos: [Rol.Administrador]
                }
            },
            {
                path: 'desarrollos', component: DesarrollosComponent,
                canActivate: [AuthGuard],
                resolve: {
                    obras: ObrasUsuarioResolverService
                },
                data: {
                    permisos: [Rol.Administrador, Rol.Ventas, Rol.AsesorVentas]
                }
            },
            {
                path: 'nuevo-cliente', component: NuevoClienteComponent,
                canActivate: [AuthGuard],
                resolve: {
                    obras: ObrasUsuarioResolverService
                },
                data: {
                    permisos: [Rol.Administrador, Rol.Ventas, Rol.AsesorVentas, Rol.Contabilidad]
                }
            },
            { path: 'cliente/:id', component: ClienteComponent },
            {
                path: 'obras', component: ObrasComponent,
                canActivate: [AuthGuard],
                resolve: {
                    //obras: ObrasUsuarioResolverService,
                    residentes: UsuariosResidentesResolverService,
                    almacenistas: UsuariosAlmacenistasResolverService,
                    control_almacen: UsuariosContolAlmacenResolverService
                },
                data: {
                    permisos: [Rol.Administrador]
                }
            },
            {
                path: 'registro', component: RegistroComponent,
                canActivate: [AuthGuard],
                resolve: {
                    usuarios: UsuariosResolverService
                },
                data: {
                    permisos: [Rol.Administrador]
                }
            },
            {
                path: 'editar-prototipo/:id', component: EditarPrototipoComponent,
                canActivate: [AuthGuard],
                data: {
                    permisos: [Rol.Administrador, Rol.ControlAlmacen]
                }
            },
            {
                path: 'estructura-obra', component: EstructuraObraComponent,
                canActivate: [AuthGuard],
                resolve: {
                    obras: ObrasUsuarioResolverService
                },
                data: {
                    permisos: [Rol.Administrador]
                }
            },
            {
                path: 'prototipos', component: PrototiposComponent,
                canActivate: [AuthGuard],
                resolve: {
                    obras: ObrasUsuarioResolverService
                },
                data: {
                    permisos: [Rol.Administrador, Rol.ControlAlmacen]
                }
            },
            {
                path: 'perfil', component: PerfilComponent,
                canActivate: [AuthGuard],
                resolve: {
                    obras: ObrasUsuarioResolverService,
                    //usuario: UsuarioLoggedResolverService
                },
                data: {
                    permisos: [Rol.Administrador, Rol.Ventas, Rol.AsesorVentas, Rol.Almacenista, Rol.Contabilidad, Rol.ControlAlmacen, Rol.Residente, Rol.Recepcion]
                }
            },
            {
                path: 'avances', component: AvancesComponent,
                canActivate: [AuthGuard],
                resolve: {
                    obras: ObrasUsuarioResolverService,
                    //usuario: UsuarioLoggedResolverService
                },
                data: {
                    permisos: [Rol.Administrador, Rol.ControlAlmacen, Rol.Residente]
                }
            },
            {
                path: 'historial-avances', component: HistorialAvancesComponent,
                canActivate: [AuthGuard],
                resolve: {
                    obras: ObrasUsuarioResolverService
                },
                data: {
                    permisos: [Rol.Administrador, Rol.ControlAlmacen, Rol.Residente]
                }
            },
            {
                path: 'mapas-avances', component: MapasAvancesComponent,
                canActivate: [AuthGuard],
                resolve: {
                    obras: MapasUsuarioResolverService
                },
                data: {
                    permisos: [Rol.Administrador, Rol.ControlAlmacen, Rol.Residente]
                }
            },
            {
                path: 'mapas-ventas', component: MapasVentasComponent,
                canActivate: [AuthGuard],
                resolve: {
                    obras: MapasUsuarioResolverService
                },
                data: {
                    permisos: [Rol.Administrador, Rol.Ventas, Rol.AsesorVentas]
                }
            },
            {
                path: 'usuarios', component: UsuariosComponent,
                canActivate: [AuthGuard],
                data: {
                    permisos: [Rol.Administrador]
                }
            },
            {
                path: 'editar-cliente/:id', component: EditarClienteComponent,
                canActivate: [AuthGuard],
                resolve: {
                    obras: ObrasUsuarioResolverService,
                    formas_pago: FormasPagoResolverService,
                    instituciones_credito: InstitucionesCreditoResolverService,
                    tipos_operacion: TiposOperacionResolverService,
                    tipos_pago: TiposPagoResolverService,
                    estados: EstadosVentaLoteResolverService,
                    asesores: UsuariosAsesoresResolverService
                    //vendedores: VendedoresResolverService
                },
                data: {
                    permisos: [Rol.Administrador, Rol.Ventas, Rol.AsesorVentas, Rol.Contabilidad]
                }
            },
            {
                path: 'acta-entrega/:id', component: ActaEntregaComponent,
                canActivate: [AuthGuard],
                data: {
                    permisos: [Rol.Administrador]
                }
            },
            {
                path: 'crear-acta-entrega', component: CrearActaEntregaComponent,
                canActivate: [AuthGuard],
                data: {
                    permisos: [Rol.Administrador]
                }
            },
            {
                path: 'actas-entrega', component: ActasEntregaComponent,
                canActivate: [AuthGuard],
                data: {
                    permisos: [Rol.Administrador]
                }
            },
            {
                path: 'editar-acta-entrega/:id', component: EditarActaEntregaComponent,
                canActivate: [AuthGuard],
                data: {
                    permisos: [Rol.Administrador]
                }
            },
            {
                path: 'generar-acta-entrega', component: GenerarActaEntregaComponent,
                canActivate: [AuthGuard],
                data: {
                    permisos: [Rol.Administrador]
                }
            },
            {
                path: 'ventas/lote/:id', component: VentasLoteComponent,
                canActivate: [AuthGuard],
                resolve: {
                    estados: EstadosVentaLoteResolverService
                },
                data: {
                    permisos: [Rol.Administrador, Rol.Ventas, Rol.AsesorVentas]
                }
            },
            {
                path: 'alerta-clientes', component: AlertaClientesComponent,
                canActivate: [AuthGuard],
                resolve: {
                    obras: ObrasUsuarioResolverService
                },
                data: {
                    permisos: [Rol.Administrador, Rol.Ventas, Rol.AsesorVentas]
                }
            },
            {
                path: 'prospectos', component: ClienteSinLoteComponent,
                canActivate: [AuthGuard],
                resolve: {
                    obras: ObrasUsuarioResolverService
                },
                data: {
                    permisos: [Rol.Administrador, Rol.Ventas, Rol.AsesorVentas]
                }
            },
            {
                path: 'estadisticas-ventas', component: EstadisticasVentasComponent,
                canActivate: [AuthGuard],
                resolve: {
                    obras: ObrasUsuarioResolverService
                },
                data: {
                    permisos: [Rol.Administrador, Rol.Ventas, Rol.AsesorVentas]
                }
            },
            {
                path: 'salidas', component: SalidasComponent,
                canActivate: [AuthGuard],
                resolve: {
                    obras: ObrasUsuarioResolverService,
                    //usuario: UsuarioLoggedResolverService
                },
                data: {
                    permisos: [Rol.Administrador, Rol.Almacenista, Rol.ControlAlmacen, Rol.Residente]
                }
            },
            {
                path: 'entradas', component: EntradasComponent,
                canActivate: [AuthGuard],
                resolve: {
                    obras: ObrasUsuarioResolverService,
                    //usuario: UsuarioLoggedResolverService
                },
                data: {
                    permisos: [Rol.Administrador, Rol.Almacenista, Rol.ControlAlmacen, Rol.Residente]
                }
            },
            {
                path: 'inventario', component: InventarioComponent,
                canActivate: [AuthGuard],
                resolve: {
                    obras: ObrasUsuarioResolverService,
                    //usuario: UsuarioLoggedResolverService
                },
                data: {
                    permisos: [Rol.Administrador, Rol.ControlAlmacen, Rol.Residente]
                }
            },
            {
                path: 'nueva-salida', component: NuevaSalidaComponent,
                canActivate: [AuthGuard],
                resolve: {
                    obras: ObrasUsuarioResolverService,
                    //usuario: UsuarioLoggedResolverService,
                    obra: ObraManzanasTrabajadoresResidentesResolverService,

                },
                data: {
                    permisos: [Rol.Administrador, Rol.Almacenista, Rol.ControlAlmacen, Rol.Residente]
                }
            },
            {
                path: 'otras-salidas', component: OtrasSalidasComponent,
                canActivate: [AuthGuard],
                resolve: {
                    obras: ObrasUsuarioResolverService,
                    obra: ObraMaterialesTrabajadoresResidentesResolverService,
                    partidas_urbanizacion: PartidasUrbanizacionResolverService,
                    //usuario: UsuarioLoggedResolverService
                },
                data: {
                    permisos: [Rol.Administrador, Rol.Almacenista, Rol.ControlAlmacen, Rol.Residente]
                }
            },
            {
                path: 'nueva-entrada', component: NuevaEntradaComponent,
                canActivate: [AuthGuard],
                resolve: {
                    obras: ObrasUsuarioResolverService,
                    proveedores: ProveedoresResolverService
                },
                data: {
                    permisos: [Rol.Administrador, Rol.Almacenista, Rol.ControlAlmacen, Rol.Residente]
                }
            },
            {
                path: 'nuevo-pedido', component: NuevoPedidoComponent,
                canActivate: [AuthGuard],
                resolve: {
                    obras: ObrasUsuarioResolverService,
                    //usuario: UsuarioLoggedResolverService
                },
                data: {
                    permisos: [Rol.Administrador, Rol.ControlAlmacen, Rol.Residente, Rol.Recepcion]
                }
            },
            {
                path: 'pedidos', component: PedidosComponent,
                canActivate: [AuthGuard],
                resolve: {
                    obras: ObrasUsuarioResolverService,
                    //usuario: UsuarioLoggedResolverService
                },
                data: {
                    permisos: [Rol.Administrador, Rol.ControlAlmacen, Rol.Residente, Rol.Recepcion]
                }
            },
            {
                path: 'trabajadores', component: TrabajadoresComponent,
                canActivate: [AuthGuard],
                resolve: {
                    obras: ObrasUsuarioResolverService,
                    especialidades: EspecialidadesTrabajadorResolverService
                },
                data: {
                    permisos: [Rol.Administrador]
                }
            },
            {
                path: 'asignar-trabajadores', component: AsignarTrabajadoresComponent,
                canActivate: [AuthGuard],
                resolve: {
                    obras: ObrasUsuarioResolverService
                },
                data: {
                    permisos: [Rol.Administrador]
                }
            },
            {
                path: 'editar-entrada/:id', component: EditarEntradaComponent,
                canActivate: [AuthGuard],
                resolve: {
                    proveedores: ProveedoresResolverService
                },
                data: {
                    permisos: [Rol.Administrador]
                }
            },
            {
                path: 'tablero', component: TableroComponent,
                canActivate: [AuthGuard],
                /*   resolve: {
                      usuario: UsuarioLoggedResolverService
                  }, */
                data: {
                    permisos: [Rol.Administrador,]
                }
            },
            {
                path: 'tablero-admin', component: TableroAdminComponent,
                canActivate: [AuthGuard],
                /*     resolve: {
                       usuario: UsuarioLoggedResolverService
                    }, */
                data: {
                    permisos: [Rol.Administrador]
                }
            },
            {
                path: 'tablero-avances', component: TableroAvancesComponent,
                canActivate: [AuthGuard],
                /*     resolve: {
                        usuario: UsuarioLoggedResolverService
                    }, */
                data: {
                    permisos: [Rol.Administrador, Rol.ControlAlmacen, Rol.Residente]
                }
            },
            {
                path: 'tablero-ventas', component: TableroVentasComponent,
                canActivate: [AuthGuard],
                /*      resolve: {
                         usuario: UsuarioLoggedResolverService
                     }, */
                data: {
                    permisos: [Rol.Administrador, Rol.Ventas]
                }
            },
            {
                path: 'tablero-almacen', component: TableroAlmacenComponent,
                canActivate: [AuthGuard],
                /*                 resolve: {
                                    usuario: UsuarioLoggedResolverService
                                }, */
                data: {
                    permisos: [Rol.Administrador, Rol.ControlAlmacen, Rol.Residente]
                }
            },
            {
                path: 'tablero-almacenista', component: TableroAlmacenistaComponent,
                canActivate: [AuthGuard],
                /*                 resolve: {
                                    usuario: UsuarioLoggedResolverService
                                }, */
                data: {
                    permisos: [Rol.Almacenista]
                }
            },
            {
                path: 'tablero-asesor', component: TableroAsesorComponent,
                canActivate: [AuthGuard],
                /*                 resolve: {
                                    usuario: UsuarioLoggedResolverService
                                }, */
                data: {
                    permisos: [Rol.AsesorVentas]
                }
            },
            {
                path: 'tablero-contabilidad', component: TableroContabilidadComponent,
                canActivate: [AuthGuard],
                /*                 resolve: {
                                    usuario: UsuarioLoggedResolverService
                                }, */
                data: {
                    permisos: [Rol.Contabilidad]
                }
            },
            {
                path: 'tablero-pedidos', component: TableroPedidosComponent,
                canActivate: [AuthGuard],
                /*                 resolve: {
                                    usuario: UsuarioLoggedResolverService
                                }, */
                data: {
                    permisos: [Rol.Recepcion]
                }
            },
            {
                path: 'tablero-residente', component: TableroResidenteComponent,
                canActivate: [AuthGuard],
                /*                 resolve: {
                                    usuario: UsuarioLoggedResolverService
                                }, */
                data: {
                    permisos: [Rol.Residente]
                }
            },
            {
                path: 'tablero-control-almacen', component: TableroControlAlmacenComponent,
                canActivate: [AuthGuard],
                /*                 resolve: {
                                    usuario: UsuarioLoggedResolverService
                                }, */
                data: {
                    permisos: [Rol.ControlAlmacen]
                }
            },
            {
                path: 'tablero-comisiones', component: TableroComisionesComponent,
                canActivate: [AuthGuard],
                /*                 resolve: {
                                    usuario: UsuarioLoggedResolverService
                                }, */
                data: {
                    permisos: [Rol.Administrador]
                }
            },
            {
                path: 'ventas-pagos', component: VentasPagosComponent,
                canActivate: [AuthGuard],
                resolve: {
                    obras: ObrasUsuarioResolverService,
                    tipos: TiposPagoResolverService
                },
                data: {
                    permisos: [Rol.Administrador, Rol.Ventas, Rol.Contabilidad]
                }
            },

            {
                path: 'imagenes-lote', component: ImagenesLoteComponent,
                canActivate: [AuthGuard],
                resolve: {
                    obras: ObrasUsuarioResolverService,
                    //usuario: UsuarioLoggedResolverService
                },
                data: {
                    permisos: [Rol.Administrador, Rol.ControlAlmacen, Rol.Residente]
                }
            },

            {
                path: 'proveedores', component: ProveedoresComponent,
                canActivate: [AuthGuard],
                data: {
                    permisos: [Rol.Administrador, Rol.ControlAlmacen]
                }
            },
            {
                path: 'pagos-trabajadores', component: PagosTrabajadoresComponent,
                canActivate: [AuthGuard],
                resolve: {
                    obras: ObrasUsuarioResolverService,
                    tipos: TiposPagoTrabajadorResolverService
                },
                data: {
                    permisos: [Rol.Administrador]
                }
            },
            {
                path: 'gastos-obras', component: GastosObrasComponent,
                canActivate: [AuthGuard],
                resolve: {
                    obras: ObrasUsuarioResolverService,
                    tipos: TiposGastosResolverService
                },
                data: {
                    permisos: [Rol.Administrador, Rol.Contabilidad]
                }
            },
            {
                path: 'historial-apartados', component: HistorialApartadosComponent,
                canActivate: [AuthGuard],
                resolve: {
                    obras: ObrasUsuarioResolverService,
                },
                data: {
                    permisos: [Rol.Administrador, Rol.Ventas, Rol.AsesorVentas]
                }
            },
            {
                path: 'comisiones', component: ComisionesComponent,
                canActivate: [AuthGuard],
                resolve: {
                    obras: ObrasUsuarioResolverService,
                    //usuario: UsuarioLoggedResolverService
                },
                data: {
                    permisos: [Rol.Administrador, Rol.Ventas]
                }
            },
            {
                path: 'vendedores', component: VendedoresComponent,
                canActivate: [AuthGuard],
                resolve: {
                    obras: ObrasUsuarioResolverService
                },
                data: {
                    permisos: [Rol.Administrador, Rol.Ventas, Rol.AsesorVentas]
                }
            },
            {
                path: 'editar-pedido/:id/:obra', component: EditarPedidoComponent,
                canActivate: [AuthGuard],
                resolve: {
                    obras: ObrasUsuarioResolverService,
                    estados: EstadosPedidoResolverService
                },
                data: {
                    permisos: [Rol.Administrador, Rol.ControlAlmacen, Rol.Recepcion]
                }
            },
            {
                path: 'instituciones-credito', component: InstitucionesCreditoComponent,
                canActivate: [AuthGuard],
                data: {
                    permisos: [Rol.Administrador, Rol.Ventas, Rol.AsesorVentas]
                }
            },
            {
                path: 'importar-prototipo', component: ImportarPrototipoComponent,
                canActivate: [AuthGuard],
                resolve: {
                    obras: ObrasUsuarioResolverService
                },
                data: {
                    permisos: [Rol.Administrador, Rol.ControlAlmacen]
                }
            },
            {
                path: 'reportes', component: ReportesComponent,
                canActivate: [AuthGuard],
                resolve: {
                    obras: ObrasUsuarioResolverService
                },
                data: {
                    permisos: [Rol.Administrador, Rol.Ventas, Rol.AsesorVentas]
                }
            },
            {
                path: 'arranque', component: ArranqueComponent,
                canActivate: [AuthGuard],
                resolve: {
                    obras: ObrasUsuarioResolverService,
                },
                data: {
                    permisos: [Rol.Administrador, Rol.ControlAlmacen]
                }
            },
            {
                path: 'reporte', component: ReporteComponent,
                canActivate: [AuthGuard],
                resolve: {
                    obras: ObrasUsuarioResolverService,
                    tipos: ReportesResolverService
                },
                data: {
                    permisos: [Rol.Administrador]
                }
            },
            {
                path: 'reporte-salidas', component: ReporteSalidasComponent,
                canActivate: [AuthGuard],
                resolve: {
                    obras: ObrasUsuarioResolverService
                },
                data: {
                    permisos: [Rol.Administrador, Rol.ControlAlmacen]
                }
            },
            {
                path: 'reporte-entradas', component: ReporteEntradasComponent,
                canActivate: [AuthGuard],
                resolve: {
                    obras: ObrasUsuarioResolverService
                },
                data: {
                    permisos: [Rol.Administrador, Rol.ControlAlmacen]
                }
            },
            {
                path: 'credito-puente', component: CreditoPuenteComponent,
                canActivate: [AuthGuard],
                resolve: {
                    obras: ObrasUsuarioResolverService
                },
                data: {
                    permisos: [Rol.Administrador, Rol.Contabilidad]
                }
            },
            /*       {
                      path: 'tablero-escrituracion', component: TableroEscrituracionComponent,
                      canActivate: [AuthGuard],
                      data: {
                          permisos: [Rol.Administrador, Rol.Contabilidad]
                      }
                  }, */
            /*     {
                    path: 'escrituracion/configuracion', component: ConfiguracionEscrituracionComponent,
                    canActivate: [AuthGuard],
                    resolve: {
                        obras: ObrasUsuarioResolverService
                    },
                    data: {
                        permisos: [Rol.Administrador, Rol.Contabilidad]
                    }
                }, */
            /*   {
                  path: 'escrituracion/equipos', component: EquiposVentasEscrituracionComponent,
                  canActivate: [AuthGuard],
                  resolve: {
                      obras: ObrasUsuarioResolverService
                  },
                  data: {
                      permisos: [Rol.Administrador, Rol.Contabilidad]
                  }
              }, */
            /*     {
                    path: 'escrituracion/clientes', component: ClientesEscrituracionComponent,
                    canActivate: [AuthGuard],
                    resolve: {
                        obras: ObrasUsuarioResolverService
                    },
                    data: {
                        permisos: [Rol.Administrador, Rol.Contabilidad]
                    }
                }, */

            /*    {
                   path: 'escrituracion/lotes', component: LotesEscrituracionComponent,
                   canActivate: [AuthGuard],
                   resolve: {
                       obras: ObrasUsuarioResolverService
                   },
                   data: {
                       permisos: [Rol.Administrador, Rol.Contabilidad]
                   }
               }, */
            /*     {
                    path: 'escrituracion/mapas', component: MapasEscrituracionComponent,
                    canActivate: [AuthGuard],
                    resolve: {
                        obras: MapasUsuarioResolverService
                    },
                    data: {
                        permisos: [Rol.Administrador, Rol.Contabilidad]
                    }
                }, */
            /*           {
                          path: 'escrituracion/editar', component: EditarClienteEscrituracionComponent
                      },
           */






        ]
    },



    //not found
    { path: '**', redirectTo: 'login' }


];

export const RoutingModule: ModuleWithProviders = RouterModule.forRoot(ROUTES);
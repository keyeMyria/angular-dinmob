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
import { CrearUsuarioComponent } from "app/components/admin/crear-usuario/crear-usuario.component";
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





export const ROUTES: Routes = [
    {
        path: '',
        component: LayoutComponent,
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
            { path: 'nuevo-cliente', component: NuevoClienteComponent },
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
            { path: 'mapas-avances', component: MapasAvancesComponent },
            {
                path: 'mapas-ventas', component: MapasVentasComponent,
                resolve: {
                    obras: ObrasUsuarioResolverService
                }
            },
            { path: 'usuarios', component: UsuariosComponent },
            { path: 'crear-usuario', component: CrearUsuarioComponent },
            { path: 'editar-cliente/:id', component: EditarClienteComponent },
            { path: 'acta-entrega/:id', component: ActaEntregaComponent },
            { path: 'crear-acta-entrega', component: CrearActaEntregaComponent },
            { path: 'actas-entrega', component: ActasEntregaComponent },
            { path: 'editar-acta-entrega/:id', component: EditarActaEntregaComponent },
            { path: 'generar-acta-entrega', component: GenerarActaEntregaComponent },
            { path: 'ventas/lote/:id', component: VentasLoteComponent },
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









        ]
    },

    { path: 'login', component: LoginComponent },

    //not found
    { path: '**', redirectTo: 'tablero' }


];

export const RoutingModule: ModuleWithProviders = RouterModule.forRoot(ROUTES);
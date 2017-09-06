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
import { CambiarPasswordDialogoComponent } from "app/components/admin/cambiar-password-dialogo/cambiar-password-dialogo.component";
import { ConfirmarBorradoDialogoComponent } from "app/components/admin/confirmar-borrado-dialogo/confirmar-borrado-dialogo.component";
import { EditarUsuarioDialogoComponent } from "app/components/admin/editar-usuario-dialogo/editar-usuario-dialogo.component";
import { EditarClienteComponent } from "app/components/ventas/editar-cliente/editar-cliente.component";
import { MapasVentasComponent } from "app/components/ventas/mapas-ventas/mapas-ventas.component";
import { AuthGuard } from "app/guards/auth.guard";
import { AgregarObraDialogoComponent } from "app/components/admin/agregar-obra-dialogo/agregar-obra-dialogo.component";
import { AgregarDocumentoDialogoComponent } from "app/components/ventas/agregar-documento-dialogo/agregar-documento-dialogo.component";
import { CrearUsuarioDialogoComponent } from "app/components/admin/crear-usuario-dialogo/crear-usuario-dialogo.component";



export const ROUTES: Routes = [
    {
        path: '',
        component: LayoutComponent,
        canActivate:[AuthGuard],
        children: [
            { path: '', redirectTo: 'tablero', pathMatch: 'full' },
            { path: 'clientes', component: ClientesComponent },
            { path: 'desarrollos', component: DesarrollosComponent },
            { path: 'nuevo-cliente', component: NuevoClienteComponent },
            { path: 'cliente/:id', component: ClienteComponent },
            { path: 'obras', component: ObrasComponent },
            { path: 'tablero', component: TableroComponent },
            { path: 'editar-prototipo', component: EditarPrototipoComponent },
            { path: 'estructura-obra', component: EstructuraObraComponent },
            { path: 'prototipos', component: PrototiposComponent },
            { path: 'perfil', component: PerfilComponent },
            { path: 'avances', component: AvancesComponent },
            { path: 'mapas-avances', component: MapasAvancesComponent },
            { path: 'mapas-ventas', component: MapasVentasComponent },
            { path: 'usuarios', component: UsuariosComponent },
            { path: 'crear-usuario', component: CrearUsuarioComponent },
            { path: 'cambiar-password-dialogo', component: CambiarPasswordDialogoComponent },
            { path: 'confirmar-borrado-dialogo', component: ConfirmarBorradoDialogoComponent },
            { path: 'editar-usuario-dialogo', component: EditarUsuarioDialogoComponent },
            { path: 'editar-cliente', component: EditarClienteComponent },
            { path: 'agregar-obra-dialogo', component: AgregarObraDialogoComponent },
            { path: 'agregar-documento-dialogo', component: AgregarDocumentoDialogoComponent },
            { path: 'crear-usuario-dialogo', component: CrearUsuarioDialogoComponent },




        ]
    },

    { path: 'login', component: LoginComponent },

    //not found
    { path: '**', redirectTo: 'tablero' }


];

export const RoutingModule: ModuleWithProviders = RouterModule.forRoot(ROUTES);
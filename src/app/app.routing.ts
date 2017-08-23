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


export const ROUTES: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'tablero', pathMatch: 'full' },
            { path: 'clientes', component: ClientesComponent },
            { path: 'desarrollos', component: DesarrollosComponent },
            { path: 'nuevo-cliente', component: NuevoClienteComponent },
            { path: 'cliente/:id', component: ClienteComponent },
            { path: 'obras', component: ObrasComponent },
            { path: 'tablero', component: TableroComponent },


        ]
    },

    { path: 'login', component: LoginComponent },

    //not found
    { path: '**', redirectTo: 'login' }


];

export const RoutingModule: ModuleWithProviders = RouterModule.forRoot(ROUTES);
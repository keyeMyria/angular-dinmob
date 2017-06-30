import { ModuleWithProviders } from '@angular/core/src/metadata/ng_module';
import { Routes, RouterModule } from '@angular/router';

//ventas
import { ClientesComponent } from './components/ventas/clientes/clientes.component';
import { DesarrollosComponent } from './components/ventas/desarrollos/desarrollos.component';
import { NuevoClienteComponent } from './components/ventas/nuevo-cliente/nuevo-cliente.component';
import { ClienteComponent } from './components/ventas/cliente/cliente.component';


export const ROUTES: Routes = [
    { path: '', redirectTo: 'desarrollos', pathMatch: 'full' },
/*    { path: 'home', component: HomeComponent },
    { path: 'about', component: AboutComponent },*/


    { path: 'clientes', component: ClientesComponent },
    { path: 'desarrollos', component: DesarrollosComponent },
    { path: 'nuevo-cliente', component: NuevoClienteComponent },
    { path: 'cliente/:id', component: ClienteComponent }



];

export const RoutingModule: ModuleWithProviders = RouterModule.forRoot(ROUTES);
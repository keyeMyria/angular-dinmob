import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Rol } from "app/constantes/roles";
import { AuthGuard } from 'app/guards/auth.guard';
// import { TableroEscrituracionComponent } from './components/tablero-escrituracion/tablero-escrituracion.component';
// import { HomeComponent } from 'app/escrituracion/components/home/home.component';
import { TableroComponent } from './components/tablero/tablero.component';
import { ConfiguracionEscrituracionComponent } from './components/configuracion-escrituracion/configuracion-escrituracion.component';
import { ObrasUsuarioResolverService } from 'app/resolvers/obras-usuario-resolver.service';
import { EquiposVentasEscrituracionComponent } from './components/equipos-ventas-escrituracion/equipos-ventas-escrituracion.component';
import { ClientesEscrituracionComponent } from './components/clientes-escrituracion/clientes-escrituracion.component';
import { LotesEscrituracionComponent } from './components/lotes-escrituracion/lotes-escrituracion.component';
import { MapasEscrituracionComponent } from './components/mapas-escrituracion/mapas-escrituracion.component';
import { MapasUsuarioResolverService } from 'app/resolvers/mapas-usuario-resolver.service';
import { EditarClienteEscrituracionComponent } from './components/editar-cliente-escrituracion/editar-cliente-escrituracion.component';



const routes: Routes = [

  /*   {
      path: 'escrituracion',
      //component: HomeComponent,
      children: [ */

  {
    path: 'escrituracion', component: TableroComponent,
    canActivate: [AuthGuard],
    data: {
      permisos: [Rol.Administrador, Rol.Contabilidad]
    }
  },
  {
    path: '', component: TableroComponent,
    canActivate: [AuthGuard],
    data: {
      permisos: [Rol.Administrador, Rol.Contabilidad]
    }
  },
  {
    path: 'configuracion', component: ConfiguracionEscrituracionComponent,
    canActivate: [AuthGuard],
    resolve: {
      obras: ObrasUsuarioResolverService
    },
    data: {
      permisos: [Rol.Administrador, Rol.Contabilidad]
    }
  },
  {
    path: 'equipos', component: EquiposVentasEscrituracionComponent,
    canActivate: [AuthGuard],
    resolve: {
      obras: ObrasUsuarioResolverService
    },
    data: {
      permisos: [Rol.Administrador, Rol.Contabilidad]
    }
  },
  {
    path: 'clientes', component: ClientesEscrituracionComponent,
    canActivate: [AuthGuard],
    resolve: {
      obras: ObrasUsuarioResolverService
    },
    data: {
      permisos: [Rol.Administrador, Rol.Contabilidad]
    }
  },

  {
    path: 'lotes', component: LotesEscrituracionComponent,
    canActivate: [AuthGuard],
    resolve: {
      obras: ObrasUsuarioResolverService
    },
    data: {
      permisos: [Rol.Administrador, Rol.Contabilidad]
    }
  },
  {
    path: 'mapas', component: MapasEscrituracionComponent,
    canActivate: [AuthGuard],
    resolve: {
      obras: MapasUsuarioResolverService
    },
    data: {
      permisos: [Rol.Administrador, Rol.Contabilidad]
    }
  },
  {
    path: 'editar', component: EditarClienteEscrituracionComponent
  }


  /*     ]
    } */

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EscrituracionRoutingModule { }

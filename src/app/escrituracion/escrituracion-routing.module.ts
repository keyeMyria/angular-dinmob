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
import { FormasPagoResolverService } from '../resolvers/formas-pago-resolver.service';
import { TiposPagoResolverService } from '../resolvers/tipos-pago-resolver.service';
import { GraficasVentasComponent } from './components/graficas-ventas/graficas-ventas.component';
import { HistorialVentasComponent } from './components/historial-ventas/historial-ventas.component';
import { LotesInfonavitComponent } from './components/lotes-infonavit/lotes-infonavit.component';
import { LotesFovisssteComponent } from './components/lotes-fovissste/lotes-fovissste.component';
import { ComentariosPosventasComponent } from './components/comentarios-posventas/comentarios-posventas.component';
import { EncuestaSatisfaccionComponent } from './components/encuesta-satisfaccion/encuesta-satisfaccion.component';
import { ProyeccionFinancieraComponent } from './components/proyeccion-financiera/proyeccion-financiera.component';
import { LotesPorVenderComponent } from './components/lotes-por-vender/lotes-por-vender.component';
import { LotesEnTramiteComponent } from './components/lotes-en-tramite/lotes-en-tramite.component';



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
      obras: MapasUsuarioResolverService,
      formas_pago: FormasPagoResolverService,
      tipos_pago: TiposPagoResolverService,
    },
    data: {
      permisos: [Rol.Administrador, Rol.Contabilidad]
    }
  },
  {
    path: 'editar', component: EditarClienteEscrituracionComponent
  },
  {
    path: 'graficas-ventas', component: GraficasVentasComponent,
    canActivate: [AuthGuard],
    resolve: {
      obras: ObrasUsuarioResolverService,
    },
    data: {
      permisos: [Rol.Administrador, Rol.Contabilidad]
    }
  },
  {
    path: 'historial-ventas', component: HistorialVentasComponent,
    canActivate: [AuthGuard],
    data: {
      permisos: [Rol.Administrador, Rol.Contabilidad]
    }
  },
  {
    path: 'lotes-infonavit', component: LotesInfonavitComponent,
    canActivate: [AuthGuard],
    data: {
      permisos: [Rol.Administrador, Rol.Contabilidad]
    }
  },
  {
    path: 'lotes-fovissste', component: LotesFovisssteComponent,
    canActivate: [AuthGuard],
    data: {
      permisos: [Rol.Administrador, Rol.Contabilidad]
    }
  },
  {
    path: 'comentarios-posventa', component: ComentariosPosventasComponent,
    canActivate: [AuthGuard],
    resolve: {
      obras: ObrasUsuarioResolverService
    },
    data: {
      permisos: [Rol.Administrador, Rol.Contabilidad]
    }
  },
  {
    path: 'encuesta-satisfaccion', component: EncuestaSatisfaccionComponent,
    canActivate: [AuthGuard],
    resolve: {
      obras: ObrasUsuarioResolverService
    },
    data: {
      permisos: [Rol.Administrador, Rol.Contabilidad]
    }
  },
  {
    path: 'proyeccion-financiera', component: ProyeccionFinancieraComponent,
    canActivate: [AuthGuard],
    data: {
      permisos: [Rol.Administrador, Rol.Contabilidad]
    }
  },
  {
    path: 'lotes-por-vender', component: LotesPorVenderComponent,
    canActivate: [AuthGuard],
    data: {
      permisos: [Rol.Administrador, Rol.Contabilidad]
    }
  },
  {
    path: 'lotes-en-tramite', component: LotesEnTramiteComponent,
    canActivate: [AuthGuard],
    data: {
      permisos: [Rol.Administrador, Rol.Contabilidad]
    }
  },


  /*     ]
    } */

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EscrituracionRoutingModule { }

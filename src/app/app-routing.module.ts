import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NoEncontradoComponent } from './components/no-encontrado/no-encontrado.component';
import { AltaPedidoComponent } from './components/pedidos/alta-pedido/alta-pedido.component';
import { AltaProductoComponent } from './components/productos/alta-producto/alta-producto.component';
import { AltaUsuarioExternoComponent } from './components/usuarios/alta-usuario-externo/alta-usuario-externo.component';
import { AltaSocioComponent } from './components/socios/alta-socio/alta-socio.component';
import { AltaPromocionComponent } from './components/promociones/alta-promocion/alta-promocion.component';
import { ListadoPedidosComponent } from './components/pedidos/listado-pedidos/listado-pedidos.component';
import { ListadoProductosComponent } from './components/productos/listado-productos/listado-productos.component';
import { ListadoSociosComponent } from './components/socios/listado-socios/listado-socios.component';
import { ListadoPromocionesComponent } from './components/promociones/listado-promociones/listado-promociones.component';
import { ListadoPromocionesVigentesComponent } from './components/promociones/listado-promociones-vigentes/listado-promociones-vigentes.component';
import { AltaGustosComponent } from './components/gustos/alta-gustos/alta-gustos.component';
import { ListadoGustosComponent } from './components/gustos/listado-gustos/listado-gustos.component';
import { ReporteSociosComponent } from './components/reportes/reporte-socios/reporte-socios.component';
import { ReporteProductosComponent } from './components/reportes/reporte-productos/reporte-productos.component';
import { ListadoPedidosPendientesComponent } from './components/pedidos/listado-pedidos-pendientes/listado-pedidos-pendientes.component';
const routes: Routes = [
  {path : 'home', component: HomeComponent},
  {path : 'pedidos/nuevo', component: AltaPedidoComponent},
  {path : 'pedidos/listado', component: ListadoPedidosComponent},
  {path : 'pedidos/pendientes', component: ListadoPedidosPendientesComponent},
  {path : 'productos/nuevo',component : AltaProductoComponent},
  { path : 'productos/listado', component: ListadoProductosComponent},
  { path : 'productos/nuevo/:id', component: AltaProductoComponent},
  { path : 'reporte/productos', component: ReporteProductosComponent},
  {path : 'reporte/socios', component : ReporteSociosComponent},
  {path : 'registro',component : AltaUsuarioExternoComponent},
  {path : 'login', component: LoginComponent},
  { path : 'socios/nuevo', component : AltaSocioComponent},
  { path : 'socios/nuevo/:id', component : AltaSocioComponent},
  { path : 'socios/listado', component : ListadoSociosComponent},
  { path : 'promociones/nuevo', component : AltaPromocionComponent},
  {path : 'promociones/listado', component: ListadoPromocionesComponent},
  { path : 'promociones/listado/vigentes' , component : ListadoPromocionesVigentesComponent},
  {path : 'gustos/listado' , component: ListadoGustosComponent},
  {path : '', redirectTo: 'home', pathMatch: 'full'},
  {path : '**' ,component : NoEncontradoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

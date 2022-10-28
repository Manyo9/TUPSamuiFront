import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NoEncontradoComponent } from './components/no-encontrado/no-encontrado.component';
import { AltaPedidoComponent } from './components/pedidos/alta-pedido/alta-pedido.component';
import { AltaProductoComponent } from './components/productos/alta-producto/alta-producto.component';
import { AltaUsuarioExternoComponent } from './components/usuarios/alta-usuario-externo/alta-usuario-externo.component';
import { AltaSocioComponent } from './components/socios/alta-socio/alta-socio.component';
import { ReporteComponent } from './components/productos/reporte/reporte.component';
import { AltaPromocionComponent } from './components/promociones/alta-promocion/alta-promocion.component';
import { ListadoPedidosComponent } from './components/pedidos/listado-pedidos/listado-pedidos.component';
import { ListadoProductosComponent } from './components/productos/listado-productos/listado-productos.component';
import { ListadoSociosComponent } from './components/socios/listado-socios/listado-socios.component';
const routes: Routes = [
  {path : 'home', component: HomeComponent},
  {path : 'pedidos/nuevo', component: AltaPedidoComponent},
  {path : 'pedidos/listado', component: ListadoPedidosComponent},
  {path : 'productos/nuevo',component : AltaProductoComponent},
  { path : 'productos/listado', component: ListadoProductosComponent},
  {path : 'reporte', component : ReporteComponent},
  {path : 'registro',component : AltaUsuarioExternoComponent},
  {path : 'login', component: LoginComponent},
  { path : 'socios/nuevo', component : AltaSocioComponent},
  { path : 'socios/listado', component : ListadoSociosComponent},
  { path : 'promociones/nuevo', component : AltaPromocionComponent},
  {path : '', redirectTo: 'home', pathMatch: 'full'},
  {path : '**' ,component : NoEncontradoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

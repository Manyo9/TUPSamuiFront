import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NoEncontradoComponent } from './no-encontrado/no-encontrado.component';
import { AltaPedidoComponent } from './pedidos/alta-pedido/alta-pedido.component';
import { AltaProductoComponent } from './productos/alta-producto/alta-producto.component';
import { AltaUsuarioExternoComponent } from './usuarios/alta-usuario-externo/alta-usuario-externo.component';
import { AltaSocioComponent } from './socios/alta-socio/alta-socio.component';

const routes: Routes = [
  {path : 'home', component: HomeComponent},
  {path : 'pedidos/nuevo', component: AltaPedidoComponent},
  {path : 'productos/nuevo',component : AltaProductoComponent},
  {path : 'registro',component : AltaUsuarioExternoComponent},
  {path : 'login', component: LoginComponent},
  { path : 'socios/nuevo', component : AltaSocioComponent},
  {path : '', redirectTo: 'home', pathMatch: 'full'},
  {path : '**' ,component : NoEncontradoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

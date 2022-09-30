import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AltaPedidoComponent } from './pedidos/alta-pedido/alta-pedido.component';
import { AltaProductoComponent } from './productos/alta-producto/alta-producto.component';

const routes: Routes = [
  {path : 'home', component: HomeComponent},
  {path : 'pedidos/nuevo', component: AltaPedidoComponent},
  {path : 'productos/nuevo',component : AltaProductoComponent},
  {path : 'login', component: LoginComponent},
  {path : '', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AltaPedidoComponent } from './pedidos/alta-pedido/alta-pedido.component';

const routes: Routes = [
  {path : 'home',component: HomeComponent},
  {path : 'pedidos/nuevo', component: AltaPedidoComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AltaSocioComponent } from './socios/alta-socio/alta-socio.component';
import { AltaProductoComponent } from './productos/alta-producto/alta-producto.component';
import { AltaUsuarioExternoComponent } from './usuarios/alta-usuario-externo/alta-usuario-externo.component';
import { AltaPedidoComponent } from './pedidos/alta-pedido/alta-pedido.component';
import { UsuarioService } from './services/usuario.service';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ItemProductoComponent } from './pedidos/item-producto/item-producto.component';
import { Pedido } from './models/pedido';
import { PedidoService } from './services/pedido.service';
import { NoEncontradoComponent } from './no-encontrado/no-encontrado.component';
import { ProductoService } from './services/producto.service';
import { SocioService } from './services/socio.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    NavbarComponent,
    AltaSocioComponent,
    AltaProductoComponent,
    AltaUsuarioExternoComponent,
    AltaPedidoComponent,
    ItemProductoComponent,
    NoEncontradoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    UsuarioService,
    PedidoService,
    ProductoService,
    SocioService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

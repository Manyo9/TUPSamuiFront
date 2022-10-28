import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AltaSocioComponent } from './components/socios/alta-socio/alta-socio.component';
import { AltaProductoComponent } from './components/productos/alta-producto/alta-producto.component';
import { AltaUsuarioExternoComponent } from './components/usuarios/alta-usuario-externo/alta-usuario-externo.component';
import { AltaPedidoComponent } from './components/pedidos/alta-pedido/alta-pedido.component';
import { UsuarioService } from './services/usuario.service';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ItemProductoComponent } from './components/pedidos/item-producto/item-producto.component';
import { Pedido } from './models/pedido';
import { PedidoService } from './services/pedido.service';
import { NoEncontradoComponent } from './components/no-encontrado/no-encontrado.component';
import { ProductoService } from './services/producto.service';
import { SocioService } from './services/socio.service';
import { ReporteComponent } from './components/productos/reporte/reporte.component';
import { AltaPromocionComponent } from './components/promociones/alta-promocion/alta-promocion.component';
import { PromocionService } from './services/promocion.service';
import { GustoService } from './services/gusto.service';
import { ListadoPedidosComponent } from './components/pedidos/listado-pedidos/listado-pedidos.component';
import { SesionIniciadaService } from './services/sesion-iniciada.service';
import { CerrarSesionComponent } from './components/cerrar-sesion/cerrar-sesion.component';


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
    NoEncontradoComponent,
    ReporteComponent,
    AltaPromocionComponent,
    ListadoPedidosComponent,
    CerrarSesionComponent
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
    SocioService,
    PromocionService,
    GustoService,
    SesionIniciadaService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

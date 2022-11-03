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
import { AltaPromocionComponent } from './components/promociones/alta-promocion/alta-promocion.component';
import { PromocionService } from './services/promocion.service';
import { GustoService } from './services/gusto.service';
import { ListadoPedidosComponent } from './components/pedidos/listado-pedidos/listado-pedidos.component';
import { SesionIniciadaService } from './services/sesion-iniciada.service';
import { CerrarSesionComponent } from './components/cerrar-sesion/cerrar-sesion.component';
import { ListadoProductosComponent } from './components/productos/listado-productos/listado-productos.component';
import { ListadoSociosComponent } from './components/socios/listado-socios/listado-socios.component';
import { BajaProductoComponent } from './components/productos/baja-producto/baja-producto.component';
import { BajaSocioComponent } from './components/socios/baja-socio/baja-socio.component';
import { ListadoPromocionesComponent } from './components/promociones/listado-promociones/listado-promociones.component';
import { BajaPromocionComponent } from './components/promociones/baja-promocion/baja-promocion.component';
import { ListadoPromocionesVigentesComponent } from './components/promociones/listado-promociones-vigentes/listado-promociones-vigentes.component';
import { DetallesPedidoComponent } from './components/pedidos/detalles-pedido/detalles-pedido.component';
import { AltaGustosComponent } from './components/gustos/alta-gustos/alta-gustos.component';
import { ListadoGustosComponent } from './components/gustos/listado-gustos/listado-gustos.component';
import { BajaGustosComponent } from './components/gustos/baja-gustos/baja-gustos.component';
import { ReporteSociosComponent } from './components/reportes/reporte-socios/reporte-socios.component';
import { NgChartsModule } from 'ng2-charts';
import { ReporteProductosComponent } from './components/reportes/reporte-productos/reporte-productos.component';
import { DetallesSocioComponent } from './components/socios/detalles-socio/detalles-socio.component';
import { CobroComponent } from './components/pedidos/cobro/cobro.component';
import { TipoPagoService } from './services/tipo-pago.service';
import { ListadoPedidosPendientesComponent } from './components/pedidos/listado-pedidos-pendientes/listado-pedidos-pendientes.component';

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
    AltaPromocionComponent,
    ListadoPedidosComponent,
    CerrarSesionComponent,
    ListadoProductosComponent,
    ListadoSociosComponent,
    BajaProductoComponent,
    BajaSocioComponent,
    ListadoPromocionesComponent,
    BajaPromocionComponent,
    ListadoPromocionesVigentesComponent,
    AltaGustosComponent,
    ListadoGustosComponent,
    DetallesPedidoComponent,
    BajaGustosComponent,
    ReporteSociosComponent,
    ReporteProductosComponent,
    DetallesSocioComponent,
    CobroComponent,
    ListadoPedidosPendientesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgChartsModule
  ],
  providers: [
    UsuarioService,
    PedidoService,
    ProductoService,
    SocioService,
    PromocionService,
    GustoService,
    SesionIniciadaService,
    TipoPagoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

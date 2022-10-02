import { Producto } from "./producto";

export class DetallePedido {
    idDetalle?: number;
    idPedido?: number;
    producto: Producto;
    idPromocion?: number;
    cantidad: number;
    precioUnitario: number;
    porcentajeDescuento?: number;
    puntosGanados?: number;
    comentarios?: string;
}

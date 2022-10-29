import { Producto } from "./producto";

export class Promocion {
    id : number;
    nombre : string;
    descripcion : string;
    precioPuntos : number;
    productos: Producto[];
    fechaDesde : Date;
    fechaHasta : Date;
}

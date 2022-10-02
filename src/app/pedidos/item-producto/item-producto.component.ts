import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DetallePedido } from 'src/app/models/detalle-pedido';
import { Producto } from 'src/app/models/producto';

@Component({
  selector: 'app-item-producto',
  templateUrl: './item-producto.component.html',
  styleUrls: ['./item-producto.component.css']
})
export class ItemProductoComponent implements OnInit {
  controlComentarios = new FormControl('');
  rutaDefault = "../../assets/img/img-predet.png";
  gustos: any[] = [
    {
      nombre: "Menta",
      disponible: true
    },
    {
      nombre: "Chocolate",
      disponible: false
    },
    {
      nombre: "Banana Split",
      disponible: true
    },
    {
      nombre: "Crema americana",
      disponible: true
    },
    {
      nombre: "Tiramisú",
      disponible: false
    },
    {
      nombre: "Cereza",
      disponible: true
    },
    {
      nombre: "Chocolate Blanco",
      disponible: true
    },
    {
      nombre: "Dulce de leche",
      disponible: true
    },
    {
      nombre: "Tramontana",
      disponible: true
    },
    {
      nombre: "Crema cookie",
      disponible: true
    },
    {
      nombre: "Tiramisú",
      disponible: false
    },
    {
      nombre: "Marroc",
      disponible: true
    },
    {
      nombre: "Ferrero rocher",
      disponible: true
    },
    {
      nombre: "Kinder",
      disponible: true
    },
    {
      nombre: "Nutella",
      disponible: true
    },
    {
      nombre: "Limón",
      disponible: true
    }
  ]
  @Input() modalId: number = 1;
  // @Input() nombre: string;
  // @Input() descripcion: string;
  // @Input() precio: string;
  // @Input() imgSrc: string;
  @Input() producto: Producto;
  @Output() onAgregar = new EventEmitter<DetallePedido>();
  cantidad: number = 1;
  detalle: DetallePedido;
  constructor(){}
  ngOnInit(): void {
  }
  agregar(){
    this.detalle = {
      producto: this.producto,
      cantidad: this.cantidad,
      precioUnitario: this.producto.precio,
      puntosGanados: this.producto.puntosGanados,
      comentarios: this.controlComentarios.value? this.controlComentarios.value : ""
    }
    this.onAgregar.emit(this.detalle);
    this.limpiarModal();
  }
  limpiarModal():void {
    this.detalle = new DetallePedido();
    this.controlComentarios.setValue("");
    this.cantidad = 1;
  }
  cambioCantidad(esSuma: boolean) {
    if(esSuma) {
      if(this.cantidad >= 10){
        return
      }
      this.cantidad=this.cantidad+1;
    }
    else {
      if(this.cantidad <= 1){
        return
      }
      this.cantidad=this.cantidad-1;
      
    }
  }



}

import {Categoria, Estado} from "./ProductoEnums"

export interface Producto{
    id: number,
    nombre: string,
    stock: number,
    descripcion: string,
    categoria: Categoria,
    estado: Estado,
    precio: number,
    descuento: number
}
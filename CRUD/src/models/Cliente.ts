import {RangoCliente, EstadoCliente} from "./ClienteEnums"

export interface Cliente{
    id: number,
    nombre: string,
    apellido: string,
    telefono: number,
    edad: number,
    dpi: number,
    rango: RangoCliente,
    estado: EstadoCliente
}
import { Cliente } from "../models/Cliente";
import { Producto } from "../models/Producto";

export function validarUsuario(cliente: Cliente): void {

    if (!cliente.nombre.trim()) {
        throw new Error("El nombre es obligatorio.");
    }

    if (!cliente.apellido.trim()) {
        throw new Error("El apellido es obligatorio.");
    }

    if (cliente.edad <= 0) {
        throw new Error("La edad debe ser mayor que cero.");
    }

    if (typeof cliente.telefono !== "number") {
        throw new Error("El teléfono debe ser numérico.");
    }

    if (typeof cliente.dpi !== "number") {
        throw new Error("El DPI debe ser numérico.");
    }
}

export function validarArticulo(producto: Producto): void {

    if (!producto.nombre.trim()) {
        throw new Error("El nombre es obligatorio.");
    }

    if (producto.precio <= 0) {
        throw new Error("El precio debe ser mayor que cero.");
    }

    if (producto.stock < 0) {
        throw new Error("El stock no puede ser negativo.");
    }
}
import { Producto } from "../models/Producto";
import { leerArticulos } from "../utils/reader";
import { escribirArticulos } from "../utils/writer";
import { Factura } from "../models/Factura";
import { validarArticulo } from "./validator";


export async function listarArticulos(): Promise<Producto[]> {
    const productos: Producto[] = await leerArticulos();
    return productos;
}

export async function agregarArticulo(producto: Producto): Promise<void> {
    validarArticulo(producto);
    const productos: Producto[] = await leerArticulos();
    productos.push(producto);
    await escribirArticulos(productos);
}

export async function buscarArticulo(id: number): Promise<Producto | null> {
    const productos: Producto[] = await leerArticulos();
    return productos.find(p => p.id === id) || null;
}

export async function eliminarArticulo(id: number): Promise<boolean> {
    const productos: Producto[] = await leerArticulos();
    if (id <= 0) return false;

    const index = productos.findIndex(p => p.id === id);

    if (index === -1){
        return false;
    }

    productos.splice(index,1);
    await escribirArticulos(productos);
    return true;
}

export async function editarArticulo(id: number, producto: Producto): Promise<boolean> {
    validarArticulo(producto);
    const productos: Producto[] = await leerArticulos();
    if (id <= 0) return false;

    const index = productos.findIndex(p => p.id === id);

    if (index === -1){
        return false;
    }

    productos[index] = {...productos[index], ...producto};
    await escribirArticulos(productos);
    return true;
}

export async function calcularSubtotal(id: number) {
    const producto = await buscarArticulo(id);
    if (producto === null) {
        return null;
    }

    const iva = producto.precio * 0.12;
    const descuento = producto.precio * (producto.descuento * 0.01);

    const resultado: Factura = {
        "Articulo" : producto.nombre,
        "Iva": iva,
        "Descuento": descuento,
        "subtotal" : (producto.precio - descuento) + iva
    }

    return resultado;
}
import { readFile, writeFile } from "fs/promises";
import { Cliente } from "../models/Cliente";
import { Producto } from "../models/Producto";
 
export async function leerClientes(): Promise<Cliente[]> {
    try {
        const data = await readFile("./src/data/Clientes.json", "utf8");
        return JSON.parse(data);
    } catch (error: any) {
        if (error.code === "ENOENT") {
            await writeFile("./src/data/Clientes.json", "[]", "utf8");
            return [];
        }
        if (error instanceof SyntaxError) {
            console.error("Error: El archivo de clientes contiene un JSON inválido. Reconstruyendo...");
            return [];
        }
        console.error("Error inesperado al leer clientes:", error.message);
        return [];
    }
}
 
export async function leerProductos(): Promise<Producto[]> {
    try {
        const data = await readFile("./src/data/Productos.json", "utf8");
        return JSON.parse(data);
    } catch (error: any) {
        if (error.code === "ENOENT") {
            await writeFile("./src/data/Productos.json", "[]", "utf8");
            return [];
        }
        if (error instanceof SyntaxError) {
            console.error("Error: El archivo de productos contiene un JSON inválido. Reconstruyendo...");
            return [];
        }
        console.error("Error inesperado al leer productos:", error.message);
        return [];
    }
}
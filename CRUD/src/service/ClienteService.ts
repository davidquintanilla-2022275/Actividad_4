import { Cliente } from "../models/Cliente";
import { leerUsuarios } from "../utils/reader";
import { escribirUsuarios } from "../utils/writer";
import { validarUsuario } from "./validator";


export async function listarUsuarios(): Promise<Cliente[]> {
    const clientes: Cliente[] = await leerUsuarios();
    return clientes;
}

export async function agregarUsuario(cliente: Cliente): Promise<void> {
    validarUsuario(cliente);
    const clientes: Cliente[] = await leerUsuarios();
    clientes.push(cliente);
    await escribirUsuarios(clientes);
}

export async function buscarUsuario(id: number): Promise<Cliente | null> {
    const clientes: Cliente[] = await leerUsuarios();
    return clientes.find(c => c.id === id) || null;
}

export async function eliminarUsuario(id: number): Promise<boolean> {
    const clientes: Cliente[] = await leerUsuarios();
    if (id <= 0) return false;
    const index = clientes.findIndex(c => c.id === id);
    
    if (index === -1) {
        return false;
    }
    clientes.splice(index, 1);
    await escribirUsuarios(clientes);
    return true;
}


export async function editarUsuario(id: number, cliente: Cliente): Promise<boolean>{
    validarUsuario(cliente);
    const clientes: Cliente[] = await leerUsuarios();
    if (id <= 0) return false;

    const index = clientes.findIndex(c => c.id === id);
    if (index === -1) {
        return false;
    }

    clientes[index] = { ...clientes[index], ...cliente };
    await escribirUsuarios(clientes);
    return true;
}

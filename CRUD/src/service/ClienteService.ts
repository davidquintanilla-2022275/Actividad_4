import { Cliente } from "../models/Cliente";
import { leerClientes } from "../utils/reader";
import { escribirClientes} from "../utils/writer";
import { validarUsuario } from "./validator";


export class ClienteService {
    async  listarClientes(): Promise<Cliente[]> {
        const clientes: Cliente[] = await leerClientes();
        return clientes;
    }

    async  agregarUsuario(cliente: Cliente): Promise<void> {
        validarUsuario(cliente);
        const clientes: Cliente[] = await leerClientes();
        clientes.push(cliente);
        await escribirClientes(clientes);
    }

    async  buscarUsuario(id: number): Promise<Cliente | null> {
        const clientes: Cliente[] = await leerClientes();
        return clientes.find(c => c.id === id) || null;
    }

    async  eliminarUsuario(id: number): Promise<boolean> {
        const clientes: Cliente[] = await leerClientes();
        if (id <= 0) return false;
        const index = clientes.findIndex(c => c.id === id);
        
        if (index === -1) {
            return false;
        }
        clientes.splice(index, 1);
        await escribirClientes(clientes);
        return true;
    }


    async  editarUsuario(id: number, cliente: Cliente): Promise<boolean>{
        validarUsuario(cliente);
        const clientes: Cliente[] = await leerClientes();
        if (id <= 0) return false;

        const index = clientes.findIndex(c => c.id === id);
        if (index === -1) {
            return false;
        }

        clientes[index] = { ...clientes[index], ...cliente };
        await escribirClientes(clientes);
        return true;
    }
};
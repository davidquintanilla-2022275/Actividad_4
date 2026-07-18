import { IncomingMessage, ServerResponse } from 'http';
import { ProductoService } from '../service/ProductoService';
import { Producto } from '../models/Producto';

const service = new ProductoService();

function leerBody(req: IncomingMessage): Promise<any> {

    return new Promise((resolve, reject) => {

        let cuerpo = '';

        req.on('data', chunk => {
            cuerpo += chunk;
        });

        req.on('end', () => {

            try {
                resolve(cuerpo ? JSON.parse(cuerpo) : {});
            } catch (error) {
                reject(error);
            }

        });

    });

}

function enviarJson(res: ServerResponse, status: number, data: unknown) {

    res.writeHead(status, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data));

}

export async function routes(req: IncomingMessage, res: ServerResponse) {

    const url = new URL(req.url ?? '/', 'http://localhost:3001');
    const partes = url.pathname.split('/').filter(Boolean);

    if (partes[0] !== 'Productos') {

        enviarJson(res, 404, { mensaje: 'Ruta no encontrada' });
        return;

    }

    const id = partes[1] ? Number(partes[1]) : undefined;

    try {

        if (req.method === 'GET' && id === undefined) {

            const productos = await service.listarProductos();
            enviarJson(res, 200, productos);
            return;

        }

        if (req.method === 'GET' && id !== undefined) {

            const producto = await service.buscarArticulo(id);

            if (!producto) {
                enviarJson(res, 404, { mensaje: 'Producto no encontrado' });
                return;
            }

            enviarJson(res, 200, producto);
            return;

        }

        if (req.method === 'POST') {

            const body = await leerBody(req) as Producto;

            await service.agregarArticulo(body);
            enviarJson(res, 201, { mensaje: 'Producto agregado' });
            return;

        }

        if (req.method === 'PUT' && id !== undefined) {

            const body = await leerBody(req) as Producto;

            const actualizado = await service.editarArticulo(id, body);

            if (!actualizado) {
                enviarJson(res, 404, { mensaje: 'Producto no encontrado' });
                return;
            }

            enviarJson(res, 200, { mensaje: 'Producto actualizado' });
            return;

        }

        if (req.method === 'DELETE' && id !== undefined) {

            const eliminado = await service.eliminarArticulo(id);

            if (!eliminado) {
                enviarJson(res, 404, { mensaje: 'Producto no encontrado' });
                return;
            }

            enviarJson(res, 200, { mensaje: 'Producto eliminado' });
            return;

        }

        enviarJson(res, 405, { mensaje: 'Método no permitido' });

    } catch (error) {

        enviarJson(res, 500, { mensaje: 'Error interno del servidor' });

    }

}
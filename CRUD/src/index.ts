import { Cliente } from "./models/Cliente";
import { RangoCliente, EstadoCliente } from "./models/ClienteEnums";
import { Producto } from "./models/Producto";
import { Categoria, Estado } from "./models/ProductoEnums";
import { agregarUsuario, buscarUsuario, editarUsuario, eliminarUsuario, listarUsuarios } from "./service/ClienteService";
import { agregarArticulo, buscarArticulo, calcularSubtotal, editarArticulo, eliminarArticulo, listarArticulos } from "./service/ProductoService";
import { rl } from "./utils/input";

var idCount:number = 5;
var idCount2:number = 5;

async function menu() {
    let opcion = "";    
    do {
        console.log("|----------MENU----------|");
        console.log("|1. Usuarios             |")
        console.log("|2. Articulos            |")
        console.log("|3. Salir                |")
        console.log("|------------------------|")
        opcion = await rl.question("Seleccione opcion: ");

        switch (opcion) {
            case "1":
                await menuUsuarios();
                break;
            case "2":
                await menuArticulos();
                break;
            case "3":
                console.log("Feliz día :)");
                break;
        }
    } while (opcion != "3");
    rl.close();
}

async function menuUsuarios() {
    let opcionUsuarios = "";
    console.clear();
    console.log("|--------CLIENTES--------|");
    console.log("|1. Agregar              |")
    console.log("|2. Editar               |")
    console.log("|3. Eliminar             |")
    console.log("|4. Buscar               |")
    console.log("|5. Listar               |")
    console.log("|6. Cancelar             |")
    console.log("|------------------------|")
    opcionUsuarios = await rl.question("Seleccione opción: ")

    switch (opcionUsuarios) {
        case "1":
            let nombre = await rl.question("Ingrese nombre: ")
            let apellido = await rl.question("Ingrese apellido: ");
            let telefono: number =  Number( await rl.question("Ingrese numero de telefono: "));
            let edad: number =  Number(await rl.question("Ingrese su edad: "));
            let dpi: number =  Number(await rl.question("Ingrese su DPI: "));
            let estado =  await rl.question( "Ingrese estado (Activo/Inactivo): ");
            let categoriaUsuario = await rl.question("Ingrese categoria (Regular/Vip/Mayorista): ");

            idCount ++;
            let cliente: Cliente = {
                id: idCount,
                nombre: nombre,
                apellido: apellido,
                telefono: telefono,
                edad: edad,
                dpi: dpi,
                estado: estado as EstadoCliente,
                rango: categoriaUsuario as RangoCliente
            }

            await agregarUsuario(cliente);
            console.log("Usuario agregado!")
            break;
        
        case "2":
            let idEditar =  Number(await rl.question("Ingrese ID: "));
            let nombre1 = await rl.question("Ingrese nombre: ")
            let apellido1 = await rl.question("Ingrese apellido: ");
            let telefono1: number =  Number( await rl.question("Ingrese numero de telefono: "));
            let edad1: number =  Number(await rl.question("Ingrese su edad: "));
            let dpi1: number =  Number(await rl.question("Ingrese su DPI: "));
            let estado1 =  await rl.question( "Ingrese estado (Activo/Inactivo): ");
            let categoriaUsuario1 = await rl.question("Ingrese categoria (Regular/Vip/Mayorista): ");

            let cliente1: Cliente = {
                id: idEditar,
                nombre: nombre1,
                apellido: apellido1,
                telefono: telefono1,
                edad: edad1,
                dpi: dpi1,
                estado: estado1 as EstadoCliente,
                rango: categoriaUsuario1 as RangoCliente
            }
            if (!await editarUsuario(idEditar, cliente1)){
                console.log("El cliente no existe")
            } else {
                console.log("Usuario editado!")
            }
            break;
        case "3":
            let idEliminar =  Number(await rl.question("Ingrese ID: "));
            if (!await eliminarUsuario(idEliminar)){
                console.log("El cliente no existe")
            } else {
                console.log("Usuario eliminado!")
            }
            break;
        case "4":
            let idBuscar =  Number(await rl.question("Ingrese ID: "));
            console.log(await buscarUsuario(idBuscar));
            break;
        case "5":
            console.log(await listarUsuarios());
            break;
    }
}

async function menuArticulos() {
    let opcionArticulos = "";
    console.clear();
    console.log("|-------PRODUCTOS--------|");
    console.log("|1. Agregar              |")
    console.log("|2. Editar               |")
    console.log("|3. Eliminar             |")
    console.log("|4. Buscar               |")
    console.log("|5. Listar               |")
    console.log("|6. Consultar categorias |")
    console.log("|7. Calcular subtotal    |")
    console.log("|8. Cancelar             |")
    console.log("|------------------------|")
    opcionArticulos = await rl.question("Seleccione opción: ")
    switch (opcionArticulos) {
        case "1":
            let nombre = await rl.question("Ingrese nombre: ")
            let stock = Number(await rl.question("Ingrese stock: "));
            let descripcion =   await rl.question("Ingrese descripcion: ");
            let categoria =  await rl.question("Ingrese categoría (Consultar categorías disponibles): ");
            let estado = await rl.question("Ingrese estado (En venta/ Descontinuado/ Borrador)");
            let precio = Number(await rl.question("Ingrese precio: "));
            let descuento = Number(await rl.question("Ingrese descuento (0 si no quiere descuento): "))

            idCount2 ++;
            let producto: Producto = {
                id: idCount2,
                nombre: nombre,
                stock: stock,
                descripcion: descripcion,
                categoria: categoria as Categoria,
                estado: estado as Estado,
                precio: precio,
                descuento: descuento
            }

            await agregarArticulo(producto);
            console.log("Articulo agregado!")
            break;
        
        case "2":
            let idEditar =  Number(await rl.question("Ingrese ID: "));
            let nombre1 = await rl.question("Ingrese nombre: ")
            let stock1 = Number(await rl.question("Ingrese stock: "));
            let descripcion1 =   await rl.question("Ingrese descripcion: ");
            let categoria1 =  await rl.question("Ingrese categoría (Consultar categorías disponibles): ");
            let estado1 = await rl.question("Ingrese estado (En venta/ Descontinuado/ Borrador)");
            let precio1 = Number(await rl.question("Ingrese precio: "));
            let descuento1 = Number(await rl.question("Ingrese descuento (0 si no quiere descuento): "))

            let producto1: Producto = {
                id: idCount2,
                nombre: nombre1,
                stock: stock1,
                descripcion: descripcion1,
                categoria: categoria1 as Categoria,
                estado: estado1 as Estado,
                precio: precio1,
                descuento: descuento1
            }
            if (!await editarArticulo(idEditar, producto1)){
                console.log("El producto no existe")
            } else {
                console.log("Articulo editado!")
            }
            break;
        case "3":
            let idEliminar =  Number(await rl.question("Ingrese ID: "));
            if (!await eliminarArticulo(idEliminar)){
                console.log("El producto no existe")
            } else {
                console.log("Articulo eliminado!")
            }
            break;
        case "4":
            let idBuscar =  Number(await rl.question("Ingrese ID: "));
            console.log(await buscarArticulo(idBuscar));
            break;
        case "5":
            console.log(await listarArticulos());
            break;
        case "6":
            console.log("LISTA DE CATEGORIAS: ")
            console.log(Object.values(Categoria))
            break;
        case "7":
            let idCalculo = Number(await rl.question("Ingrese ID del producto deseado: "))
            console.log(await calcularSubtotal(idCalculo));
    }
}

menu();
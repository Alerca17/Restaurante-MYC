import { Request, Response } from "express";
import HistorialPedidos from "../models/Historial_Pedidos";
import { Usuarios } from "../models/Usuarios";
import { Pedidos } from "../models/Pedidos";
import { Platos } from "../models/Platos";

//Validar existencia en PostgreSQL
const validarClienteYPedido = async (clienteId: number, pedidoId: number): Promise<boolean> => {

    const cliente = await Usuarios.findByPk(clienteId);
    const pedido = await Pedidos.findByPk(pedidoId);
    return !!(cliente && pedido);
}

//Crear
export const crearHistorial = async (req: Request, res: Response) => {

    const { cliente_id, pedido_id } = req.body;

    if (!(await validarClienteYPedido(cliente_id, pedido_id))) {

        res.status(400).json({ error: "Cliente o Pedido No Existen" })
        return
    }

    const nuevo = await HistorialPedidos.create(req.body);
    res.status(201).json(nuevo);
}

//Leer todos
export const obtenerHistoriales = async (req: Request, res: Response) => {

    const historial = await HistorialPedidos.find();
    res.json(historial);
}

//Actualizar
export const actualizarHistorial = async (req: Request, res: Response): Promise<void> => {

    const { cliente_id, pedido_id } = req.body;

    const cliente = await Usuarios.findByPk(cliente_id);
    const pedido = await Pedidos.findByPk(pedido_id);
    if (!cliente || !pedido) {
        res.status(400).json({ error: "Cliente o pedido no existen" });
        return;
    }

    const actualizado = await HistorialPedidos.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });

    if (!actualizado) {
        res.status(404).json({ error: "Historial no encontrado" });
        return;
    }

    res.json(actualizado);
};



//Eliminar
export const eliminarHistorial = async (req: Request, res: Response) => {

    const eliminado = await HistorialPedidos.findByIdAndDelete(req.params.id);

    if (!eliminado) {

        res.status(404).json({ error: "No encontrado" });
        return
    }
    res.json({ mensaje: "Eliminado correctamente" });
};
//Filtrar por plato
export const buscarHistorialPorPlato = async (req: Request, res: Response): Promise<void> => {

    const { plato_id } = req.params;

    const plato = await Platos.findByPk(plato_id)

    if (!plato) {

        res.status(404).json({ error: "Plato no existe en PostgreSQL" })
        return
    }

    const historiales = await HistorialPedidos.find({

        "observaciones.platoId": Number(plato_id)
    })

    res.json(historiales);
}

//Filtar por cliente
export const buscarHistorialPorCliente = async (req: Request, res: Response): Promise<void> => {

    const { cliente_id } = req.params;
    const cliente = await Usuarios.findByPk(cliente_id)

    if (!cliente) {

        res.status(404).json({ error: "El cliente no existe en PostgreSQL" })
        return
    }

    const historiales = await HistorialPedidos.find({ cliente_id: Number(cliente_id) })

    if (historiales.length === 0) {

        res.status(200).json({ mensaje: "El cliente existe pero no tiene historial registrado." })
        return
    }

    res.json(historiales)
}

//Filtrar por Fecha 
export const buscarHistorialPorFecha = async (req: Request, res: Response): Promise<void> => {
    const { fecha } = req.params;

    // Verifica que la fecha sea válida (ISO)
    const esFechaValida = /^\d{4}-\d{2}-\d{2}$/.test(fecha)

    if (!esFechaValida) {

        res.status(400).json({ error: "Formato de fecha inválido. Usa YYYY-MM-DD" })
        return;
    }

    const desde = new Date(`${fecha}T00:00:00Z`);
    const hasta = new Date(`${fecha}T23:59:59Z`);

    const historiales = await HistorialPedidos.find({
        fecha: {
            $gte: desde,
            $lte: hasta
        }
    })

    if (historiales.length === 0) {

        res.status(200).json({ mensaje: `No se encontraron historiales en la fecha ${fecha}.` });
        return
    }

    res.json(historiales)
}


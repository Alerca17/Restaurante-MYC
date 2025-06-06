import { Request, Response } from "express";
import HistorialPedidos from "../models/Historial_Pedidos";

export const crearHistorial = async (req: Request, res: Response) => {
    try {
        const nuevoHistorial = new HistorialPedidos(req.body);
        const historialGuardado = await nuevoHistorial.save();
        res.status(201).json(historialGuardado);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al crear historial", error });
    }
};

export const obtenerHistoriales = async (_req: Request, res: Response) => {
    try {
        const historiales = await HistorialPedidos.find();
        res.status(200).json(historiales);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener historiales", error });
    }
};

export const obtenerHistorialPorId = async (req: Request, res: Response) => {
    try {
        const historial = await HistorialPedidos.findOne({ pedido_id: req.params.id });
        if (!historial) {
             res.status(404).json({ mensaje: "Historial no encontrado" });
             return
        }
        res.status(200).json(historial);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener historial", error });
    }
};

export const eliminarHistorial = async (req: Request, res: Response) => {
    try {
        const eliminado = await HistorialPedidos.findOneAndDelete({ pedido_id: req.params.id });
        if (!eliminado) {
            res.status(404).json({ mensaje: "Historial no encontrado para eliminar" });
            return
        }
        res.status(200).json({ mensaje: "Historial eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al eliminar historial", error });
    }
};

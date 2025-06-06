import { Request, Response } from "express";
import { Pedidos } from "../models/Pedidos";
import { Usuarios } from "../models/Usuarios";
import { Mesas } from "../models/Mesas";

export class PedidosController {
  static create = async (req: Request, res: Response): Promise<void> => {
    try {
      const { cliente_id, mesa_id } = req.body;

      const nuevoPedido = await Pedidos.create({
        clienteId: cliente_id,
        mesaId: mesa_id || null,
        fecha: new Date(),
        total: 0.0, // inicializa en cero hasta que agregues los platos
      });

      res.status(201).json({ mensaje: "Pedido creado", data: nuevoPedido });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al crear el pedido" });
    }
  };

  static getAll = async (req: Request, res: Response): Promise<void> => {
    try {
      const pedidos = await Pedidos.findAll({
        include: [Usuarios, Mesas],
      });

      res.json(pedidos);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al obtener los pedidos" });
    }
  };

  static getById = async (req: Request, res: Response): Promise<void> => {
    try {
      const pedido = await Pedidos.findByPk(req.params.id, {
        include: [Usuarios, Mesas],
      });

      if (!pedido) {
        res.status(404).json({ error: "Pedido no encontrado" });
        return;
      }

      res.json(pedido);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al buscar el pedido" });
    }
  };

  static updateById = async (req: Request, res: Response): Promise<void> => {
    try {
      const pedido = await Pedidos.findByPk(req.params.id);
      if (!pedido) {
        res.status(404).json({ error: "Pedido no encontrado" });
        return;
      }

      await pedido.update(req.body);
      res.json({ mensaje: "Pedido actualizado", data: pedido });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al actualizar el pedido" });
    }
  };

  static deleteById = async (req: Request, res: Response): Promise<void> => {
    try {
      const pedido = await Pedidos.findByPk(req.params.id);
      if (!pedido) {
        res.status(404).json({ error: "Pedido no encontrado" });
        return;
      }

      await pedido.destroy();
      res.json({ mensaje: "Pedido eliminado" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al eliminar el pedido" });
    }
  };
}

import { Request, Response } from "express";
import { PedidoPlato } from "../models/PedidoPlato";

export class PedidoPlatoController {
  static create = async (req: Request, res: Response) => {
    try {
      const nuevoDetalle = await PedidoPlato.create(req.body);
      res.status(201).json({ mensaje: "Detalle creado", data: nuevoDetalle });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al crear detalle de pedido" });
    }
  };

  static getAll = async (_req: Request, res: Response) => {
    try {
      const detalles = await PedidoPlato.findAll({
        include: ["plato", "pedido"],
      });

      res.json(detalles);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener los detalles" });
    }
  };

  static getById = async (req: Request, res: Response) => {
    try {
      const detalle = await PedidoPlato.findByPk(req.params.id);

      if (!detalle) {
        res.status(404).json({ error: "No encontrado" });
        return;
      }
      res.json(detalle);
    } catch (error) {
      res.status(500).json({ error: "Error al buscar detalle" });
    }
  };

  static updateById = async (req: Request, res: Response) => {
    try {
      const detalle = await PedidoPlato.findByPk(req.params.id);
      if (!detalle) {
        res.status(404).json({ error: "No encontrado" });
        return;
      }

      await detalle.update(req.body);
      res.json({ mensaje: "Actualizado", data: detalle });
    } catch (error) {
      res.status(500).json({ error: "Error al actualizar" });
    }
  };

  static deleteById = async (req: Request, res: Response) => {
    try {
      const detalle = await PedidoPlato.findByPk(req.params.id);
      if (!detalle) {
        res.status(404).json({ error: "No encontrado" });
        return;
      }
      await detalle.destroy();
      res.json({ mensaje: "Eliminado" });
    } catch (error) {
      res.status(500).json({ error: "Error al eliminar" });
    }
  };
}

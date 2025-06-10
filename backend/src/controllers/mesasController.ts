import { Request, Response } from "express";
import { Mesas } from "../models/Mesas";

export class MesasController {
  static async create(req: Request, res: Response) {
    try {
      const mesa = await Mesas.create(req.body);
      res.status(201).json({ mensaje: "Mesa creada", data: mesa });
    } catch (error) {
      console.error("Error al crear mesa:", error);
      res.status(500).json({ error: "Error al crear la mesa" });
    }
  }

  static async getAll(req: Request, res: Response) {
    try {
      const mesas = await Mesas.findAll();
      res.json(mesas);
    } catch (error) {
      console.error("Error al obtener mesas:", error);
      res.status(500).json({ error: "Error al obtener las mesas" });
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      const mesa = await Mesas.findByPk(req.params.id);
      if (!mesa) {
        res.status(404).json({ error: "Mesa no encontrada" });
        return;
      }
      res.json(mesa);
    } catch (error) {
      console.error("Error al obtener la mesa:", error);
      res.status(500).json({ error: "Error al obtener la mesa" });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const mesa = await Mesas.findByPk(req.params.id);
      if (!mesa) {
        res.status(404).json({ error: "Mesa no encontrada" });
        return;
      }

      await mesa.update(req.body);
      res.json({ mensaje: "Mesa actualizada", data: mesa });
    } catch (error) {
      console.error("Error al actualizar la mesa:", error);
      res.status(500).json({ error: "Error al actualizar la mesa" });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const mesa = await Mesas.findByPk(req.params.id);
      if (!mesa) {
        res.status(404).json({ error: "Mesa no encontrada" });
        return;
      }

      await mesa.destroy();
      res.json({ mensaje: "Mesa eliminada" });
    } catch (error) {
      console.error("Error al eliminar la mesa:", error);
      res.status(500).json({ error: "Error al eliminar la mesa" });
    }
  }
}

import { Request, Response } from "express";
import { Reservas } from "../models/Reservas";
import { Usuarios } from "../models/Usuarios";
import { Mesas } from "../models/Mesas";

export class ReservasController {
  static create = async (req: Request, res: Response) => {
    try {
      const reserva = await Reservas.create(req.body);
      res.status(201).json({ mensaje: "Reserva creada", data: reserva });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al crear reserva" });
    }
  };

  static getAll = async (_req: Request, res: Response) => {
    try {
      const reservas = await Reservas.findAll({
        include: [Usuarios, Mesas],
      });
      res.json(reservas);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al obtener reservas" });
    }
  };

  static getById = async (req: Request, res: Response) => {
    try {
      const reserva = await Reservas.findByPk(req.params.id, {
        include: [Usuarios, Mesas],
      });
      if (!reserva) {
        res.status(404).json({ error: "Reserva no encontrada" });
        return;
      }
      res.json(reserva);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al buscar reserva" });
    }
  };

  static update = async (req: Request, res: Response) => {
    try {
      const reserva = await Reservas.findByPk(req.params.id);
      if (!reserva) {
        res.status(404).json({ error: "Reserva no encontrada" });
        return;
      }
      await reserva.update(req.body);
      res.json({ mensaje: "Reserva actualizada", data: reserva });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al actualizar reserva" });
    }
  };

  static delete = async (req: Request, res: Response) => {
    try {
      const reserva = await Reservas.findByPk(req.params.id);
      if (!reserva) {
        res.status(404).json({ error: "Reserva no encontrada" });
        return;
      }
      await reserva.destroy();
      res.json({ mensaje: "Reserva eliminada" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al eliminar reserva" });
    }
  };
}

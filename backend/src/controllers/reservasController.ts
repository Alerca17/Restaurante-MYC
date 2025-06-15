import { Request, Response } from "express";
import { Reservas } from "../models/Reservas";
import { Usuarios } from "../models/Usuarios";
import { Mesas } from "../models/Mesas";

export class ReservasController {
  static async create(req: Request, res: Response): Promise<void> {
    try {
      const { clienteId, mesaId, fecha, hora, personas } = req.body;

      // 1. Validar existencia de cliente
      const cliente = await Usuarios.findByPk(clienteId);
      if (!cliente) {
        res.status(400).json({ error: "El cliente no existe" });
        return;
      }

      // 2. Validar existencia de mesa
      const mesa = await Mesas.findByPk(mesaId);
      if (!mesa) {
        res.status(400).json({ error: "La mesa no existe" });
        return;
      }

      // 3. Validar capacidad de la mesa
      if (personas > mesa.capacidad) {
        res
          .status(400)
          .json({
            error: `La mesa solo tiene capacidad para ${mesa.capacidad} personas.`,
          });
        return;
      }

      // 4. Formatear la hora a HH:mm:ss para comparar correctamente
      let horaFormateada = hora;
      if (hora.length === 5) {
        horaFormateada = `${hora}:00`;
      }

      // 5. Validar disponibilidad de la mesa (misma fecha y hora)
      const reservaExistente = await Reservas.findOne({
        where: {
          mesaId,
          fecha,
          hora: horaFormateada,
        },
      });
      if (reservaExistente) {
        res
          .status(400)
          .json({ error: "La mesa ya está reservada para esa fecha y hora" });
        return;
      }

      // 6. Crear la reserva si todo está bien
      const reserva = await Reservas.create({
        clienteId,
        mesaId,
        fecha,
        hora: horaFormateada,
        personas,
      });
      res.status(201).json({ mensaje: "Reserva creada", data: reserva });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error al crear la reserva", detalle: error.message });
    }
  }

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

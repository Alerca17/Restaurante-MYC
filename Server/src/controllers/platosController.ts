import { Request, Response } from "express";
import { Platos } from "../models/Platos";
import { Categorias } from "../models/Categoria";
export class PlatosController {
  static create = async (req: Request, res: Response) => {
    try {
      const plato = await Platos.create(req.body);
      res.status(201).json({ mensaje: "Plato creado", data: plato });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al crear el plato" });
    }
  };

  static getAll = async (req: Request, res: Response) => {
    try {
      const platos = await Platos.findAll({
        include: [{ model: Categorias, attributes: ["id", "nombre"] }],
      });
      res.json(platos);
    } catch (error) {
      console.error("Error al obtener platos:", error); // 👈 esto es clave
      res.status(500).json({ error: "Error al obtener los platos" });
    }
  };

  static getById = async (req: Request, res: Response) => {
    try {
      const plato = await Platos.findByPk(req.params.id);
      if (!plato) {
        res.status(404).json({ error: "Plato no encontrado" });
      }
      res.json(plato);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al obtener el plato" });
    }
  };

  static updateById = async (req: Request, res: Response) => {
    try {
      const plato = await Platos.findByPk(req.params.id);
      if (!plato) {
        res.status(404).json({ error: "Plato no encontrado" });
      }

      await plato.update(req.body);
      res.json({ mensaje: "Plato actualizado", data: plato });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al actualizar el plato" });
    }
  };

  static deleteById = async (req: Request, res: Response) => {
    try {
      const plato = await Platos.findByPk(req.params.id);
      if (!plato) {
        res.status(404).json({ error: "Plato no encontrado" });
      }

      await plato.destroy();
      res.json({ mensaje: "Plato eliminado" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al eliminar el plato" });
    }
  };
}

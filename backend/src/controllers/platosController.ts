import { Request, Response } from "express";
import { Platos } from "../models/Platos";
import { Categorias } from "../models/Categoria";
export class PlatosController {
  static create = async (req: Request, res: Response) => {
    try {
      const plato = await Platos.create(req.body);
      res.status(201).json({ mensaje: "Plato creado", data: plato });
      return;
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al crear el plato" });
      return;
    }
  };

  static getAll = async (req: Request, res: Response) => {
    try {
      const platos = await Platos.findAll({
        include: [{ model: Categorias, attributes: ["id", "nombre"] }],
      });
      res.json(platos);
      return;
    } catch (error) {
      console.error("Error al obtener platos:", error); // 👈 esto es clave
      res.status(500).json({ error: "Error al obtener los platos" });
      return;
    }
  };

  static getById = async (req: Request, res: Response) => {
    try {
      const plato = await Platos.findByPk(req.params.id);
      if (!plato) {
        res.status(404).json({ error: "Plato no encontrado" });
        return;
      }
      res.json(plato);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al obtener el plato" });
      return;
    }
  };

  static updateById = async (req: Request, res: Response) => {
    try {
      const plato = await Platos.findByPk(req.params.id);
      if (!plato) {
        res.status(404).json({ error: "Plato no encontrado" });
        return;
      }

      await plato.update(req.body);
      res.json({ mensaje: "Plato actualizado", data: plato });
      return;
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al actualizar el plato" });
      return;
    }
  };

  static deleteById = async (req: Request, res: Response) => {
    try {
      const plato = await Platos.findByPk(req.params.id);
      if (!plato) {
        res.status(404).json({ error: "Plato no encontrado" });
        return;
      }

      await plato.destroy();
      res.json({ mensaje: "Plato eliminado" });
      return;
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al eliminar el plato" });
      return;
    }
  };
}

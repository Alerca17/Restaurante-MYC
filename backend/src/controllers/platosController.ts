import { Request, Response } from "express";
import { Platos } from "../models/Platos";
import { Categoria } from "../models/Categoria";

export class PlatosController {
  static create = async (req: Request, res: Response) => {
    try {
      const { categorias, ...platoData } = req.body; // categorias: array de IDs
      const plato = await Platos.create(platoData);

      if (categorias && categorias.length > 0) {
        await plato.$set("categorias", categorias);
      }

      res.status(201).json({ mensaje: "Plato creado", data: plato });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al crear el plato" });
    }
  };

  static getAll = async (req: Request, res: Response) => {
    try {
      const platos = await Platos.findAll({
        include: [
          { model: Categoria, as: "categorias", attributes: ["id", "nombre"] },
        ],
      });

      // Mapea para devolver solo los ids de categorías
      const platosConCategorias = platos.map((plato: any) => {
        const plain = plato.get({ plain: true });
        return {
          ...plain,
          categorias: plain.categorias.map((cat: any) => cat.id),
        };
      });

      res.json(platosConCategorias);
    } catch (error) {
      console.error("Error al obtener platos:", error);
      res.status(500).json({ error: "Error al obtener los platos" });
    }
  };

  static getById = async (req: Request, res: Response) => {
    try {
      const plato = await Platos.findByPk(req.params.id, {
        include: [
          { model: Categoria, as: "categorias", attributes: ["id", "nombre"] },
        ],
      });
      if (!plato) {
        res.status(404).json({ error: "Plato no encontrado" });
        return;
      }
      res.json(plato);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al obtener el plato" });
    }
  };

  static updateById = async (req: Request, res: Response) => {
    try {
      const { categorias, ...platoData } = req.body;
      const plato = await Platos.findByPk(req.params.id);
      if (!plato) {
        res.status(404).json({ error: "Plato no encontrado" });
        return;
      }

      await plato.update(platoData);

      if (Array.isArray(categorias)) {
        await plato.$set("categorias", categorias);
      }

      // Traer el plato actualizado con sus categorías
      const platoActualizado = await Platos.findByPk(req.params.id, {
        include: [
          { model: Categoria, as: "categorias", attributes: ["id", "nombre"] },
        ],
      });

      res.json({ mensaje: "Plato actualizado", data: platoActualizado });
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
        return;
      }

      await plato.destroy();
      res.json({ mensaje: "Plato eliminado" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al eliminar el plato" });
    }
  };
}

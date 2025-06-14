// src/controllers/categoriasController.ts
import { Request, Response } from "express";
import { Categorias } from "../models/Categoria";

export class categoriasController {
  static async getAll(req: Request, res: Response) {
    try {
      const categorias = await Categorias.findAll();
      res.json(categorias);
      return;
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al obtener categorías" });
      return;
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      const categoria = await Categorias.findByPk(req.params.id);
      if (!categoria) {
        res.status(404).json({ error: "Categoría no encontrada" });
        return;
      }
      res.json(categoria);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al obtener la categoría" });
      return;
    }
  }

  static async create(req: Request, res: Response) {
    try {
      const nuevaCategoria = await Categorias.create(req.body);
      res
        .status(201)
        .json({ mensaje: "Categoría creada", data: nuevaCategoria });
      return;
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al crear la categoría" });
      return;
    }
  }

  static async updateById(req: Request, res: Response) {
    try {
      const categoria = await Categorias.findByPk(req.params.id);
      if (!categoria) {
        res.status(404).json({ error: "Categoría no encontrada" });
        return;
      }
      await categoria.update(req.body);
      res.json({ mensaje: "Categoría actualizada", data: categoria });
      return;
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al actualizar la categoría" });
      return;
    }
  }

  static async deleteById(req: Request, res: Response) {
    try {
      const categoria = await Categorias.findByPk(req.params.id);
      if (!categoria) {
        res.status(404).json({ error: "Categoría no encontrada" });
        return;
      }
      await categoria.destroy();
      res.json({ mensaje: "Categoría eliminada" });
      return;
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al eliminar la categoría" });
      return;
    }
  }
}

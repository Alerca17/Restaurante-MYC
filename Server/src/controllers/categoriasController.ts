// src/controllers/categoriasController.ts
import { Request, Response } from "express";
import { Categorias } from "../models/Categoria";

export class categoriasController {
  static async getAll(req: Request, res: Response) {
    try {
      const categorias = await Categorias.findAll();
      res.json(categorias);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al obtener categorías" });
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      const categoria = await Categorias.findByPk(req.params.id);
      if (!categoria) {
        res.status(404).json({ error: "Categoría no encontrada" });
      }
      res.json(categoria);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al obtener la categoría" });
    }
  }

  static async create(req: Request, res: Response) {
    try {
      const nuevaCategoria = await Categorias.create(req.body);
      res
        .status(201)
        .json({ mensaje: "Categoría creada", data: nuevaCategoria });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al crear la categoría" });
    }
  }

  static async updateById(req: Request, res: Response) {
    try {
      const categoria = await Categorias.findByPk(req.params.id);
      if (!categoria) {
        res.status(404).json({ error: "Categoría no encontrada" });
      }
      await categoria.update(req.body);
      res.json({ mensaje: "Categoría actualizada", data: categoria });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al actualizar la categoría" });
    }
  }

  static async deleteById(req: Request, res: Response) {
    try {
      const categoria = await Categorias.findByPk(req.params.id);
      if (!categoria) {
        res.status(404).json({ error: "Categoría no encontrada" });
      }
      await categoria.destroy();
      res.json({ mensaje: "Categoría eliminada" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al eliminar la categoría" });
    }
  }
}

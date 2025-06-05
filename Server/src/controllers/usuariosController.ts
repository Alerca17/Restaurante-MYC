import { request, response, type Request, type Response } from "express";
import { Usuarios } from "../models/Usuarios";

export class usuariosControllers {
  static create = async (req, res) => {
    try {
      const existente = await Usuarios.findOne({
        where: { correo: req.body.correo },
      });
      if (existente) {
        return res
          .status(400)
          .json({ error: "Ya existe un usuario con ese correo" });
      } else {
        const usuario = await Usuarios.create(req.body);

        res.status(201).json({
          mensaje: "Usuario creado correctamente",
          data: usuario,
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Hubo un error" });
    }
  };

  static getAll = async (req: Request, res: Response) => {
    console.log("📥 GET /api/usuarios fue llamado");

    try {
      const usuarios = await Usuarios.findAll();
      res.json(usuarios);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al obtener usuarios" });
    }
  };
  static getById = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        res.status(400).json({ error: "ID inválido" });
        return;
      }

      const usuario = await Usuarios.findByPk(id);
      if (!usuario) {
        res.status(404).json({ error: "Usuario no encontrado" });
        return;
      }

      res.json(usuario);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al buscar usuario" });
    }
  };

  static updateById = async (req: Request, res: Response): Promise<void> => {
    try {
      const usuario = await Usuarios.findByPk(req.params.id);

      if (!usuario) {
        res.status(404).json({ error: "Usuario no encontrado" });
        return;
      }

      await usuario.update(req.body);

      res.json({ mensaje: "Usuario actualizado", data: usuario });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al actualizar usuario" });
    }
  };

  static deleteById = async (req: Request, res: Response): Promise<void> => {
    try {
      const usuario = await Usuarios.findByPk(req.params.id);

      if (!usuario) {
        res.status(404).json({ error: "Usuario no encontrado" });
        return;
      }

      await usuario.destroy();

      res.json({ mensaje: "Usuario eliminado" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al eliminar usuario" });
    }
  };
}

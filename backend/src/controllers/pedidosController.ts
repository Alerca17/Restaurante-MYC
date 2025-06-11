import { Request, Response } from "express";
import { Pedidos } from "../models/Pedidos";
import { Usuarios } from "../models/Usuarios";
import { PedidoPlato } from "../models/PedidoPlato";
import { Mesas } from "../models/Mesas";
import { Platos } from "../models/Platos";
import { db } from "../config/db";
export class PedidosController {
  static create = async (req: Request, res: Response) => {
    const { clienteId, mesaId, platos } = req.body;
    if (!Array.isArray(platos) || platos.length === 0) {
      res.status(400).json({ error: "Debes incluir al menos un plato." });
      return;
    }

    const t = await db.transaction(); // 🔹 1. Inicia la transacción

    try {
      // 🔹 2. Crea el pedido en la tabla Pedidos dentro de la transacción
      const nuevoPedido = await Pedidos.create(
        { clienteId, mesaId },
        { transaction: t }
      );

      // 🔹 3. Prepara los datos de la tabla intermedia PedidoPlato
      const platosConPedido = platos.map((plato: any) => ({
        pedidoId: nuevoPedido.id,
        platoId: plato.platoId,
        cantidad: plato.cantidad,
      }));

      // 🔹 4. Inserta todos los platos del pedido dentro de la misma transacción
      await PedidoPlato.bulkCreate(platosConPedido, { transaction: t });

      await t.commit(); // 🔹 5. Si todo salió bien, se confirma la transacción

      res.status(201).json({
        message: "Pedido creado con éxito",
        pedidoId: nuevoPedido.id,
      });
      return;
    } catch (error) {
      await t.rollback(); // 🔹 6. Si algo falla, se revierte todo
      console.error("Error al crear pedido completo:", error);
      res.status(500).json({ error: "No se pudo crear el pedido." });
      return;
    }
  };
  static getAll = async (_req: Request, res: Response) => {
    try {
      const pedidos = await Pedidos.findAll({
        include: [
          { model: Usuarios, attributes: ["id", "nombre"] },
          { model: Mesas, attributes: ["id", "numero"] },
          {
            model: PedidoPlato,
            include: [{ model: Platos, attributes: ["id", "nombre"] }],
          },
        ],
      });

      res.json(pedidos);
      return;
    } catch (error) {
      console.error("Error al obtener pedidos:", error);
      res.status(500).json({ error: "Error al obtener pedidos." });
      return;
    }
  };
  static getById = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      const pedido = await Pedidos.findByPk(id, {
        include: [
          { model: Usuarios, attributes: ["id", "nombre"] },
          { model: Mesas, attributes: ["id", "numero"] },
          {
            model: PedidoPlato,
            include: [{ model: Platos, attributes: ["id", "nombre"] }],
          },
        ],
      });

      if (!pedido) {
        res.status(404).json({ error: "Pedido no encontrado." });
        return;
      }

      res.json(pedido);
      return;
    } catch (error) {
      console.error("Error al obtener pedido:", error);
      res.status(500).json({ error: "Error al obtener el pedido." });
      return;
    }
  };
  static updateById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { clienteId, mesaId, platos } = req.body;

    if (!Array.isArray(platos) || platos.length === 0) {
      res.status(400).json({ error: "Debes incluir al menos un plato." });
      return;
    }

    const t = await db.transaction();

    try {
      const pedido = await Pedidos.findByPk(id);
      if (!pedido) {
        res.status(404).json({ error: "Pedido no encontrado." });
        return;
      }

      await pedido.update({ clienteId, mesaId }, { transaction: t });

      await PedidoPlato.destroy({ where: { pedidoId: id }, transaction: t });

      const nuevos = platos.map((plato: any) => ({
        pedidoId: pedido.id,
        platoId: plato.platoId,
        cantidad: plato.cantidad,
      }));

      await PedidoPlato.bulkCreate(nuevos, { transaction: t });

      await t.commit();

      res.status(200).json({ message: "Pedido actualizado correctamente." });
      return;
    } catch (error) {
      await t.rollback();
      console.error("Error al actualizar pedido:", error);
      res.status(500).json({ error: "Error al actualizar el pedido." });
      return;
    }
  };
  static deleteById = async (req: Request, res: Response) => {
    const { id } = req.params;

    const t = await db.transaction();

    try {
      const pedido = await Pedidos.findByPk(id);
      if (!pedido) {
        res.status(404).json({ error: "Pedido no encontrado." });
        return;
      }

      await PedidoPlato.destroy({ where: { pedidoId: id }, transaction: t });
      await pedido.destroy({ transaction: t });

      await t.commit();

      res.status(200).json({ message: "Pedido eliminado correctamente." });
      return;
    } catch (error) {
      await t.rollback();
      console.error("Error al eliminar pedido:", error);
      res.status(500).json({ error: "Error al eliminar el pedido." });
      return;
    }
  };

  // static getById = async (req: Request, res: Response): Promise<void> => {
  //   try {
  //     const pedido = await Pedidos.findByPk(req.params.id, {
  //       include: [Usuarios, Mesas],
  //     });

  //     if (!pedido) {
  //       res.status(404).json({ error: "Pedido no encontrado" });
  //       return;
  //     }

  //     res.json(pedido);
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).json({ error: "Error al buscar el pedido" });
  //   }
  // };
  // static getAll = async (req: Request, res: Response): Promise<void> => {
  //   try {
  //     const pedidos = await Pedidos.findAll({
  //       include: [Usuarios, Mesas],
  //     });

  //     res.json(pedidos);
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).json({ error: "Error al obtener los pedidos" });
  //   }
  // };
  // static create = async (req: Request, res: Response): Promise<void> => {
  //   try {
  //     const { cliente_id, mesa_id } = req.body;

  //     const nuevoPedido = await Pedidos.create({
  //       clienteId: cliente_id,
  //       mesaId: mesa_id || null,
  //       fecha: new Date(),
  //       total: 0.0, // inicializa en cero hasta que agregues los platos
  //     });

  //     res.status(201).json({ mensaje: "Pedido creado", data: nuevoPedido });
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).json({ error: "Error al crear el pedido" });
  //   }
  // };
  // static updateById = async (req: Request, res: Response): Promise<void> => {
  //   try {
  //     const pedido = await Pedidos.findByPk(req.params.id);
  //     if (!pedido) {
  //       res.status(404).json({ error: "Pedido no encontrado" });
  //       return;
  //     }

  //     await pedido.update(req.body);
  //     res.json({ mensaje: "Pedido actualizado", data: pedido });
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).json({ error: "Error al actualizar el pedido" });
  //   }
  // };
  // static deleteById = async (req: Request, res: Response): Promise<void> => {
  //   try {
  //     const pedido = await Pedidos.findByPk(req.params.id);
  //     if (!pedido) {
  //       res.status(404).json({ error: "Pedido no encontrado" });
  //       return;
  //     }

  //     await pedido.destroy();
  //     res.json({ mensaje: "Pedido eliminado" });
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).json({ error: "Error al eliminar el pedido" });
  //   }
  // };
}

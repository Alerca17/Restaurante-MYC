import { Request, Response } from "express";
import { Pedidos } from "../models/Pedidos";
import { PedidoPlato } from "../models/PedidoPlato";
import { Platos } from "../models/Platos";
import { db } from "../config/db";

export class PedidosController {
  static async create(req: Request, res: Response) {
    const { clienteId, mesaId, fecha, platos } = req.body;

    // Validar que todos los platos existan y obtener sus datos
    const idsPlatos = platos.map((p: any) => p.platoId);
    const platosExistentes = await Platos.findAll({ where: { id: idsPlatos } });

    if (platosExistentes.length !== idsPlatos.length) {
      res.status(400).json({ error: "Uno o más platos no existen" });
      return;
    }

    // Crear un mapa para acceder rápido al precio unitario por id
    const mapaPlatos = new Map<number, any>();
    platosExistentes.forEach((plato) => {
      mapaPlatos.set(plato.id, plato);
    });

    const t = await db.transaction();
    try {
      // Crear el pedido
      const pedido = await Pedidos.create(
        { clienteId, mesaId, fecha, total: 0 },
        { transaction: t }
      );

      let total = 0;

      // Crear los platos asociados usando el precio de la base de datos
      for (const plato of platos) {
        const { platoId, cantidad, observaciones } = plato;
        const platoBD = mapaPlatos.get(platoId);
        const precioUnitario = Number(platoBD.precio);

        await PedidoPlato.create(
          {
            pedidoId: pedido.id,
            platoId,
            cantidad,
            precioUnitario,
            observaciones,
          },
          { transaction: t }
        );
        total += Number(cantidad) * precioUnitario;
      }

      // Actualizar el total del pedido
      pedido.total = total;
      await pedido.save({ transaction: t });

      await t.commit();
      res.status(201).json({ pedido });
    } catch (error) {
      await t.rollback();
      res
        .status(500)
        .json({ error: "Error al crear el pedido", detalle: error.message });
    }
  }

  static async getAll(req: Request, res: Response) {
    try {
      const pedidos = await Pedidos.findAll({
        include: [
          {
            model: PedidoPlato,
            as: "pedidoPlatos",
            include: [{ model: Platos, as: "plato" }],
          },
        ],
      });
      res.json(pedidos);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener los pedidos" });
    }
  }

  static async getById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const pedido = await Pedidos.findByPk(id, {
        include: [
          {
            model: PedidoPlato,
            as: "pedidoPlatos",
            include: [{ model: Platos, as: "plato" }],
          },
        ],
      });
      if (!pedido) {
        res.status(404).json({ error: "Pedido no encontrado" });
        return;
      }
      res.json(pedido);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener el pedido" });
    }
  }
}

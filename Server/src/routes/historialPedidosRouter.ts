import { Router } from "express";
import {
  crearHistorial,
  obtenerHistoriales,
  actualizarHistorial,
  eliminarHistorial,
  buscarHistorialPorCliente,
  buscarHistorialPorFecha,
  buscarHistorialPorPlato
} from "../controllers/historialPedidosController";

const router = Router();

router.post("/", crearHistorial)
router.get("/", obtenerHistoriales)
router.put("/:id", actualizarHistorial)
router.delete("/:id", eliminarHistorial)
router.get("/cliente/:cliente_id", buscarHistorialPorCliente);
router.get("/fecha/:fecha", buscarHistorialPorFecha);
router.get("/plato/:plato_id", buscarHistorialPorPlato);

export default router;

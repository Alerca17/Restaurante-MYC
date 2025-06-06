import { Router } from "express";
import { crearHistorial, obtenerHistoriales, obtenerHistorialPorId, eliminarHistorial } from "../controllers/historialPedidosController";

const router = Router();

router.post("/create/historial", crearHistorial);
router.get("/get/historial", obtenerHistoriales);
router.get("/:id", obtenerHistorialPorId);
router.delete("/:id", eliminarHistorial);

export default router;

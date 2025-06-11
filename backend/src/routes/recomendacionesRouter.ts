import { Router } from "express";
import {
    crearRecomendacion,
    obtenerRecomendaciones,
    obtenerRecomendacionPorId,
    actualizarRecomendacion,
    eliminarRecomendacion
} from "../controllers/recomendacionesController"

const router = Router()

router.post("/", crearRecomendacion)              // Crear nueva recomendación
router.get("/", obtenerRecomendaciones)             // Obtener todas
router.get("/:id", obtenerRecomendacionPorId)      // Obtener una por ID
router.put("/:id", actualizarRecomendacion)         // Actualizar por ID
router.delete("/:id", eliminarRecomendacion)       // Eliminar por ID

export default router

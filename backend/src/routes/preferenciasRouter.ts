import { Router } from "express";
import {
    crearPreferencia,
    obtenerPreferencias,
    obtenerPreferenciaPorId,
    actualizarPreferencia,
    eliminarPreferencia
} from "../controllers/preferenciasController"

const router = Router()

router.post("/", crearPreferencia)             // Crear nueva preferencia
router.get("/", obtenerPreferencias)            // Obtener todas
router.get("/:id", obtenerPreferenciaPorId)    // Obtener una por ID
router.put("/:id", actualizarPreferencia)      // Actualizar una por ID
router.delete("/:id", eliminarPreferencia)     // Eliminar una por ID

export default router

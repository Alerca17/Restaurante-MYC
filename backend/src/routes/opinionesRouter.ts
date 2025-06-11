import { Router } from "express";
import {
    crearOpinion,
    obtenerOpiniones,
    actualizarOpinion,
    eliminarOpinion,
    filtrarPorEstrellas,
    filtrarPorTipoVisita,
    filtrarPorNombrePlato
} from "../controllers/opinionesController";

const router = Router()

router.post("/", crearOpinion)
router.get("/", obtenerOpiniones)
router.put("/:id", actualizarOpinion)
router.delete("/:id", eliminarOpinion)

// Filtros
router.get("/filtro/estrellas/:estrellas", filtrarPorEstrellas)
router.get("/filtro/visita/:tipo", filtrarPorTipoVisita)
router.get("/filtro/plato/:nombre", filtrarPorNombrePlato)

export default router

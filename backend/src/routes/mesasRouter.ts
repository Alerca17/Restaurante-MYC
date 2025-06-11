import { Router } from "express";
import { MesasController } from "../controllers/mesasController";
import { validarMesa, handleInputErrors } from "../middleware/validaciones";

const router = Router();

router.post("/", validarMesa, handleInputErrors, MesasController.create);
router.get("/", MesasController.getAll);
router.get("/:id", MesasController.getById);
router.put("/:id", validarMesa, handleInputErrors, MesasController.update);
router.delete("/:id", MesasController.delete);

export default router;

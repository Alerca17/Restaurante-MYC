import { Router } from "express";
import { PlatosController } from "../controllers/platosController";
import { validarPlato, handleInputErrors } from "../middleware/validaciones";

const router = Router();

router.post("/", validarPlato, handleInputErrors, PlatosController.create);
router.get("/", PlatosController.getAll);
router.get("/:id", PlatosController.getById);
router.put(
  "/:id",
  validarPlato,
  handleInputErrors,
  PlatosController.updateById
);
router.delete("/:id", PlatosController.deleteById);

export default router;

// src/routes/categoriasRouter.ts
import { Router } from "express";
import { categoriasController } from "../controllers/categoriasController";
import { body } from "express-validator";
import {
  validarCategoria,
  handleInputErrors,
} from "../middleware/validaciones";

const router = Router();

router.get("/", categoriasController.getAll);
router.get("/:id", categoriasController.getById);
router.post(
  "/",
  validarCategoria,
  handleInputErrors,
  categoriasController.create
);
router.put(
  "/:id",
  validarCategoria,
  handleInputErrors,
  categoriasController.updateById
);
router.delete("/:id", categoriasController.deleteById);

export default router;

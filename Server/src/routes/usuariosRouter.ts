import { Router } from "express";
import { usuariosControllers } from "../controllers/usuariosController";
import { body } from "express-validator";
import { validarUsuario, handleInputErrors } from "../middleware/validaciones";

const router = Router();

router.post(
  "/",
  validarUsuario, // ⬅️ Reglas de validación (express-validator)
  handleInputErrors, // ⬅️ Revisa errores y corta si hay fallos
  usuariosControllers.create // ⬅️ Ejecuta el controlador si todo está bien
);

// Obtener todos los usuarios
router.get("/", usuariosControllers.getAll);

// Obtener un usuario por ID
router.get("/:id", usuariosControllers.getById);

// Actualizar un usuario por ID
router.put(
  "/:id",
  validarUsuario, // Puedes crear otra validación específica para actualización
  handleInputErrors,
  usuariosControllers.updateById
);

// Eliminar un usuario por ID
router.delete("/:id", usuariosControllers.deleteById);

export default router;

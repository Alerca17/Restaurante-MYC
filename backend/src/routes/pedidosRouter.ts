import { Router } from "express";
import { PedidosController } from "../controllers/pedidosController";
import { validarPedido, handleInputErrors } from "../middleware/validaciones";

const router = Router();

router.post("/", validarPedido, handleInputErrors, PedidosController.create);
router.get("/", PedidosController.getAll);
router.get("/:id", PedidosController.getById);
router.put(
  "/:id",
  validarPedido,
  handleInputErrors,
  PedidosController.updateById
);
router.delete("/:id", PedidosController.deleteById);

export default router;

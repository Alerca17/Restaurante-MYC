import { Router } from "express";
import { PedidoPlatoController } from "../controllers/pedidoPlatoController";
import {
  validarPedidoPlato,
  handleInputErrors,
} from "../middleware/validaciones";

const router = Router();

router.post(
  "/",
  validarPedidoPlato,
  handleInputErrors,
  PedidoPlatoController.create
);
router.get("/", PedidoPlatoController.getAll);
router.get("/:id", PedidoPlatoController.getById);
router.put(
  "/:id",
  validarPedidoPlato,
  handleInputErrors,
  PedidoPlatoController.updateById
);
router.delete("/:id", PedidoPlatoController.deleteById);

export default router;

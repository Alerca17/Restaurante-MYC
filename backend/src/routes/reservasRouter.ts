import { Router } from "express";
import { ReservasController } from "../controllers/reservasController";
import { validarReserva, handleInputErrors } from "../middleware/validaciones";

const router = Router();

router.post("/", validarReserva, handleInputErrors, ReservasController.create);
router.get("/", ReservasController.getAll);
router.get("/:id", ReservasController.getById);
router.put(
  "/:id",
  validarReserva,
  handleInputErrors,
  ReservasController.update
);
router.delete("/:id", ReservasController.delete);

export default router;
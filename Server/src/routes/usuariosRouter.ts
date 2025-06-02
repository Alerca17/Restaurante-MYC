import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  console.log("desde api/usuarios");
});

export default router;

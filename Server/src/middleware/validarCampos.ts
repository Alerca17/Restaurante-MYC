import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

export const validarCampos = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    res.status(400).json({ errores: errores.array() });
    return;
  }
  next();
};

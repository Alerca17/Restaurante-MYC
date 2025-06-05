import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { body } from "express-validator";

export const handleInputErrors = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

export const validarUsuario = [
  body("nombre").notEmpty().withMessage("El nombre es obligatorio"),
  body("correo").isEmail().withMessage("Debe ser un correo válido"),
  body("contrasena")
    .isLength({ min: 6 })
    .withMessage("La contraseña debe tener al menos 6 caracteres"),
  body("telefono")
    .optional()
    .isMobilePhone("any")
    .withMessage("Teléfono no válido"),
  body("rol")
    .optional()
    .isIn(["cliente", "admin", "mesero"])
    .withMessage("Rol no válido"),
];

export const validarMesa = [
  body("numero")
    .isInt({ gt: 0 })
    .withMessage("Número de mesa debe ser un entero positivo"),
  body("capacidad")
    .isInt({ min: 1 })
    .withMessage("La capacidad debe ser al menos 1 persona"),
];

export const validarPlato = [
  body("nombre").notEmpty().withMessage("El nombre es obligatorio"),
  body("categoria_id").isInt().withMessage("ID de categoría inválido"),
  body("precio").isFloat({ gt: 0 }).withMessage("El precio debe ser mayor a 0"),
  body("disponible")
    .optional()
    .isBoolean()
    .withMessage("El campo disponible debe ser booleano"),
  body("imagen_url")
    .optional()
    .isURL()
    .withMessage("La URL de imagen no es válida"),
];

export const validarReserva = [
  body("cliente_id").isInt().withMessage("ID de cliente inválido"),
  body("mesa_id").isInt().withMessage("ID de mesa inválido"),
  body("fecha").isISO8601().withMessage("Fecha inválida"),
  body("hora")
    .matches(/^([0-1]\d|2[0-3]):([0-5]\d)$/)
    .withMessage("Hora inválida"),
  body("personas")
    .isInt({ min: 1 })
    .withMessage("Debe haber al menos una persona"),
];

export const validarPedido = [
  body("cliente_id").isInt().withMessage("ID de cliente inválido"),
  body("mesa_id").optional().isInt().withMessage("ID de mesa inválido"),
];

export const validarPedidoPlato = [
  body("pedido_id").isInt().withMessage("ID de pedido inválido"),
  body("plato_id").isInt().withMessage("ID de plato inválido"),
  body("cantidad").isInt({ min: 1 }).withMessage("Cantidad mínima es 1"),
  body("precio_unitario")
    .isFloat({ gt: 0 })
    .withMessage("Precio debe ser mayor a 0"),
];
